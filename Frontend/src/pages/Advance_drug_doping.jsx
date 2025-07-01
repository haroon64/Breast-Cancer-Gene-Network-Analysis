import { useEffect, useState, useRef } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';
import '../styles/Drug_gene_doping.css';

const Advance_drug_doping = () => {
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [beforeMetrics, setBeforeMetrics] = useState(null);
    const [afterMetrics, setAfterMetrics] = useState(null);
    const [explanation, setExplanation] = useState([]);
    const [effects, setEffects] = useState([]);
    const fgRef = useRef();
    const fgRef1 = useRef();
    const beforeRef = useRef();
    const afterRef = useRef();
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
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
        const ctx = canvas.getContext("2d");
        ctx.font = "bold 55px Arial";
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

    const drugOptions = [
        { label: "Doxorubicin", value: "Doxorubicin" },
        { label: "Paclitaxel", value: "Paclitaxel" },
        { label: "Sirolimus + Paclitaxel", value: "Sirolimus+Paclitaxel" },
        { label: "Doxorubicin + Vorinostat", value: "Doxorubicin+Vorinostat" },
        { label: "Vincristine + Doxorubicin + Cyclophosphamide", value: "Vincristine+Doxorubicin+Cyclophosphamide" }
    ];

    const drugEndpoints = {
        "Doxorubicin": "http://127.0.0.1:8000/network/apply-doxorubicin",
        "Paclitaxel": "http://127.0.0.1:8000/network/apply-paclitaxel",
        "Sirolimus+Paclitaxel": "http://127.0.0.1:8000/network/apply-paclitaxel-sirolimus",
        "Doxorubicin+Vorinostat": "http://127.0.0.1:8000/network/apply-vorinostat-doxorubicin",
        "Vincristine+Doxorubicin+Cyclophosphamide": "http://127.0.0.1:8000/network/apply-vincristine-doxorubicin-cyclophosphamide"
    };

    const [selectedDrugs, setSelectedDrugs] = useState(drugOptions[0].value);

    const handleDropdownChange = (e) => {
        const idx = Number(e.target.value);
        setSelectedDrugs(drugOptions[idx].value);

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

    const metricsList = [
        { key: "nodes", label: "Nodes" },
        { key: "edges", label: "Edges" },
        { key: "avg_neighbors", label: "Avg Neighbors" },
       
        { key: "clustering_coefficient", label: "Clustering Coefficient" },
        { key: "density", label: "Network density" },
        { key: "heterogeneity", label: "Network Heterogeneity" },
        { key: "connected_components", label: "Connected Components" },
        { key: "centralization", label: "Network centralization" },
       
    ];

    // Simple link color and width (no hover)
    const getLinkColor = () => "#000000";
    const getLinkWidth = (l) => Math.max(l.weight * 1.5, 1);

    return (
        <div className="Container1">
            <div className="Home-Header">
                <h1>Advance Drug Doping Analysis</h1>
                <p>Visualize and analyze the impact of drug interventions on protein-gene networks in breast cancer research. Compare network states before and after drug doping to understand therapeutic mechanisms. </p>
            </div>

            <div className="Control-pannel">
                <div className='pannel-container'>
                    <p>Drug:</p>
                    <select
                        className="control-input"
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
                </div>
                <div className='Impact-container'>
                    <h3>Impact of Doping with {selectedDrugs.replace(/\+/g, " + ")}</h3>
                    <ul>
                        {effects && effects.length > 0 && (
                            effects.map((effect, idx) => (
                                <li key={idx}>{effect}</li>
                            ))
                        )}
                    </ul>
                </div>
            </div>

            <div className="network-section">
                <div className="before-network" >
                    <div className="panel-header">
                        <h2 className="panel-title">BEFORE DRUG DOPING</h2>
                    </div>
                    <div className="boxed" ref={beforeRef} style={{ position: 'relative' }}>
                        <ForceGraph3D
                            ref={fgRef1}
                            graphData={graphData}
                            nodeThreeObject={nodeThreeObject}
                            linkDirectionalParticles={2}
                            linkWidth={getLinkWidth}
                            linkColor={getLinkColor}
                            linkOpacity={0.8}
                            enableNodeDrag={false}
                            enableNavigationControls
                            warmupTicks={0}
                            cooldownTicks={0}
                            width={dimensions.width}
                            height={dimensions.height}
                          
                        />
                    </div>
                    <div className="network-stats">
                        <div className="stat-item">
                            <div className="stat-value" >28</div>
                            <div className="stat-label">Nodes</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value" >69</div>
                            <div className="stat-label">Edges</div>
                        </div>
                    </div>
                </div>
                <div className="after-network" >
                    <div className="panel-header">
                        <h2 className="panel-title">AFTER DRUG DOPING</h2>
                    </div>
                    <div className="boxed" ref={afterRef} style={{ position: 'relative' }}>
                        <ForceGraph3D
                            ref={fgRef}
                            graphData={afterGraphData}
                            nodeThreeObject={nodeThreeObject}
                            linkDirectionalParticles={2}
                            linkWidth={getLinkWidth}
                            linkColor={getLinkColor}
                            linkOpacity={0.8}
                            enableNodeDrag={false}
                            enableNavigationControls
                            warmupTicks={0}
                            cooldownTicks={0}
                            width={dimensions.width}
                            height={dimensions.height}
                        />
                    </div>
                    <div className="network-stats">
                        <div className="stat-item">
                            <div className="stat-value" >{afterMetrics?.nodes ?? 0}</div>
                            <div className="stat-label">Nodes</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">{afterMetrics?.edges ?? 0}</div>
                            <div className="stat-label">Edges</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="metrics-section">
                <h1 className="title1">Comparison of Biological Interpretation of Network Metrics Before and After  </h1>
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
                            ? metricsList.map(({ key, label }, idx) => (
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
                                        {explanation[idx] && explanation[idx][key] && explanation[idx][key].interpretation
                                            ? explanation[idx][key].interpretation
                                            : explanation[idx] && explanation[idx].interpretation
                                                ? explanation[idx].interpretation
                                                : 'N/A'}
                                    </td>
                                    <td>
                                        {explanation[idx] && explanation[idx][key] && explanation[idx][key].impact
                                            ? explanation[idx][key].impact
                                            : explanation[idx] && explanation[idx].Impact
                                                ? explanation[idx].Impact
                                                : 'N/A'}
                                    </td>
                                    <td>
                                        {explanation[idx] && explanation[idx][key] && explanation[idx][key].references
                                            ? explanation[idx][key].references
                                            : explanation[idx] && explanation[idx].reference
                                                ? explanation[idx].reference
                                                : 'N/A'}
                                    </td>
                                </tr>
                            ))
                            : metricsList.map(({ key, label }) => (
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
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Advance_drug_doping;
