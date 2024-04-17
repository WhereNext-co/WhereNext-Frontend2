import React from 'react';
import { StyleSheet, View } from 'react-native';

const Circlea = ({ color, timeRanges,progressWidth=30}) => {
  return (
    <View style={[styles.container, { padding: 20 }]}>
      <View style={[styles.background, { borderColor: "#283053" }]} />
      <Vieww
        style={[
          styles.progress,
          { borderColor: color, width: progressWidth, transform: [{ rotate: `45deg` }] },
        ]}
      />
    </View>
  );
};  

const height = 300;
Circlea.defaultProps = {
  progressWidth: height * 0.5, // Default progress width is half the height of the circle
};
const styles = StyleSheet.create({
  container: {
    width: height,
    height: height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  background: {
    width: '100%',
    height: '100%',
    borderRadius: height / 2,
    borderWidth: 25,
    opacity: 1
  },progress: {
    width: '100%',
    height: '100%',
    borderRadius: height / 2,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderWidth: 25,
    position: 'absolute',
    transform: [{ rotate: `45deg` }]
  }
});

export default Circlea;
