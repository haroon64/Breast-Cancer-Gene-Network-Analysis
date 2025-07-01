import { useEffect, useState, useRef } from "react";
import ForceGraph3D from "react-force-graph-3d";
import * as THREE from "three";
import "../styles/Network3d.css";

const Network3d = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const fgRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/network/fetch-network")
      .then((res) => res.json())
      .then((data) => {
        const N = data.nodes.length;
        const radius = 300;
        data.nodes.forEach((node, i) => {
          const angle = (i / N) * 2 * Math.PI;
          node.fx = radius * Math.cos(angle);
          node.fy = radius * Math.sin(angle);
          node.fz = 0;
        });
        const formattedLinks = data.edges.map((edge) => ({
          source: edge.from,
          target: edge.to,
          weight: edge.weight,
        }));
        setGraphData({ nodes: data.nodes, links: formattedLinks });
      })
      .catch((err) => console.error(err));
  }, []);


  const nodeThreeObject = (node) => {
    const group = new THREE.Group();
    const r = 16;
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(r, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xff69b4 })
    );
    group.add(sphere);

    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext("2d");
    ctx.font = "bold 60px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx.fillText(node.id, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false })
    );
    sprite.scale.set(80, 40, 1);
    sprite.position.set(0, 0, r + 2);
    group.add(sprite);

    return group;
  };

  // Helper to identify a link uniquely
  const linkKey = (l) =>
    (typeof l.source === "object" ? l.source.id : l.source) +
    "-" +
    (typeof l.target === "object" ? l.target.id : l.target);

  // Custom link object for label (not needed for color)
  const linkThreeObject = (link) => null;

  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
      if (fgRef.current && graphData.nodes.length > 0) {
        const avg = graphData.nodes.reduce(
          (acc, n) => {
            acc.x += n.fx ?? n.x ?? 0;
            acc.y += n.fy ?? n.y ?? 0;
            acc.z += n.fz ?? n.z ?? 0;
            return acc;
          },
          { x: 0, y: 0, z: 0 }
        );
        avg.x /= graphData.nodes.length;
        avg.y /= graphData.nodes.length;
        avg.z /= graphData.nodes.length;
        fgRef.current.cameraPosition(
          { x: avg.x, y: avg.y, z: avg.z + 800 },
          { x: avg.x, y: avg.y, z: avg.z },
          1000
        );
      }
    };
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, [graphData.nodes.length]);

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.scene().background = new THREE.Color("white");
    }
  }, [graphData]);

  // Custom link color: darker on hover
  const getLinkColor = (l) => {
    if (
      hoveredLink &&
      linkKey(l) === linkKey(hoveredLink)
    ) {
      return "#222"; // darker color on hover
    }
    return "#000"; // normal color
  };

  // Custom link width: slightly thicker on hover
  const getLinkWidth = (l) => {
    if (
      hoveredLink &&
      linkKey(l) === linkKey(hoveredLink)
    ) {
      return l.weight * 2.5;
    } 
    return l.weight * 1.5;
  };

  return (
    <>
      <div className="Network3d-container">
        <div>
          <h1 className="title-1">Protein Gene Network</h1>
          <p className="description">
            This network displays interactions among 28 key genes differentially expressed in breast cancer. Genes like EZH2, TOP2A, LEP, and SPP1 are central to processes such as tumor progression, cell cycle regulation, and metabolism. The edges represent protein–protein interactions, highlighting how these genes function collectively rather than in isolation. Such network-based analysis helps identify critical nodes that may serve as potential biomarkers or drug targets in breast cancer therapy.
          </p>
        </div>
      </div>
      <div className="Network3d-box" ref={containerRef}>
        <ForceGraph3D
          ref={fgRef}
          graphData={graphData}
          nodeThreeObject={nodeThreeObject}
          linkThreeObjectExtend={true}
          linkThreeObject={linkThreeObject}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={(l) => l.weight * 1.2}
          linkWidth={getLinkWidth}
          linkColor={getLinkColor}
          linkOpacity={1}
          linkMaterial={new THREE.MeshBasicMaterial({ color: "black", transparent: false })}
          enableNodeDrag={false}
          enableNavigationControls
          warmupTicks={0}
          cooldownTicks={0}
          width={dimensions.width}
          height={dimensions.height}
          onLinkHover={setHoveredLink}
          linkLabel={(l) => `Weight: ${l.weight}`}
        />
      </div>
    </>
  );
};

export default Network3d;
