import { useEffect, useState, useRef } from "react";
import ForceGraph3D from "react-force-graph-3d";
import * as THREE from "three";
import "../styles/Network3d.css"; // Ensure you have this CSS file for styling
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
    fetch("http://127.0.0.1:8000/network/fetch-network1")
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

  const linkThreeObject = (link) => {
    const src = typeof link.source === "object" ? link.source : graphData.nodes.find(n => n.id === link.source);
    const tgt = typeof link.target === "object" ? link.target : graphData.nodes.find(n => n.id === link.target);

    if (!src || !tgt) return null;

    // Position label at the center of the edge
    const t = 0.5;
    const pos = {
      x: src.x + (tgt.x - src.x) * t,
      y: src.y + (tgt.y - src.y) * t,
      z: src.z + (tgt.z - src.z) * t,
    };

    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 36px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Rounded background
    const radius = 18;
    ctx.beginPath();
    ctx.moveTo(10, radius);
    ctx.arcTo(10, 10, canvas.width - 10, 10, radius);
    ctx.arcTo(canvas.width - 10, 10, canvas.width - 10, canvas.height - 10, radius);
    ctx.arcTo(canvas.width - 10, canvas.height - 10, 10, canvas.height - 10, radius);
    ctx.arcTo(10, canvas.height - 10, 10, 10, radius);
    ctx.closePath();
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw weight
    ctx.fillStyle = "#000";
    ctx.fillText(link.weight.toString(), canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false })
    );
    sprite.scale.set(32, 16, 1);
    sprite.position.set(pos.x, pos.y, pos.z);

    sprite.onBeforeRender = function (renderer, scene, camera) {
      sprite.quaternion.copy(camera.quaternion);
    };

    return sprite;
  };

  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.scene().background = new THREE.Color("white");
    }
  }, [graphData]);

  return (
    <>
      <div className="Network3d-container" >
        
        <div>
          <h1 className="title-1">Network Visualization</h1>

        </div>
        

      </div>
      <div className="Network3d-box"ref={containerRef} >
        <ForceGraph3D
          ref={fgRef}
          graphData={graphData}
          nodeThreeObject={nodeThreeObject}
          linkThreeObjectExtend={true}
          linkThreeObject={linkThreeObject}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={(l) => l.weight * 1.2}
          linkWidth={(l) => l.weight * 1.5}
          linkColor={() => "black"}
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
