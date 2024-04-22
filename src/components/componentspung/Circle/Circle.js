import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Svg, Path, Circle, Defs, Stop ,LinearGradient} from 'react-native-svg';

const styles = StyleSheet.create({
  container: {

    marginBottom: 20, // Add margin to the bottom
  },
});

const timeRangesToAngles = (timeRanges) => {
  console.log("timerange:",timeRanges);
  if (timeRanges==[]){
    return [];
  
  } else if (timeRanges[0] == "00:00-24:00"){
    console.log('true')
    return [{startAngle:0,endAngle:180},{startAngle:180,endAngle:360}];
  } else {const angles = [];
  timeRanges.forEach((timeRange) => {
    const [startHour, endHour] = timeRange.split('-').map((time) => parseInt(time.split(':')[0]));
    const startAngle = (startHour / 24) * 360;
    const endAngle = (endHour / 24) * 360;
    angles.push({ startAngle, endAngle });
  });
  return angles;}
};

const MultipleSectors = ({ timeRanges, color,link }) => {
  console.log('circle;', link)
  const angles = timeRangesToAngles(timeRanges);
  const circleRadius = 120; 
  const imageRadius = circleRadius - 2; 
  const calculateGradientColors = (angle) => {
    const topColorRed = 55;
    const topColorGreen = 95;
    const topColorBlue = 240;
    const bottomColorRed = 218;
    const bottomColorGreen = 230;
    const bottomColorBlue = 94;
    let y1 = Math.cos(((angle.startAngle) * Math.PI) / 180)/2+0.5;
    let y2 = Math.cos(((angle.endAngle) * Math.PI) / 180)/2+0.5;
    if (angle.startAngle<180 && angle.endAngle>180) {
      if (angle.endAngle-180>180-angle.startAngle) {
        y1=y2
        y2=0
      } else {
        y2=0      
      }
    } else if (angle.startAngle<360 && angle.endAngle>0) {
      if (360-angle.startAngle>angle.endAngle) {
        y2=y1
        y1=1
      } else {
        y1=1
      }
    }
    return [`#${Math.round(bottomColorRed-((bottomColorRed-topColorRed)*y1)).toString(16)}${Math.round(bottomColorGreen-((bottomColorGreen-topColorGreen)*y1)).toString(16)}${Math.round(bottomColorBlue-((bottomColorBlue-topColorBlue)*y1)).toString(16)}`, 
    `#${Math.round(bottomColorRed-((bottomColorRed-topColorRed)*y2)).toString(16)}${Math.round(bottomColorGreen-((bottomColorGreen-topColorGreen)*y2)).toString(16)}${Math.round(bottomColorBlue-((bottomColorBlue-topColorBlue)*y2)).toString(16)}`,
    `#${Math.round(bottomColorRed-((bottomColorRed-topColorRed)*(y1+(0.05*(1-Math.cos(((angle.startAngle) * Math.PI) / 180)))))).toString(16)}${Math.round(bottomColorGreen-((bottomColorGreen-topColorGreen)*(y1+(0.05*(1-Math.cos(((angle.startAngle) * Math.PI) / 180)))))).toString(16)}${Math.round(bottomColorBlue-((bottomColorBlue-topColorBlue)*(y1+(0.05*(1-Math.cos(((angle.startAngle) * Math.PI) / 180)))))).toString(16)}`,
    `#${Math.round(bottomColorRed-((bottomColorRed-topColorRed)*(y1-(0.05*(1+Math.cos(((angle.startAngle) * Math.PI) / 180)))))).toString(16)}${Math.round(bottomColorGreen-((bottomColorGreen-topColorGreen)*(y1-(0.05*(1+Math.cos(((angle.startAngle) * Math.PI) / 180)))))).toString(16)}${Math.round(bottomColorBlue-((bottomColorBlue-topColorBlue)*(y1-(0.05*(1+Math.cos(((angle.startAngle) * Math.PI) / 180)))))).toString(16)}`,
    `#${Math.round(bottomColorRed-((bottomColorRed-topColorRed)*(y2+(0.05*(1-Math.cos(((angle.endAngle) * Math.PI) / 180)))))).toString(16)}${Math.round(bottomColorGreen-((bottomColorGreen-topColorGreen)*(y1+(0.05*(1-Math.cos(((angle.endAngle) * Math.PI) / 180)))))).toString(16)}${Math.round(bottomColorBlue-((bottomColorBlue-topColorBlue)*(y1+(0.05*(1-Math.cos(((angle.endAngle) * Math.PI) / 180)))))).toString(16)}`,
    `#${Math.round(bottomColorRed-((bottomColorRed-topColorRed)*(y2-(0.05*(1+Math.cos(((angle.endAngle) * Math.PI) / 180)))))).toString(16)}${Math.round(bottomColorGreen-((bottomColorGreen-topColorGreen)*(y1-(0.05*(1+Math.cos(((angle.endAngle) * Math.PI) / 180)))))).toString(16)}${Math.round(bottomColorBlue-((bottomColorBlue-topColorBlue)*(y1-(0.05*(1+Math.cos(((angle.endAngle) * Math.PI) / 180)))))).toString(16)}`]
  };
  return (
    <View style={styles.container}>
      <Svg height={300} width={300}>
      <Defs>
      <LinearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#293152" />
            <Stop offset="100%" stopColor="#1f1f1f" />
          </LinearGradient>
        </Defs>
        <Circle cx="150" cy="150" r="150" fill="url(#blueGradient)" />
        {angles.map((angle, index) => {
          const [topColor, bottomColor,a,b,c,d] = calculateGradientColors(angle);
          console.log([topColor, bottomColor,a,b,c,d]);
          return (
            <Defs key={index}>
              <LinearGradient id={`gradient${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor={topColor} />
                <Stop offset="100%" stopColor={bottomColor} />
              </LinearGradient>
              <LinearGradient id={`gradientminis${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor={a} />
                <Stop offset="100%" stopColor={b} />
              </LinearGradient>
              <LinearGradient id={`gradientminie${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor={c} />
                <Stop offset="100%" stopColor={d} />
              </LinearGradient>
            </Defs>
          );
        })}

        {angles.map((angle, index) => {
          const radius = 150;
          const x1 = radius * Math.cos(((angle.startAngle - 90) * Math.PI) / 180);
          const y1 = radius * Math.sin(((angle.startAngle - 90) * Math.PI) / 180);
          const x2 = radius * Math.cos(((angle.endAngle - 90) * Math.PI) / 180);
          const y2 = radius * Math.sin(((angle.endAngle - 90) * Math.PI) / 180);
          const largeArcFlag = angle.endAngle - angle.startAngle > 180 ? 1 : 0;

          const pathData = `
            M ${radius},${radius}
            L ${radius + x1},${radius + y1}
            A ${radius},${radius} 0 ${largeArcFlag} 1 ${radius + x2},${radius + y2}
            Z
          `;

          return (
            <Path key={index} d={pathData} fill={`url(#gradient${index})`} />
          );
        })}{angles.map((angle, index) => {
          const radius = 150;
          const miniradius=15;
          const x1 = (radius-miniradius) * Math.cos(((angle.startAngle - 90) * Math.PI) / 180);
          const y1 = (radius-miniradius) * Math.sin(((angle.startAngle - 90) * Math.PI) / 180);
          return <Circle key={index} cx={radius + x1} cy={radius + y1} r={miniradius} fill={`url(#gradientminis${index})`} />
        })}{angles.map((angle, index) => {
          const radius = 150;
          const miniradius=15;
          const x1 = (radius-miniradius) * Math.cos(((angle.endAngle - 90) * Math.PI) / 180);
          const y1 = (radius-miniradius) * Math.sin(((angle.endAngle - 90) * Math.PI) / 180);
          return <Circle key={index} cx={radius + x1} cy={radius + y1} r={miniradius} fill={`url(#gradientminie${index})`}/>
        })}
        <Circle cx="150" cy="150" r={circleRadius} fill="#14072b" />
        <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/wherenext-24624.appspot.com/o/images%2F'+link.slice(81) }} 
        style={{
        width: imageRadius * 2,
        height: imageRadius * 2,
        borderRadius: imageRadius,
        marginLeft: 32,
        marginTop: 32,
  }} />
      </Svg>
    </View>
  );
};

export default MultipleSectors;
