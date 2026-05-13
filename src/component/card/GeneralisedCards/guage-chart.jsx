import React from "react";
import ReactECharts from "echarts-for-react";
import { Box } from "@mui/material";

const GaugeChart = ({
  value = 0,
  min = 0,
  max = 100,
  critical = 100,
  color = "#006DBC",
  unit = "",
  type = "",
}) => {
  const gaugeValue = 50
     // type === "basicAlarm" || type === "basicSensor"
    //   ? value > 0
    //     ? 100
    //     : 0
    //   : Number(value);

  const option = {
    series: [
      {
        type: "gauge",

        startAngle: 210,
        endAngle: -30,

        min: min,
        max: critical || max,

        radius: "100%",

        progress: {
          show: true,
          width: 14,
          roundCap: true,
          itemStyle: {
            color: color,
          },
        },

        axisLine: {
          lineStyle: {
            width: 14,
            color: [
              [
                (max || 100) / (critical || max || 100),
                "#D9E6F2",
              ],
              [1, "#FFD6D6"],
            ],
          },
        },

        pointer: {
          show: true,
          length: "65%",
          width: 5,
          itemStyle: {
            color: color,
          },
        },

        axisTick: {
          show: false,
        },

        splitLine: {
          show: false,
        },

        axisLabel: {
          show: false,
        },

        anchor: {
          show: true,
          size: 10,
          itemStyle: {
            color: color,
          },
        },

        detail: {
          valueAnimation: true,
          offsetCenter: [0, "55%"],

          formatter:
            type === "basicAlarm"
              ? value > 0
                ? "ALM"
                : "NML"
              : type === "basicSensor"
              ? value > 0
                ? "ON"
                : "OFF"
              : `{value} ${unit}`,

          color: color,

          fontSize: 22,
          fontWeight: "bold",
        },

        data: [
          {
            value: gaugeValue,
          },
        ],
      },
    ],
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: 150,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReactECharts
        option={option}
        style={{
          width: "100%",
          height: "150px",
        }}
      />
    </Box>
  );
};

export default GaugeChart;