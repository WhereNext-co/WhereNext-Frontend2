import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ViewBase } from 'react-native';
import styles from './scrolldown.style';
const ScrollDownComponent = () => {
  const [infoVisible1, setInfoVisible1] = useState(false);
  const [infoVisible2, setInfoVisible2] = useState(false);
  const [infoText, setInfoText] = useState('Information text goes here');

  const toggleInfo1 = () => {
    setInfoVisible1(!infoVisible1);
  };
  const toggleInfo2 = () => {
    setInfoVisible2(!infoVisible2);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleInfo1}>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>

        <Text style={styles.buttonText}>Terms and Conditions</Text><Text style={{transform: [{rotate: infoVisible1? '45deg':'0deg'}]}}>+</Text>
    </View>

      </TouchableOpacity>
      
      {infoVisible1 && (
        <ScrollView style={styles.scrollView}>
          <Text>{infoText}</Text>
        </ScrollView>
      )}
      <TouchableOpacity style={styles.button} onPress={toggleInfo2}>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={styles.buttonText}>Privacy policy</Text><Text style={{transform: [{rotate: infoVisible2? '45deg':'0deg'}]}}>+</Text>
        </View>
      </TouchableOpacity>
      {infoVisible2 && (
        <ScrollView style={styles.scrollView}>
          <Text>{infoText}</Text>
        </ScrollView>
      )}
    </View>
  );
};



export default ScrollDownComponent;