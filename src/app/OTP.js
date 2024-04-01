import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Backbutton from '../components/componentspung/turnbackbutton/Backbutton';
import Button from '../components/componentspung/Button/Button';
import { router } from "expo-router";

const ColorChanger = () => {
  const [otp, setOtp] = useState('');
  const handlePress = () => {
    router.push('/Name')
  };
  const handlePress2 = () => {
    router.push('/Phone')
  };
  const handleChange = (value) => {
    setOtp(value);
  };

  const getColor = (index) => {
    if (otp.length >= index) {
      return 'green'; // Change to your desired color
    }
    return 'gray'; // Change to your desired color
  };

  return (
    <View style={{flex:1}}>
      <Backbutton style={{}} onPress={handlePress2}/>
      <View style={styles.container}>
    {[...Array(6).keys()].map((index) => (
      <View key={index} style={[styles.circle, { backgroundColor: getColor(index + 1) }]} />
    ))}
    <View style={styles.inputContainer}>
      {[...Array(6).keys()].map((index) => (
        <TextInput
          key={index}
          style={[styles.input, { borderColor: getColor(index + 1) }]}
          onChangeText={handleChange}
          value={otp.length >= index + 1 ? otp.substr(index, 1) : ''}
          keyboardType="numeric"
          maxLength={1}
        />
      ))}
    </View>
    

  </View>
  <Button label={"Next"} onPress={handlePress}></Button>
  </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
    width: 40,
    textAlign: 'center',
  },
});

export default ColorChanger;
