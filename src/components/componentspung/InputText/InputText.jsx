import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import styles from './InputText.style';

const MyTextInput = ({placeholder,value,onPress}) => {
  const [text, setText] = useState(value);
  
  const handleChangeText = (newText) => {
    setText(newText);
    onPress(newText);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleChangeText}
        value={text}
        placeholderTextColor="#b0b0b0"
        placeholder={value ? '' : placeholder} // Show placeholder if value is empty
        selectionColor="gray" // Customize the handle color
      />
    </View>
  );
};



export default MyTextInput;
