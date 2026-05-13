import ReactECharts from "echarts-for-react";
import { Position } from "react-flow-renderer";


const toTitleCase = (str) => 
  str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const SankeyChartDDSixthMayThree = () => {


 const rawData = [

  // -------- SOURCES --------
  ["Grid Supply", "Main Transformer", 6000],
  ["Solar PV", "Main Transformer", 1200],
  ["Diesel Generator", "DG Backup Bus", 2000],

  // -------- MAIN DISTRIBUTION --------
  ["Main Transformer", "Main LT Panel", 7200],
  ["DG Backup Bus", "Main LT Panel", 1500],

  ["Main Transformer", "UPS System", 2000],
  ["UPS System", "Critical Panel (ICU/OT)", 1800],

  // -------- MAIN LT PANEL --------
  ["Main LT Panel", "HVAC Systems", 3000],
  ["Main LT Panel", "Wards", 1200],
  ["Main LT Panel", "Admin & Common Areas", 800],
  ["Main LT Panel", "Diagnostics (MRI/CT)", 1000],
  ["Main LT Panel", "Labs", 600],

  // -------- CRITICAL PANEL --------
  ["Critical Panel (ICU/OT)", "ICU", 900],
  ["Critical Panel (ICU/OT)", "Operation Theatre (OT)", 900],

  // -------- HVAC --------
  ["HVAC Systems", "Chillers", 1800],
  ["HVAC Systems", "AHUs", 1200],

  // -------- ICU --------
  ["ICU", "Ventilators", 400],
  ["ICU", "Lighting", 200],
  ["ICU", "Plug Loads", 300],

  // -------- OT --------
  ["Operation Theatre (OT)", "Surgical Equipment", 500],
  ["Operation Theatre (OT)", "Lighting", 200],
  ["Operation Theatre (OT)", "AHUs", 200],

  // -------- DIAGNOSTICS --------
  ["Diagnostics (MRI/CT)", "Imaging Equipment", 900],
  ["Diagnostics (MRI/CT)", "HVAC Systems", 100],

  // -------- LABS --------
  ["Labs", "Lab Equipment", 400],
  ["Labs", "Lighting", 100],
  ["Labs", "Plug Loads", 100],

  // -------- WARDS --------
  ["Wards", "Lighting", 600],
  ["Wards", "Plug Loads", 600],

  // -------- ADMIN --------
  ["Admin & Common Areas", "Lighting", 400],
  ["Admin & Common Areas", "Plug Loads", 400]

];

  // ----------------------------------
  // BUILD NODES & LINKS (DYNAMIC)
  // ----------------------------------
  const nodesSet = new Set();
  const linksMap = new Map();

  rawData.forEach((row) => {
    const value = row[row.length - 1];
    const levels = row.slice(0, -1);

    levels.forEach((n) => nodesSet.add(n));

    for (let i = 0; i < levels.length - 1; i++) {
      const source = levels[i];
      const target = levels[i + 1];
      const key = `${source}->${target}`;

      if (!linksMap.has(key)) {
        linksMap.set(key, { source, target, value });
      } else {
        linksMap.get(key).value += value;
      }
    }
  });

  const links = Array.from(linksMap.values());
  
const nodeValueMap = new Map();
const incomingMap = new Map();
const outgoingMap = new Map();
 
// Step 1: calculate incoming & outgoing from links
links.forEach(({ source, target, value }) => {
  outgoingMap.set(source, (outgoingMap.get(source) || 0) + value);
  incomingMap.set(target, (incomingMap.get(target) || 0) + value);
});
 
// // Step 2: decide final node value
// nodesSet.forEach((node) => {
//   if (outgoingMap.has(node)) {
//     // If node has outgoing → use outgoing
//     nodeValueMap.set(node, outgoingMap.get(node));
//   } else if (incomingMap.has(node)) {
//     // If no outgoing → leaf node → use incoming
//     nodeValueMap.set(node, incomingMap.get(node));
//   } else {
//     nodeValueMap.set(node, 0);
//   }
// });


        nodesSet.forEach((node) => {

      // always prefer incoming
      if (incomingMap.has(node)) {
        nodeValueMap.set(node, incomingMap.get(node));
      } 
      
      // source nodes
      else if (outgoingMap.has(node)) {
        nodeValueMap.set(node, outgoingMap.get(node));
      } 
      
      else {
        nodeValueMap.set(node, 0);
      }

    });



  // from here

  // const columnColors = ["#F8B4B4", "#93C5FD", "#A7F3D0", "#D8B4FE"];
  const nodeLevel = {};




  const columnColors = [

    "#7950f2", // deep royal purple
    "#2f9e44", // forest green
    "#f59f00", // rich gold

    "#364fc7", // deep indigo
    "#0ca678", // premium teal
    "#e8590c", // burnt orange
  ];



  rawData.forEach(row => {
    const levels = row.slice(0, -1);

    levels.forEach((node, index) => {
      if (nodeLevel[node] === undefined) {
        nodeLevel[node] = index;
      }
    });
  });



  const nodes = Array.from(nodesSet).map((name) => {
    const level = nodeLevel[name] || 0;
    const color = columnColors[level] || "#ccc";
    const val = nodeValueMap.get(name);

    return {
      name,
      itemStyle: {
        color: color
      },
      label: {
        show: true,
        // fontSize: 11,
        formatter: () =>
          val !== undefined && val > 0
            ? `${name} (${val.toFixed()} KWh)`
            : name
      }
    };
  });

  // ----------------------------------
  // SANKEY OPTIONS (CLEAN LIKE SS)
  // ----------------------------------
  const option = {
    tooltip: {
      trigger: "item",
      formatter: (p) =>
        p.data?.source
          ? `${p.data.source} → ${p.data.target}: ${p.data.value}`
          : p.name
    },
    series: [
      {
        type: "sankey",
        data: nodes,
        links: links,
        // orient: "vertical", 

        nodeWidth: 14,
        nodeGap: 10,

        lineStyle: {
          color: "source",
          curveness: 0.5,
          opacity: 0.6
        },

        // label: {
        //   color: "#333",
        //   fontSize: 22,
        //   fontWeight: "bold"
        // },

        // emphasis: {
        //   focus: "adjacency"
        // }

        // 🔴 IMPORTANT PART
            label: {
                show: true,
                fontSize: 18,          // 👈 NOW THIS WILL WORK
                // fontWeight: "bold",
                color: "#000",
                overflow: "none"       // 👈 stops auto shrinking
            },

            labelLayout: {
                hideOverlap: false     // 👈 stops auto hiding/scaling
            },

            emphasis: {
                focus: "adjacency",
                label: {
                    fontSize: 18          // 👈 bigger on hover (optional)
                }
            }
      }
    ]
  };

  return (
    <div style={{ width: "100%", height: "1300px" }}>
      <ReactECharts option={option} style={{ height: "100%" }} />
    </div>
  );
};

export default SankeyChartDDSixthMayThree;

