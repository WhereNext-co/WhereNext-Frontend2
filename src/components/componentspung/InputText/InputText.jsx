import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor:'#fff',
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10
  },
  input: {
    
    width: '100%',
    color: 'black', // Text color
  },
});

export default MyTextInput;
