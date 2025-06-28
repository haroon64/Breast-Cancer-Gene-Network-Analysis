import { useEffect, useState, useRef } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';
import '../styles/Drug_gene_doping.css';
import { link } from 'd3';

const DoxorubicinDrug = () => {
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [beforeMetrics, setBeforeMetrics] = useState(null);
    const [afterMetrics, setAfterMetrics] = useState(null);
    const [explanation, setExplanation] = useState("");
    const [effects, setEffects] = useState([]);
    const fgRef = useRef();
    const fgRef1 = useRef();
    const beforeRef = useRef();
    const afterRef = useRef();
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
    const [afterGraphData, setAfterGraphData] = useState({ nodes: [], links: [] });
    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/network/fetch-network")
            .then((res) => res.json())
            .then((data) => {
                const N = data.nodes.length;
                setBeforeMetrics(data.metrics);

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
        canvas.style.width = "400px";
        canvas.style.height = "300px";
        const ctx = canvas.getContext("2d");
        ctx.font = "bold 55px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "upper-middle";
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

        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 256;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "bold 36px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const radius = 18;
        ctx.beginPath();
        ctx.moveTo(10, radius);
        ctx.arcTo(10, 10, canvas.width - 10, 10, radius);
        ctx.arcTo(canvas.width - 10, 10, canvas.width - 10, canvas.height - 10, radius);
        ctx.arcTo(canvas.width - 10, canvas.height - 10, 10, canvas.height - 10, radius);
        ctx.arcTo(10, canvas.height - 10, 10, 10, radius);
        ctx.closePath();

        const texture = new THREE.CanvasTexture(canvas);
        const sprite = new THREE.Sprite(
            new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false })
        );
        sprite.scale.set(32, 16, 1);

        if (src.x !== undefined && tgt.x !== undefined) {
            sprite.position.set(
                (src.x + tgt.x) / 2,
                (src.y + tgt.y) / 2,
                (src.z + tgt.z) / 2
            );
        }

        sprite.onBeforeRender = function (_renderer, _scene, camera) {
            sprite.quaternion.copy(camera.quaternion);
        };
    };

    useEffect(() => {
        const resize = () => {
            if (beforeRef.current) {
                const rect = beforeRef.current.getBoundingClientRect();
                setDimensions({ width: rect.width, height: rect.height });
            }
        };
        window.addEventListener("resize", resize);
        resize();
        return () => window.removeEventListener("resize", resize);
    }, []);

    useEffect(() => {
        if (fgRef.current && fgRef.current.scene()) {
            fgRef.current.scene().background = new THREE.Color("white");
        }
        if (fgRef1.current && fgRef1.current.scene()) {
            fgRef1.current.scene().background = new THREE.Color("white");
        }
    }, [graphData, afterGraphData]);

    // Drug options and endpoints mapping
    const drugOptions = [
        { label: "Doxorubicin", value: "Doxorubicin" },
        { label: "Paclitaxel", value: "Paclitaxel" },
        { label: "Sirolimus + Paclitaxel", value: "Sirolimus+Paclitaxel" },
        { label: "Doxorubicin + Vorinostat", value: "Doxorubicin+Vorinostat" },
        { label: "Vincristine + Doxorubicin + Cyclophosphamide", value: "Vincristine+Doxorubicin+Cyclophosphamide" }
    ];

    // Map drug option values to correct endpoints
    const drugEndpoints = {
        "Doxorubicin": "http://127.0.0.1:8000/network/apply-doxorubicin",
        "Paclitaxel": "http://127.0.0.1:8000/network/apply-paclitaxel",
        "Sirolimus+Paclitaxel": "http://127.0.0.1:8000/network/apply-paclitaxel-sirolimus",
        "Doxorubicin+Vorinostat": "http://127.0.0.1:8000/network/apply-vorinostat-doxorubicin",
        "Vincristine+Doxorubicin+Cyclophosphamide": "http://127.0.0.1:8000/network/apply-vincristine-doxorubicin-cyclophosphamide"
    };

    // Default to first option
    const [selectedDrugs, setSelectedDrugs] = useState(drugOptions[0].value);

    const handleDropdownChange = (e) => {
        console.log(effects)
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
        const idx = e.target.value;
        setSelectedDrugs(drugOptions[idx].value);
    };

    const handleDop = () => {
        if (fgRef1.current && fgRef1.current.scene()) {
            fgRef1.current.scene().background = new THREE.Color("white");
        }
        if (!selectedDrugs) {
            alert("Please select a drug or combination before doping.");
            return;
        }
        const endpoint = drugEndpoints[selectedDrugs];
        if (!endpoint) {
            alert("No endpoint found for selected drug/combination.");
            return;
        }
        fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (fgRef.current && fgRef.current.scene()) {
                    fgRef.current.scene().background = new THREE.Color("white");
                }
                console.log(data.metrics);
                console.log(data.explanation);
                console.log(data.effects);

                if (data.nodes && data.edges && data.metrics && data.explanation && data.effects) {
                    setExplanation(data.explanation);
                    setEffects(data.effects);
                    const graph = {
                        nodes: data.nodes,
                        edges: data.edges,
                    };

                    const N = graph.nodes.length;
                    const radius = 300;

                    graph.nodes.forEach((node, i) => {
                        const angle = (i / N) * 2 * Math.PI;
                        node.fx = radius * Math.cos(angle);
                        node.fy = radius * Math.sin(angle);
                        node.fz = 0;
                    });

                    const formattedLinks = graph.edges.map((edge) => ({
                        source: edge.from,
                        target: edge.to,
                        weight: edge.weight,
                    }));

                    setAfterGraphData({ nodes: graph.nodes, links: formattedLinks });
                    setMetrics(data.metrics);
                    setAfterMetrics(data.metrics);
                } else {
                    alert("Invalid response format.");
                }
            });
    };

    // List of metrics to display
    const metricsList = [
        { key: "nodes", label: "Nodes" },
        { key: "edges", label: "Edges" },
        { key: "avg_neighbors", label: "Avg Neighbors" },
        { key: "radius", label: "Radius" },
        { key: "clustering_coefficient", label: "Clustering Coefficient" },
        { key: "density", label: "Network density" },
        { key: "heterogeneity", label: "Network Heterogeneity" },
        { key: "connected_components", label: "Connected Components" },
        { key: "centralization", label: "Network centralization" },
        { key: "diameter", label: "Diameter" },
    ];

    return (
        <div className="Container1">
            <div className="Control-pannel">
                <h1 className="title1">Drug Gene Doping </h1>
                <div>
                    <select
                        className="category-dropdown"
                        onChange={handleDropdownChange}
                        value={drugOptions.findIndex(opt => opt.value === selectedDrugs)}
                    >
                        {drugOptions.map((option, idx) => (
                            <option key={option.label} value={idx}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <button className='dop-button' onClick={handleDop}> DOP </button>
                    <div className='Impact-container'>
                        <h2 className="title4">Impact of Doping with {selectedDrugs.replace(/\+/g, " + ")}</h2>
                        <table className="impact-table">
                            <thead>
                                <tr>
                                    <th>Impact on Breast Cancer Gene Network</th>
                                </tr>
                            </thead>
                            <tbody>
                                {effects && effects.length > 0 && (
                                    effects.map((effect, idx) => (
                                        <tr key={idx}>
                                            <td>{effect}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="network-section">
                <div className="before-network" ref={beforeRef}>
                    <ForceGraph3D 
                        ref={fgRef1}
                        graphData={graphData}
                        nodeThreeObject={nodeThreeObject}
                        linkThreeObjectExtend={true}
                        linkThreeObject={linkThreeObject}
                        linkDirectionalParticles={2}
                        linkDirectionalParticleWidth={(l) => l.weight * 1.2}
                        linkWidth={(l) => l.weight * 2}
                        linkColor={() => "black"}
                        linkOpacity={1}
                        linkMaterial={new THREE.MeshBasicMaterial({ color: "black", transparent: false })}
                        enableNodeDrag={false}
                        enableNavigationControls
                        warmupTicks={0}
                        cooldownTicks={0}
                        width={dimensions.width}
                        height={dimensions.height}
                        linkLabel={(l) => `Weight: ${l.weight}`}
                    />

                    <h3 className="title2">Before Doping Network </h3>
                </div>
                <div className="after-network" ref={afterRef}>
                    <ForceGraph3D
                        ref={fgRef}
                        graphData={afterGraphData}
                        nodeThreeObject={nodeThreeObject}
                        linkThreeObjectExtend={true}
                        linkThreeObject={linkThreeObject}
                        linkDirectionalParticles={2}
                        linkDirectionalParticleWidth={(l) => l.weight * 1.2}
                        linkWidth={(l) => l.weight * 2}
                        linkColor={() => "black"}
                        linkOpacity={1}
                        linkMaterial={new THREE.MeshBasicMaterial({ color: "black", transparent: false })}
                        enableNodeDrag={false}
                        enableNavigationControls
                        warmupTicks={0}
                        cooldownTicks={0}
                        width={dimensions.width}
                        height={dimensions.height}
                        linkLabel={(l) => `Weight: ${l.weight}`}
                    />
                    <h3 className="title2">After Doping Network </h3>
                </div>
            </div>

            <div className="metrics-section">
                <h1 className="title1">Biological Interpretation of Network Metrics (Before vs After {selectedDrugs.replace(/\+/g, " + ")})</h1>
                <table className="information-table">
                    <thead>
                        <tr>
                            <th>Metric</th>
                            <th>Before</th>
                            <th>After</th>
                            <th>Interpretation</th>
                            <th>Impact on Breast Cancer</th>
                            <th>References</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(explanation) && explanation.length > 0
                            ? explanation.map((exp, idx) => (
                                <tr key={idx}>
                                    <td>
                                        {metricsList[idx] ? metricsList[idx].label : 'N/A'}
                                    </td>
                                    <td>
                                        {beforeMetrics && metricsList[idx] && beforeMetrics[metricsList[idx].key] !== undefined && beforeMetrics[metricsList[idx].key] !== null
                                            ? beforeMetrics[metricsList[idx].key]
                                            : 'N/A'}
                                    </td>
                                    <td>
                                        {metrics && metricsList[idx] && metrics[metricsList[idx].key] !== undefined && metrics[metricsList[idx].key] !== null
                                            ? metrics[metricsList[idx].key]
                                            : 'N/A'}
                                    </td>
                                    <td>
                                        {exp && exp[metricsList[idx]?.key] && exp[metricsList[idx]?.key].interpretation
                                            ? exp[metricsList[idx]?.key].interpretation
                                            : exp && exp.interpretation
                                                ? exp.interpretation
                                                : 'N/A'}
                                    </td>
                                    <td>
                                        {exp && exp[metricsList[idx]?.key] && exp[metricsList[idx]?.key].impact
                                            ? exp[metricsList[idx]?.key].impact
                                            : exp && exp.Impact
                                                ? exp.Impact
                                                : 'N/A'}
                                    </td>
                                    <td>
                                        {exp && exp[metricsList[idx]?.key] && exp[metricsList[idx]?.key].references
                                            ? exp[metricsList[idx]?.key].references
                                            : exp && exp.reference
                                                ? exp.reference
                                                : 'N/A'}
                                    </td>
                                </tr>
                            ))
                            : metricsList.map(({ key, label }, idx) => (
                                <tr key={key}>
                                    <td>{label}</td>
                                    <td>
                                        {beforeMetrics && beforeMetrics[key] !== undefined && beforeMetrics[key] !== null
                                            ? beforeMetrics[key]
                                            : 'N/A'}
                                    </td>
                                    <td>
                                        {metrics && metrics[key] !== undefined && metrics[key] !== null
                                            ? metrics[key]
                                            : 'N/A'}
                                    </td>
                                    <td>
                                        {explanation && explanation[key] && explanation[key].interpretation
                                            ? explanation[key].interpretation
                                            : explanation && explanation.interpretation
                                                ? explanation.interpretation
                                                : 'N/A'}
                                    </td>
                                    <td>
                                        {explanation && explanation[key] && explanation[key].impact
                                            ? explanation[key].impact
                                            : explanation && explanation.Impact
                                                ? explanation.Impact
                                                : 'N/A'}
                                    </td>
                                    <td>
                                        {explanation && explanation[key] && explanation[key].references
                                            ? explanation[key].references
                                            : explanation && explanation.reference
                                                ? explanation.reference
                                                : 'N/A'}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoxorubicinDrug;
