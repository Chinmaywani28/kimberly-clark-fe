import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Box } from "@mui/material";

const HeatmapChart = ({
  // chartData,
  // minValue,
  // maxValue,
  // criticalValue,
  // xAxis,
  heatmapData,
  xAxisData,
  yAxisData

}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  // console.log(chartData);
  

  // 👉 Convert normal array to heatmap format
  // const formatHeatmapData = () => {
  //   if (!heatmapData.length) return [];

  //   return heatmapData.map((value, index) => [
  //     index, // x index
  //     0,     // y index (single row heatmap)
  //     value,
  //   ]);
  // };

  useEffect(() => {
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    // const heatmapData = formatHeatmapData();

    // if (heatmapData.length === 0) return;

    const option = {
      // tooltip: {
      //   position: "top",
      //   formatter: function (params) {
      //     return `${chartData.labels[params.data[0]]} <br/>
      //             ${xAxis}: ${params.data[2]}`;
      //   },
      // },

      grid: {
        height: "50%",
        top: "10%",
      },

      xAxis: {
        type: "category",
        data: xAxisData,
        splitArea: {
          show: true,
        },
      },

      yAxis: {
        type: "category",
        data: yAxisData, // single row
        splitArea: {
          show: true,
        },
      },

      // 👉 This replaces your color function
      visualMap: {
        // min: minValue,
        // max: criticalValue,
        calculable: true,
        orient: "horizontal",
        left: "center",
        bottom: "0%",
        inRange: {
          color: ["#76C739", "#e7af84", "#F26457"], // green → orange → red
        },
      },

      series: [
        {
          name: "Value",
          type: "heatmap",
          data: heatmapData,
          label: {
            show: true,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    chartInstance.current.setOption(option);

    const handleResize = () => chartInstance.current.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <Box
      ref={chartRef}
      style={{ width: "100%", height: "250px" }} // ✅ responsive fix
    />
  );
};

export default HeatmapChart;