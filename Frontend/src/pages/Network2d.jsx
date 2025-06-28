import React from "react";
import CytoscapeComponent from "react-cytoscapejs";

const elements = [
  { data: { id: "A", label: "Gene A" }, position: { x: 100, y: 100 } },
  { data: { id: "B", label: "Gene B" }, position: { x: 300, y: 100 } },
  { data: { source: "A", target: "B" } }, // Connection
];

const GeneNetwork2D = () => {
  return (
    <CytoscapeComponent
      elements={elements}
      style={{ width: "600px", height: "400px" }}
      layout={{ name: "grid" }}
      stylesheet={[
        {
          selector: "node",
          style: { backgroundColor: "blue", label: "data(label)" },
        },
        {
          selector: "edge",
          style: { width: 2, lineColor: "#ccc" },
        },
      ]}
    />
  );
};

export default GeneNetwork2D;
