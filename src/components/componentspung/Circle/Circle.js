import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Svg, Path, Circle, Defs, Stop ,LinearGradient} from 'react-native-svg';

const styles = StyleSheet.create({
  container: {

    marginBottom: 20, // Add margin to the bottom
  },
});

const timeRangesToAngles = (timeRanges) => {
  const angles = [];
  timeRanges.forEach((timeRange) => {
    const [startHour, endHour] = timeRange.split('-').map((time) => parseInt(time.split(':')[0]));
    const startAngle = (startHour / 24) * 360;
    const endAngle = (endHour / 24) * 360;
    angles.push({ startAngle, endAngle });
  });
  return angles;
};

const MultipleSectors = ({ timeRanges, color }) => {
  const angles = timeRangesToAngles(timeRanges);
  const circleRadius = 120;
  const imageRadius = circleRadius - 2; 
  const link='https://firebasestorage.googleapis.com/v0/b/wherenext-24624.appspot.com/o/images%2F732A162A-5181-41A1-BDDC-3FACDBC8C706.png?alt=media&token=baa3a32e-2732-4086-ab60-8e3759ef32af'
  return (
    <View style={styles.container}>
      <Svg height={300} width={300}>
      <Defs>
      <LinearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="red" />
            <Stop offset="100%" stopColor="white" />
          </LinearGradient>
        </Defs>
        {/*<Circle cx="150" cy="150" r="150" fill="blue" />*/}
        {angles.map((angle, index) => {
          const radius = 150;
          const x1 = radius * Math.cos((angle.startAngle * Math.PI) / 180);
          const y1 = radius * Math.sin((angle.startAngle * Math.PI) / 180);
          const x2 = radius * Math.cos((angle.endAngle * Math.PI) / 180);
          const y2 = radius * Math.sin((angle.endAngle * Math.PI) / 180);
          const largeArcFlag = angle.endAngle - angle.startAngle > 180 ? 1 : 0;

          const pathData = `
            M ${radius},${radius}
            L ${radius + x1},${radius + y1}
            A ${radius},${radius} 0 ${largeArcFlag} 1 ${radius + x2},${radius + y2}
            Z
          `;

          return <Path key={index} d={pathData} fill={'url(#redGradient)'}></ Path>
        })}{/*angles.map((angle, index) => {
          const radius = 150;
          const miniradius=15;
          const x1 = (radius-miniradius) * Math.cos((angle.startAngle * Math.PI) / 180);
          const y1 = (radius-miniradius) * Math.sin((angle.startAngle * Math.PI) / 180);
          return <Circle key={index} cx={radius + x1} cy={radius + y1} r={miniradius} fill="red" />
        })}{angles.map((angle, index) => {
          const radius = 150;
          const miniradius=15;
          const x1 = (radius-miniradius) * Math.cos((angle.endAngle * Math.PI) / 180);
          const y1 = (radius-miniradius) * Math.sin((angle.endAngle * Math.PI) / 180);
          return <Circle key={index} cx={radius + x1} cy={radius + y1} r={miniradius} fill="red" />
        })}
        {<Circle cx="150" cy="150" r={circleRadius} fill="#14072b" />
        <Image source={{ uri: link }} 
        style={{
        width: imageRadius * 2,
        height: imageRadius * 2,
        borderRadius: imageRadius,
        marginLeft: 32,
        marginTop: 32,
  }} />*/}
      </Svg>
    </View>
  );
};

export default MultipleSectors;
