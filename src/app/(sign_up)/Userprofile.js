import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { listFiles, uploadToFirebase, fbStorage } from '../../../firebaseConfig';
import MyFilesList from './MyListเผื่อใครใช้';

export default function GalleryPicker() {
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [files, setFiles] = useState([]);
  const [link,setLink]=useState('https://firebasestorage.googleapis.com/v0/b/wherenext-24624.appspot.com/o/images%2F732A162A-5181-41A1-BDDC-3FACDBC8C706.png?alt=media&token=baa3a32e-2732-4086-ab60-8e3759ef32af');
  useEffect(() => {
    listFiles().then((listResp) => {
      const files = listResp.map((value) => {
        return { name: value.fullPath };
      });
      setFiles(files);
    });
  }, []);
  useEffect(() => {
    console.log('Link updated:', link);

  }, [link]);
  const takePhoto = async () => {
    try{
    const cameraResp = await ImagePicker.launchCameraAsync({
      allowsEditing:true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality:1
    })
    if (!cameraResp.canceled) {
      const { uri} = cameraResp.assets[0]
      const fileName = uri.split('/').pop()
      const uploadResp = await uploadToFirebase(uri, fileName)
      console.log(uploadResp)
      const downloadUrl = uploadResp.downloadUrl;
      setLink(downloadUrl)
      listFiles().then((listResp)=>{
        const files = listResp.map((value)=>{
          return {name:value.fullPath}
        })
        setFiles(files)
      });
    }
  } catch (e) {
    Alert.alert("Error Uploading Image " + e.message)
}
} 
  const takePhoto2 = async (source) => {
    try {
      const imageResp = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
        ...source,
      });
      if (!imageResp.cancelled) {
        const { uri } = imageResp.assets[0];
        const fileName = uri.split('/').pop();
        const uploadResp = await uploadToFirebase(uri, fileName);
        console.log(uploadResp);
        const downloadUrl = uploadResp.downloadUrl;
        setLink(downloadUrl)
        listFiles().then((listResp) => {
          const files = listResp.map((value) => {
            return { name: value.fullPath };
          });
          setFiles(link);
        });
      }
    } catch (e) {
      Alert.alert('Error Uploading Image ' + e.message);
    }
  };
  const changeLink= (text) =>{
    setLink(text)
  }
  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <View style={styles.container}>
        <Text>Permission Not Granted - {permission?.status}</Text>
        <StatusBar style="auto" />
        <Button title="Request Permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Working With Firebase and Image Picker</Text>
      {/*<MyFilesList files={files} />*/}
      <StatusBar style="auto" />
      <Image source={{ uri: link }} style={styles.image} />
      <Button title="Take picture" onPress={() => takePhoto({})} />
      <Button title="Pick from gallery" onPress={() => takePhoto2({ mediaType: 'photo' })} />
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
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
