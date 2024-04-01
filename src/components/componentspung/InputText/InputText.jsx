import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const MyTextInput = (placeholder) => {
  const [textInputValue, setTextInputValue] = useState('');

  const handleInputChange = (text) => {
    setTextInputValue(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleInputChange}
        value={textInputValue}
        placeholderTextColor="#b0b0b0"
        placeholder={placeholder.placeholder}
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
