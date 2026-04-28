import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getHeatmapHomePage, getMainMeterdatabybuilding } from "../Services/graph.service";
import { getDgmonthlyProduce } from "../Services/graph.service";
import { useEnergy } from "../context/energyMainmetercontext"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { SankeyController, Flow } from "chartjs-chart-sankey";
import { Chart } from "react-chartjs-2";
import { ReactComponent as WifiOffIcon } from "../config/svgfiles/wifi-off.svg";
import { ReactComponent as EnergyIcon } from "../config/svgfiles/zap.svg";
import ReactECharts from "echarts-for-react";


const HeatmapChart = () => {

  const [chartData, setChartData] = useState({
    xAxis: [],
    yAxis: [],
    data: [],
  });
   const [loading, setLoading] = useState(true);


  // 🔥 API call
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 👉 Replace with your API
         
        const result = await getHeatmapHomePage('2026-03');

        console.log("asdaf",result)

        setChartData({
          xAxis: result.xAxis,
          yAxis: result.yAxis,
          data: result.values,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching heatmap data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);



    // X-axis (columns)
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Y-axis (rows)
  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

  // Generate dummy data
  const data = [];
  for (let i = 0; i < weeks.length; i++) {
    for (let j = 0; j < days.length; j++) {
      data.push([j, i, Math.floor(Math.random() * 100)]);
    }
  }
  console.log('adsfnvn', data)

  // Chart config
  const option = {
    tooltip: {
      position: "top",
    },

    grid: {
      height: "70%",
      top: "10%",
    },

    xAxis: {
      type: "category",
      data: chartData.xAxis,
      splitArea: {
        show: true,
      },
    },

    yAxis: {
      type: "category",
      data: chartData.yAxis,
      splitArea: {
        show: true,
      },
    },

    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "5%",
    },

    series: [
      {
        name: "Heatmap",
        type: "heatmap",
        data: chartData.data, // ✅ FIXED,
        label: {
          show: true,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
          },
        },
      },
    ],
  };


    return (
        <div style={{ width: "100%", height: "400px" }}>
      <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
    </div>

    );
};

export default HeatmapChart;




// [
//     [
//         0,
//         0,
//         13
//     ],
//     [
//         1,
//         0,
//         28
//     ],
//     [
//         2,
//         0,
//         9
//     ],
//     [
//         3,
//         0,
//         1
//     ],
//     [
//         4,
//         0,
//         54
//     ],
//     [
//         5,
//         0,
//         61
//     ],
//     [
//         6,
//         0,
//         41
//     ],
//     [
//         0,
//         1,
//         36
//     ],
//     [
//         1,
//         1,
//         62
//     ],
//     [
//         2,
//         1,
//         29
//     ],
//     [
//         3,
//         1,
//         57
//     ],
//     [
//         4,
//         1,
//         32
//     ],
//     [
//         5,
//         1,
//         96
//     ],
//     [
//         6,
//         1,
//         99
//     ],
//     [
//         0,
//         2,
//         91
//     ],
//     [
//         1,
//         2,
//         61
//     ],
//     [
//         2,
//         2,
//         78
//     ],
//     [
//         3,
//         2,
//         99
//     ],
//     [
//         4,
//         2,
//         53
//     ],
//     [
//         5,
//         2,
//         1
//     ],
//     [
//         6,
//         2,
//         71
//     ],
//     [
//         0,
//         3,
//         95
//     ],
//     [
//         1,
//         3,
//         75
//     ],
//     [
//         2,
//         3,
//         50
//     ],
//     [
//         3,
//         3,
//         58
//     ],
//     [
//         4,
//         3,
//         41
//     ],
//     [
//         5,
//         3,
//         59
//     ],
//     [
//         6,
//         3,
//         40
//     ]
// ]
