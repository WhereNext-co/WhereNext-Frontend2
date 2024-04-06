import React, { useRef } from 'react';
import { View, TextInput} from 'react-native';
import styles from './OTP.style';

const OtpInput = ({ numInputs = 6 }) => {
  const inputRefs = Array(numInputs)
    .fill(0)
    .map((_, i) => useRef(null));

  const handleOnChange = (index, value) => {
    if (value && index < numInputs - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <View style={styles.container}>
      {[...Array(numInputs)].map((_, index) => (
        <TextInput
          key={index.toString()}
          ref={inputRefs[index]}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(value) => handleOnChange(index, value)}
        />
      ))}
    </View>
  );
};



export default OtpInput;
