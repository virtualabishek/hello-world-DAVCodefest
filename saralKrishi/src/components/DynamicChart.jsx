import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Svg, { Line, Polyline, Circle, G, Text } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;
const chartHeight = 150; // Reduced height
const padding = 20;

// Sample dynamic datasets
const datasets = [
  { data: [10, 40, 25, 60, 30, 80, 45, 70], color: "cyan" },   // Line 1
  { data: [20, 30, 50, 35, 65, 40, 90, 55], color: "yellow" }, // Line 2
];

const chartWidth = screenWidth - 60; // Reduced width
const maxValue = Math.max(...datasets.flatMap((d) => d.data)); // Find the highest value

// Normalize data points for SVG scaling
const normalizeData = (data) =>
  data.map((value, index) => ({
    x: padding + (index / (data.length - 1)) * (chartWidth - padding * 2),
    y: chartHeight - (value / maxValue) * chartHeight + padding,
  }));

const DynamicChart = () => {
  return (
    <View style={styles.container}>
      <Svg width={chartWidth} height={chartHeight + 50}>
        <G>
          {/* Grid Lines */}
          {[...Array(5)].map((_, i) => {
            const y = padding + (i / 4) * chartHeight;
            return (
              <Line
                key={i}
                x1={padding}
                y1={y}
                x2={chartWidth - padding}
                y2={y}
                stroke="gray"
                strokeWidth="0.5"
                strokeDasharray="4"
              />
            );
          })}

          {/* Draw each dataset dynamically */}
          {datasets.map((dataset, i) => {
            const points = normalizeData(dataset.data);
            return (
              <G key={i}>
                {/* Line */}
                <Polyline
                  points={points.map((p) => `${p.x},${p.y}`).join(" ")}
                  fill="none"
                  stroke={dataset.color}
                  strokeWidth="2"
                />
                {/* Dots */}
                {points.map((p, index) => (
                  <Circle key={index} cx={p.x} cy={p.y} r="4" fill={dataset.color} />
                ))}
              </G>
            );
          })}
        </G>

        {/* Dynamic Legend */}
        <G transform={`translate(${padding}, ${chartHeight + 20})`}>
          {datasets.map((dataset, i) => (
            <G key={i} transform={`translate(${i * 50}, 0)`}>
              <Line x1="0" y1="5" x2="20" y2="5" stroke={dataset.color} strokeWidth="3" />
              <Circle cx="25" cy="5" r="3" fill={dataset.color} />
              <Text x="30" y="8" fill="white" fontSize="10">
                Set {i + 1}
              </Text>
            </G>
          ))}
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#002d1a",
    padding: 10,
    borderRadius: 15,
    marginRight:5,
  },
});

export default DynamicChart;
