import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function GalleryPicker() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    console.log('Button pressed, opening image picker...');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      console.log('Image selected:', result.uri);
      const fileName = result.uri.split('/').pop();
      const newPath = FileSystem.cacheDirectory + fileName;
  
      try {
        await FileSystem.copyAsync({
          from: result.uri,
          to: newPath,
        });
        console.log('Copied image to cache:', newPath);
        setImage(newPath);
      } catch (error) {
        console.error('Error copying image:', error);
      }
    } else {
      console.log('Image selection cancelled.');
    }
  };
  
  console.log('Rendering component...');
  return (
    <View style={styles.container}>
      <Button title="Choose Picture" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 20,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
