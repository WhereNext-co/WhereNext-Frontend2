import React from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet, Alert } from 'react-native';
import { getDownloadURL,ref } from 'firebase/storage';
import { fbStorage } from '../../../firebaseConfig';

const MyFilesList = ({ files }) => {
    const displayImage = async (name) => {
        try {
          const imageRef = ref(fbStorage, `${name}`);
          console.log('Image Ref:', imageRef);
          const downloadURL = await getDownloadURL(imageRef);
          console.log('Download URL:', downloadURL);
          // Display the image using the downloadURL
        } catch (error) {
          console.error('Error:', error);
          Alert.alert('Error', 'Failed to load image');
        }
      };
  return (
    <FlatList
      data={files}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item.name}</Text>
          <Button title="Display Image" onPress={() => displayImage(item.name)} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default MyFilesList;
