import React, { useState, useEffect, useRef } from "react";
import { DataSet, Network } from "vis-network/standalone";
import axios from "axios";
import "vis-network/styles/vis-network.css";
import "../styles/Simpler_drug_doping.css";

// Helper to map node ids to alphabets
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function mapNodesToAlphabets(nodes) {
    let dict = {};
    let idToAlpha = {};
    let mappedNodes = [];
    nodes.forEach((node, idx) => {
        const letter = alphabet[idx];
        dict[letter] = node.id;
        idToAlpha[node.id] = letter;
        mappedNodes.push({
            ...node,
            id: letter,
            label: letter
        });
    });
    return { mappedNodes, dict, idToAlpha };
}

function mapEdgesToAlphabets(edges, idToAlpha) {
    return edges.map(edge => ({
        ...edge,
        from: idToAlpha[edge.from],
        to: idToAlpha[edge.to],
        title: edge.weight !== undefined ? `Weight: ${edge.weight}` : '',
        font: { align: "top", color: "#000", size: 16, strokeWidth: 0, vadjust: -10 }
    }));
}

// Helper to arrange nodes in a circle
function arrangeNodesInCircle(nodes, width = 600, height = 500, radius = 200) {
    const centerX = width / 2;
    const centerY = height / 2;
    const N = nodes.length;
    return nodes.map((node, idx) => {
        const angle = (2 * Math.PI * idx) / N;
        return {
            ...node,
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
            fixed: { x: true, y: true }
        };
    });
}

const SimplerDrugDoping = () => {
    const networkRef = useRef(null);
    const [nodes, setNodes] = useState(new DataSet([]));
    const [edges, setEdges] = useState(new DataSet([]));
    const [dict, setDict] = useState({});
    const [idToAlpha, setIdToAlpha] = useState({});
    const [selectedNode, setSelectedNode] = useState(null);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, nodeId: null });
    const [edgeContextMenu, setEdgeContextMenu] = useState({ visible: false, x: 0, y: 0, edgeId: null });
    const [mapReducePressed, setMapReducePressed] = useState(false);
    const [doxorubicinPressed, setDoxorubicinPressed] = useState(false);

    // Fetch original network without mapping node ids to alphabets
    const fetch_original_network = () => {
        axios.get("http://127.0.0.1:8000/network/fetch-network1")
            .then(response => {
                const fetchedNodes = response.data.nodes || [];
                const fetchedEdges = response.data.edges || [];

                // Arrange nodes in a circle using original ids
                const circularNodes = arrangeNodesInCircle(
                    fetchedNodes.map(node => ({
                        ...node,
                        label: node.label || node.id // Use label if present, else id
                    }))
                );

                // Build dict and idToAlpha using original ids (no mapping)
                const { mappedNodes, dict, idToAlpha } = mapNodesToAlphabets(fetchedNodes);
                setDict(dict);
                setIdToAlpha(idToAlpha);
                setNodes(new DataSet(circularNodes));
                setEdges(new DataSet(
                    fetchedEdges.map(edge => ({
                        ...edge,
                        from: edge.from,
                        to: edge.to,
                        title: edge.weight !== undefined ? `Weight: ${edge.weight}` : '',
                        font: { align: "top", color: "#000", size: 16, strokeWidth: 0, vadjust: -10 }
                    }))
                ));
                setMapReducePressed(false); // Reset Map/Reduce state
                setDoxorubicinPressed(false); // Hide impact box
            })
            .catch(error => console.error("Error fetching network:", error));
    };

    const fetchNetwork = () => {
        axios.get("http://127.0.0.1:8000/network/fetch-network1")
            .then(response => {
                const fetchedNodes = response.data.nodes || [];
                const fetchedEdges = response.data.edges || [];
                const { mappedNodes, dict, idToAlpha } = mapNodesToAlphabets(fetchedNodes);

                // Arrange nodes in a circle
                const circularNodes = arrangeNodesInCircle(mappedNodes);

                setDict(dict);
                setIdToAlpha(idToAlpha);
                setNodes(new DataSet(circularNodes));
                setEdges(new DataSet(mapEdgesToAlphabets(fetchedEdges, idToAlpha)));
                setMapReducePressed(true); // Enable Dop Drug Doxorubicin button
                setDoxorubicinPressed(false); // Hide impact box
            })
            .catch(error => console.error("Error fetching network:", error));
    };

    const handledopDrugDoxorubicin = () => {
        axios.get("http://127.0.0.1:8000/network/apply-doxorubicin")
            .then(response => {
                const fetchedNodes = response.data.nodes || [];
                const fetchedEdges = response.data.edges || [];
                // Use previous dict and idToAlpha mapping, do not re-map alphabets
                // Filter out removed nodes and update edges accordingly
                const removedIds = Object.values(dict).filter(id => !fetchedNodes.some(n => n.id === id));
                // Remove nodes from DataSet
                removedIds.forEach(id => {
                    const alpha = Object.keys(dict).find(key => dict[key] === id);
                    if (alpha) nodes.remove(alpha);
                });
                // Update edges
                const updatedEdges = mapEdgesToAlphabets(fetchedEdges, idToAlpha);

                // Arrange remaining nodes in a circle
                const currentNodes = nodes.get();
                const circularNodes = arrangeNodesInCircle(currentNodes);
                setNodes(new DataSet(circularNodes));
                setEdges(new DataSet(updatedEdges));
                setDoxorubicinPressed(true); // Show impact box
            })
            .catch(error => console.error("Error fetching network:", error));
    };

    useEffect(() => {
        const container = networkRef.current;
        const data = { nodes, edges };
        const options = {
            nodes: {
                shape: "dot",
                size: 20,
                color: {
                    background: "#ff66b2",
                    border: "#ffffff",
                    highlight: { background: "#ff3385", border: "#ffffff" }
                },
                font: { color: "white", size: 20, bold: true }
            },
            edges: {
                color: {
                    color: "#ff99cc",
                    highlight: "#ff3385",
                    hover: "#ff3385",
                },
                width: 2,
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
                    color: "#   ",
                    size: 16,
                    strokeWidth: 0,
                    vadjust: -10
                }
            },
            layout: {
                improvedLayout: false, // Disable improved layout to use manual positions
                hierarchical: false
            },
            physics: {
                enabled: false // Disable physics to keep nodes fixed in a circle
            },
            interaction: {
                hover: true,
                tooltipDelay: 100,
                zoomView: true,
                dragView: true,
                dragNodes: true, // Prevent dragging nodes out of the circle
                navigationButtons: true,
                selectable: true,
                selectConnectedEdges: false,
                multiselect: true,
                zoomSpeed: 0.5,
            }
        };
        // const handledict = (ns) => {

        const network = new Network(container, data, options);

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
                    setSelectedNode(null);
                }
            }
        });

        return () => network.destroy();
        // eslint-disable-next-line
    }, [nodes, edges, selectedNode]);

    return (
        <div className="network-page" onClick={() => {
            setContextMenu({ visible: false });
            setEdgeContextMenu({ visible: false });
        }}>
            <header>
                <h1>Simpler Drug Doping</h1>
            </header>
            <div className="network-container">
                <div className="control-impact-box" >
                  <div className="control-panel">
                    <h3>CONTROLS</h3>
                    <button onClick={fetch_original_network}>Fetch Network</button>
                    <button onClick={fetchNetwork}>Map</button>
                    <button 
                        onClick={handledopDrugDoxorubicin} 
                        disabled={!mapReducePressed}
                        style={{ opacity: mapReducePressed ? 1 : 0.5, cursor: mapReducePressed ? "pointer" : "not-allowed" }}
                    >
                        Dop Drug Doxorubicin
                    </button>
                  </div>

                  {doxorubicinPressed && (
                    <div className="impact-box">
                        <h3>Impact of Doxorubicin Drug</h3>
                        <div>
                            <ul>
                                <li> Removed G Gene</li>
                                <li> Weakened interaction between B and E</li>
                            </ul>
                        </div>
                    </div>
                  )}
                </div>
                <div className="network-box">
                    <div ref={networkRef} style={{ width: "600px", height: "419px", border: "1px solid black" }}></div>
                </div>
                <div className="results-box">
                    <h3>DICTIONARY</h3>
                    {dict && Object.keys(dict).length > 0 ? (
                        <div>
                            <ul>
                                {Object.entries(dict).map(([letter, gene]) => (
                                    <li key={letter}><b>{letter}</b>: {gene}</li>
                                ))}
                            </ul>
                        </div>
                    ) : <p>Loading dictionary...</p>}
                </div>
            </div>
        </div>
    );
};

export default SimplerDrugDoping;
