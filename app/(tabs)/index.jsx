import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const AnimatedThemedView = Animated.createAnimatedComponent(ThemedView);

const getIconComponent = (iconType, name, size, color) => {
  switch (iconType) {
    case 'FontAwesome':
      return <FontAwesome name={name} size={size} color={color} />;
    case 'MaterialCommunity':
      return <MaterialCommunityIcon name={name} size={size} color={color} />;
    default:
      return <FontAwesome name={name} size={size} color={color} />;
  }
};

const SquareButton = ({ name, icon, iconType, size, color }) => {
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
    console.log(`${name} clicked`);
  };

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <AnimatedThemedView style={[styles.box, { transform: [{ scale }] }]}>
        {getIconComponent(iconType, icon, size, color)}
        <ThemedText style={styles.text}>{name}</ThemedText>
      </AnimatedThemedView>
    </TouchableWithoutFeedback>
  );
};

const HomeScreen = () => {
  const squares = [
    { name: 'Area Chart', icon: 'area-chart', iconType: 'FontAwesome', size: 30, color: '#ffffff' },
    { name: 'Bar Chart', icon: 'bar-chart', iconType: 'FontAwesome', size: 30, color: '#ffffff' },
    { name: 'Bubble Chart', icon: 'chart-bubble', iconType: 'MaterialCommunity', size: 30, color: '#ffffff' },
    { name: 'Column Chart', icon: 'bar-chart', iconType: 'FontAwesome', size: 30, color: '#ffffff' },
    { name: 'Donut Chart', icon: 'chart-donut', iconType: 'MaterialCommunity', size: 30, color: '#ffffff' },
    { name: 'Line Chart', icon: 'line-chart', iconType: 'FontAwesome', size: 30, color: '#ffffff' },
    { name: 'Pie Chart', icon: 'pie-chart', iconType: 'FontAwesome', size: 30, color: '#ffffff' },
  ];

  return (
    <View style={styles.container}>
      {squares.map((item, index) => (
        <SquareButton
          key={index}
          name={item.name}
          icon={item.icon}
          iconType={item.iconType}
          size={item.size}
          color={item.color}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  box: {
    width: '45%',
    height: 120,
    backgroundColor: '#4682b4',
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
});

export default HomeScreen;