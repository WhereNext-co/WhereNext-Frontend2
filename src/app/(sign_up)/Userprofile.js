import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text, Alert, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { listFiles, uploadToFirebase, fbStorage } from '../../../firebaseConfig';
import Buttonpung from '../../components/componentspung/Button/Button/Button';
import Backbutton from '../../components/componentspung/Button/turnbackbutton/Backbutton';
import { router, useLocalSearchParams,Stack} from "expo-router";

export default function GalleryPicker() {
  let {name,surname,username,title,mail,birthdate,profile} = useLocalSearchParams();
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [files, setFiles] = useState([]);
  const [link,setLink]=useState(profile ? 'https://firebasestorage.googleapis.com/v0/b/wherenext-24624.appspot.com/o/images%2F'+profile.slice(81) : 'https://firebasestorage.googleapis.com/v0/b/wherenext-24624.appspot.com/o/images%2F732A162A-5181-41A1-BDDC-3FACDBC8C706.png?alt=media&token=baa3a32e-2732-4086-ab60-8e3759ef32af');
  console.log(profile)
  const handleButtonPress = () => {
    Alert.alert(
      'Choose an option',
      '',
      [
        {
          text: 'Take a Picture',
          onPress: () => takePhoto(),
        },
        {
          text: 'Choose from Gallery',
          onPress: () => takePhoto2({ mediaType: 'photo' }),
        },
      ],
      { cancelable: true }
    );
  };
   const handlePress = () => {
    router.push({
      pathname: '/Location',
      params: {
        title: title,
        name: name,
        surname: surname,
        mail: mail,
        username: username,
        birthdate:birthdate,
        profile: link
      }
    });
  };
  const handlePress2 = () => {
    router.push({pathname:'/UsernameBD',params:{title:title,name:name,surname:surname,mail:mail,username:username,birthdate:birthdate}})
  };
  useEffect(() => {
    listFiles().then((listResp) => {
      const files = listResp.map((value) => {
        return { name: value.fullPath };
      });
      setFiles(files);
    });
  }, []);
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
        <Button title="Request Permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#14072b' }}>
      <Stack.Screen options={{ headerShown: false }} />
        <View style={{ position: 'absolute', top: 60, left: 20 }}>
        <Backbutton style={{}} onPress={handlePress2}/>
        </View>
        <View style={{ alignItems: 'center',marginBottom: 20 }}>
          <Text style={{textAlign :"center",
          textAlignVertical:"bottom",
          fontSize:30,
          padding:20, 
          color:'white'}}>Now let's see your {'\n'} beautiful face.</Text>
     
        </View>
  {/*<MyFilesList files={files} />*/}
  <View style={styles.imageContainer}>
        <Image source={{ uri: link }} style={styles.image} />
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleButtonPress} />
        </View>
      </View>
       {/* <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', marginBottom: 20 }}>
  <View style={{ position: 'relative' }}>
    <Image source={{ uri: link }} style={styles.image} />
    <Button title="Take picture" onPress={() => takePhoto({})} style={styles.button} />
    <Button title="Pick from gallery" onPress={() => takePhoto2({ mediaType: 'photo' })} style={styles.button} />
  </View>
  </View>*/}
        
        <Buttonpung label={"Next"} onPress={handlePress} style={{}}></Buttonpung>
        
        

    
    
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  imageContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100, // Half of the width and height to make it a circle
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'column',
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 10,
    borderRadius: 20, // Half of the width to make it a circle
  },
});