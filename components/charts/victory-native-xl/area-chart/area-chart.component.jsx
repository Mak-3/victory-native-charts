import React from 'react'
import { CartesianChart, Area } from "victory-native";
import { chartDataset } from '../../chart-dataset';

const AreaChartComponent = () => {
    const areaChartData = chartDataset.areaChartData;
    return (
    <CartesianChart data={areaChartData} xKey="x" yKeys={["y"]}>
      {({ points, chartBounds }) => (
        <Area
          points={points.y}
          y0={chartBounds.bottom}
          color="red"
          animate={{ type: "timing", duration: 300 }}
        />
      )}
    </CartesianChart>
  );
}

export default AreaChartComponent;