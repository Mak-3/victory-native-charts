import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { VictoryArea, VictoryChart, VictoryTooltip, VictoryAxis, VictoryLegend, VictoryGroup, VictoryScatter, VictoryStack } from 'victory-native-legacy';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { chartDataset } from '../../chart-dataset';

const AreaChartComponent = () => {
  const areaChartData = chartDataset.areaChartData;
  const [selectedTooltip, setSelectedTooltip] = useState(null);

  const handleTooltipSelect = (event, data) => {
    const { x, y } = data;
    setSelectedTooltip({ x, y });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enhanced Area Chart with Tooltip and Legend</Text>
      <VictoryChart>
        {/* Gradient Defs */}
        <Defs>
          {areaChartData.map((dataSet, index) => (
            <LinearGradient id={`gradient${index}`} key={index} x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={dataSet.color} stopOpacity="0.8" />
              <Stop offset="100%" stopColor={dataSet.color} stopOpacity="0.3" />
            </LinearGradient>
          ))}
        </Defs>

        {/* Legend */}
        <VictoryLegend
          x={100}
          y={10}
          orientation="horizontal"
          gutter={20}
          data={areaChartData.map(({ name, color }) => ({
            name,
            symbol: { fill: color },
          }))}
        />

        {/* Axes */}
        <VictoryAxis
          style={{
            axis: { stroke: '#756f6a' },
            ticks: { stroke: 'grey', size: 5 },
            tickLabels: { fontSize: 12, padding: 5 },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: '#756f6a' },
            ticks: { stroke: 'grey', size: 5 },
            tickLabels: { fontSize: 12, padding: 5 },
          }}
        />

        {/* Area Chart */}
        <VictoryStack>
          {areaChartData.map((dataSet, index) => (
            <VictoryGroup key={index} data={dataSet.data}>
              <VictoryArea
                style={{
                  data: {
                    fill: `url(#gradient${index})`,
                    stroke: dataSet.color,
                    strokeWidth: 2,
                  }
                }}
              />
              <VictoryScatter
                size={5}
                style={{ data: { fill: dataSet.color } }}
                labels={({ datum }) => `x: ${datum.x}, y: ${datum.y}`}
                labelComponent={<VictoryTooltip />}
                events={[
                  {
                    target: 'data',
                    eventHandlers: {
                      onPressIn: (evt, clickedProps) => handleTooltipSelect(evt, clickedProps.datum),
                    }
                  }
                ]}
              />
            </VictoryGroup>
          ))}
        </VictoryStack>
      </VictoryChart>

      {/* Custom tooltip */}
      {selectedTooltip && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>
            {`X: ${selectedTooltip.x}, Y: ${selectedTooltip.y}`}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
  tooltip: {
    position: 'absolute',
    top: 0,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 5,
    borderRadius: 5,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 14,
  }
});

export default AreaChartComponent;