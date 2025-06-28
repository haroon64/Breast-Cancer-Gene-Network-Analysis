import React, { useState, useEffect, useRef } from "react";
import { DataSet, Network } from "vis-network/standalone";
import axios from "axios";
import "vis-network/styles/vis-network.css";
import "../styles/Network.css";

const NetworkVisualization = () => {
  const networkRef = useRef(null);
  const [nodes, setNodes] = useState(new DataSet([]));
  const [edges, setEdges] = useState(new DataSet([]));
  const [metrics, setMetrics] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, nodeId: null });
  const [thicknessSelector, setThicknessSelector] = useState({ visible: false, fromNode: null, toNode: null });
  const [thicknessValue, setThicknessValue] = useState(3);
  const [networkInstance, setNetworkInstance] = useState(null);
  const [edgeContextMenu, setEdgeContextMenu] = useState({ visible: false, x: 0, y: 0, edgeId: null });

  // Store node positions to preserve layout
  const positionsRef = useRef({});

  // Fetch network and optionally preserve positions
  const fetchNetwork = () => {
    axios.get("http://127.0.0.1:8000/network/fetch-network")
      .then(response => {
        const fetchedNodes = response.data.nodes || [];
        const fetchedEdges = (response.data.edges || []).map(edge => ({
          ...edge,
          label: edge.weight !== undefined ? String(edge.weight) : '',
          title: edge.weight !== undefined ? `Weight: ${edge.weight}` : '',
          font: { align: "top", color: "#000", size: 16, strokeWidth: 0, vadjust: -10 }
        }));
        const fetchedMetrics = response.data || null;

        // Restore positions if available
        const nodesWithPositions = fetchedNodes.map(node => {
          if (positionsRef.current[node.id]) {
            return { ...node, ...positionsRef.current[node.id], fixed: { x: true, y: true } };
          }
          return node;
        });

        setNodes(new DataSet(nodesWithPositions));
        setEdges(new DataSet(fetchedEdges));
        setMetrics(fetchedMetrics);
      })
      .catch(error => console.error("Error fetching network:", error));
  };

  useEffect(() => {
    const container = networkRef.current;
    const data = { nodes, edges };
    const options = {
      nodes: {
        shape: "dot",
        size: 60,
        color: {
          background: "#ff66b2",
          border: "#ffffff",
          highlight: { background: "#ff3385", border: "#ffffff" }
        },
        font: { color: "white", size: 40, bold: true }
      },
      edges: {
        color: {
          color: "#ff99cc",
          highlight: "#ff3385",
          hover: "#ff3385"
        },
        width: 2.5,
        smooth: {
          enabled: true,
          type: "continuous"
        },
        arrows: {
          to: { enabled: false },
          from: { enabled: false }
        },
        font: {
          align: "top",
          color: "#000",
          size: 16,
          strokeWidth: 0,
          vadjust: -10
        }
      },
      layout: {
        improvedLayout: true
      },
      physics: {
        enabled: true,
        solver: "repulsion",
        repulsion: {
          nodeDistance: 200,
          springLength: 200,
          springConstant: 0.001,
          damping: 0.09
        },
        stabilization: {
          enabled: true,
          iterations: 200
        }
      },
      interaction: {
        hover: true,
        tooltipDelay: 100,
        zoomView: true,
        dragView: true,
        dragNodes: true,
        navigationButtons: true,
        selectable: true,
        selectConnectedEdges: false,
        multiselect: true,
        zoomSpeed: 0.5,
      }
    };

    const network = new Network(container, data, options);
    setNetworkInstance(network);

    // Restore positions if available
    if (Object.keys(positionsRef.current).length > 0) {
      network.setData({ nodes, edges });
      network.moveTo({ position: network.getViewPosition(), scale: network.getScale() });
      network.setOptions({ physics: false });
      nodes.forEach(node => {
        if (positionsRef.current[node.id]) {
          network.moveNode(node.id, positionsRef.current[node.id].x, positionsRef.current[node.id].y);
        }
      });
    }

    network.on("oncontext", (params) => {
      params.event.preventDefault();
      if (params.nodes.length > 0) {
        setContextMenu({ visible: true, x: params.event.clientX, y: params.event.clientY, nodeId: params.nodes[0] });
      } else if (params.edges.length > 0) {
        setEdgeContextMenu({ visible: true, x: params.event.clientX, y: params.event.clientY, edgeId: params.edges[0] });
      } else {
        setContextMenu({ visible: false });
        setEdgeContextMenu({ visible: false });
      }
    });

    network.on("doubleClick", (params) => {
      if (params.nodes.length > 0) {
        if (!selectedNode) {
          setSelectedNode(params.nodes[0]);
        } else {
          const targetNode = params.nodes[0];
          if (selectedNode !== targetNode) {
            setThicknessSelector({ visible: true, fromNode: selectedNode, toNode: targetNode });
          }
          setSelectedNode(null);
        }
      }
    });

    // Save positions on dragEnd or stabilization
    const savePositions = () => {
      const positions = network.getPositions();
      positionsRef.current = {};
      Object.entries(positions).forEach(([id, pos]) => {
        positionsRef.current[id] = { x: pos.x, y: pos.y };
      });
    };
    network.on("dragEnd", savePositions);
    network.on("stabilized", savePositions);

    return () => network.destroy();
    // eslint-disable-next-line
  }, [nodes, edges, selectedNode]);

  const removeNode = (nodeId) => {
    if (window.confirm(`Are you sure you want to remove ${nodeId}?`)) {
      axios.post("http://127.0.0.1:8000/network/remove-gene", { gene: nodeId })
        .then(() => {
          setNodes((prev) => new DataSet(prev.get().filter((node) => node.id !== nodeId)));
          setEdges((prev) => new DataSet(prev.get().filter((edge) => edge.from !== nodeId && edge.to !== nodeId)));
          setContextMenu({ visible: false });
        })
        .catch(error => console.error("Error removing node:", error));
    }
  };

  const modifyEdgeWeight = async () => {
    const edge = edges.get(edgeContextMenu.edgeId);
    const gene1 = edge.from;
    const gene2 = edge.to;

    const input = prompt(`Enter new weight for edge ${gene1} → ${gene2} (0.1 - 0.99):`, edge.width);
    const newWeight = parseFloat(input);

    if (isNaN(newWeight) || newWeight < 0.1 || newWeight > 0.99) {
      alert("Invalid weight. Must be between 0.1 and 0.99.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/network/modify-edge", {
        gene1,
        gene2,
        width: newWeight,
      });

      edges.update({
        id: edgeContextMenu.edgeId,
        width: newWeight,
        label: String(newWeight),
        title: `Weight: ${newWeight}`,
      });

      setEdgeContextMenu({ visible: false });
    } catch (error) {
      console.error("Error modifying edge weight:", error);
      alert("Failed to update edge weight.");
    }
  };

  const Compute_results = () => {
    axios.get("http://127.0.0.1:8000/network/compute-metrics")
      .then((response) => {
        setMetrics(response.data || null);
      })
      .catch((error) => {
        console.error('Error computing results:', error);
      });
  };

  return (
    <div className="network-page" onClick={() => {
      setContextMenu({ visible: false });
      setEdgeContextMenu({ visible: false });
    }}>
      <header>
        <h1>Breast Cancer Gene Network</h1>
      </header>
      <div className="network-container">
        <div className="control-panel">
          <h3>Controls</h3>
          <button onClick={fetchNetwork}>Fetch Network</button>
          <button onClick={Compute_results}>Compute Results</button>
        </div>

        <div className="network-box">
          <div ref={networkRef} style={{ width: "600px", height: "500px", border: "1px solid black" }}></div>
        </div>

        <div className="results-box">
          <h3>Network Metrics</h3>
          {metrics ? (
            <ul>
              <li> Nodes: {metrics.metrics.nodes ?? "N/A"}</li>
              <li> Edges: {metrics.metrics.edges ?? "N/A"}</li>
              <li> Avg. Neighbors: {metrics.metrics.avg_neighbors?.toFixed() ?? "N/A"}</li>
              <li> Diameter: {metrics.metrics.diameter ?? "N/A"}</li>
              <li> Centralization: {metrics.metrics.centralization?.toFixed(10) ?? "N/A"}</li>
              <li> Density: {metrics.metrics.density?.toFixed(10) ?? "N/A"}</li>
              <li> Radius: {metrics.metrics.radius ?? "N/A"}</li>
              <li> Path Length: {metrics.metrics.char_path_length ?? "N/A"}</li>
              <li> Clustering Coefficient: {metrics.metrics.clustering_coefficient?.toFixed(10) ?? "N/A"}</li>
              <li> Heterogeneity: {metrics.metrics.heterogeneity?.toFixed(10) ?? "N/A"}</li>
              <li> Connected Components: {metrics.metrics.connected_components ?? "N/A"}</li>
            </ul>
          ) : <p>Loading metrics...</p>}
        </div>
      </div>

      {contextMenu.visible && (
        <div className="context-menu" style={{ position: "absolute", top: contextMenu.y, left: contextMenu.x, background: "#fff", border: "1px solid black", padding: "5px", zIndex: 100 }}>
          <button onClick={() => removeNode(contextMenu.nodeId)}>Remove Node</button>
        </div>
      )}

      {edgeContextMenu.visible && (
        <div className="context-menu" style={{ position: "absolute", top: edgeContextMenu.y, left: edgeContextMenu.x, background: "#fff", border: "1px solid black", padding: "5px", zIndex: 100 }}>
          <button onClick={modifyEdgeWeight}>Modify Edge Weight</button>
        </div>
      )}
    </div>
  );
};

export default NetworkVisualization;
