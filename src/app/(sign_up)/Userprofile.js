import React, { useEffect, useState } from 'react';
import { View, Button, Image, StyleSheet ,Text,Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { StatusBar } from 'expo-status-bar';
import { listFiles, uploadToFirebase } from '../../../firebaseConfig';
import MyFilesList from './MyList';

export default function GalleryPicker() {
  const [permission,requestPermission] = ImagePicker.useCameraPermissions();
  const [files,setFiles]= useState([])


  useEffect(()=> {
    listFiles().then((listResp)=>{
      const files = listResp.map((value)=>{
        return {name:value.fullPath}
      })
      setFiles(files)
    });
  },[])

  console.log(files)
  /**
   * 
   */
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

      listFiles().then((listResp)=>{
        const files = listResp.map((value)=>{
          return {name:value.fullPath}
        })
        setFiles(files)
      });
    }
  } 
    catch (e) {
      Alert.alert("Error Uploading Image " + e.message)
  }
}
  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <View style={styles.container}>
        <Text>Permission Not Granted - {permission?.status}</Text>
        <StatusBar style="auto"/>
        <Button title="Request Permission" onPress={requestPermission} />
      </View>)
  }
  
  return (
    <View style={styles.container}>
      <Text>Working With Firebase and Image Picker</Text>
      <MyFilesList files={files}/>
      <StatusBar style="auto"/>
      <Button title="Take picture" onPress={takePhoto} />
      

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
