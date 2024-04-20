import { View, Text, TextInput,  StyleSheet,Pressable,Image, TouchableOpacity,Alert} from "react-native";
import React,{useState}  from "react";
import Backbutton from '../../components/componentspung/Button/turnbackbutton/Backbutton';
import { router, useLocalSearchParams} from "expo-router";
import Button from '../../components/componentspung/Button/Button/Button';
import { listFiles, uploadToFirebase, fbStorage } from '../../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';


export default function Login({}) {
  const [link,setLink]=useState('https://firebasestorage.googleapis.com/v0/b/wherenext-24624.appspot.com/o/images%2F732A162A-5181-41A1-BDDC-3FACDBC8C706.png?alt=media&token=baa3a32e-2732-4086-ab60-8e3759ef32af');
  const [nameInputValue, setNameInputValue] = useState('');
  const [surnameInputValue, setSurnameInputValue] = useState('');
  const [dInputValue, setDInputValue] = useState('');
  const [mInputValue, setMInputValue] = useState('');
  const [yInputValue, setYInputValue] = useState('');
  const [bioInputValue, setBioInputValue] = useState('');
    const handlePress = () => {
      router.push('/profile') 
    };
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


 
    
    return(
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#14072b' }}>
        <View style={{ position: 'absolute', top: 20, left: 20, flexDirection:'row', }}>
        <Backbutton style={{}} onPress={handlePress}/> 
        <Text style={{
          fontSize:30,
          color:'white',
          paddingLeft:20,justifyContent: 'center', alignItems: 'center'}}>Edit Profile</Text>
        </View>
        <View style={{marginBottom:200, width:"100%"}}>
        <View style={{justifyContent: 'center', alignItems: 'center',borderBottomWidth:1,borderColor:'white',padding:20}}>
        <Image source={{ uri: link }} style={styles.image} />
        <TouchableOpacity onPress={handleButtonPress}><Text style={{color:'blue',fontSize:20}}>Edit profile</Text></TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row',justifyContent: 'flex-start', alignItems: 'center',padding: 20,borderBottomWidth:1,borderColor:'white'}}>
        <Text style={{
          fontSize:20,
          color:'white',
        justifyContent: 'center', alignItems: 'center'}}>Name</Text>
        <TextInput placeholder='Name' value={nameInputValue} onChangeText={setNameInputValue} placeholderTextColor="#D8D8D8" style={{color:"red",marginLeft:20,fontSize:20}}/>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',padding: 20,borderBottomWidth:1,borderColor:'white'}}>
        <Text style={{
          fontSize:20,
          color:'white',
          justifyContent: 'center', alignItems: 'center'}}>Username</Text>
        <TextInput placeholder='Username' value={surnameInputValue} onChangeText={setSurnameInputValue} placeholderTextColor="#D8D8D8" style={{color:"red",marginLeft:20,fontSize:20}}/>
        </View><View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',padding: 20,borderBottomWidth:1,borderColor:'white'}}>
        <Text style={{
          fontSize:20,
          color:'white',
          justifyContent: 'center', alignItems: 'center'}}>Birth date</Text>
        <TextInput placeholder='DD' value={dInputValue} keyboardType="numeric" onChangeText={setDInputValue} placeholderTextColor="#D8D8D8" style={{color:"red",marginLeft:20,fontSize:20}}/><Text style={{
          fontSize:20,
          color:'white'}}>/</Text><TextInput placeholder='MM' keyboardType="numeric" value={mInputValue} onChangeText={setMInputValue} placeholderTextColor="#D8D8D8" style={{color:"red",fontSize:20}}/><Text style={{
            fontSize:20,
            color:'white'}}>/</Text>
          <TextInput placeholder='YYYY' keyboardType="numeric" value={yInputValue} onChangeText={setYInputValue} placeholderTextColor="#D8D8D8" style={{color:"red",fontSize:20}}/>
        </View><View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',padding: 20,borderBottomWidth:1,borderColor:'white'}}>
        <Text style={{
          fontSize:20,
          color:'white',
          justifyContent: 'center', alignItems: 'center'}}>Bio</Text>
        <TextInput placeholder='Bio' value={bioInputValue} onChangeText={setBioInputValue} placeholderTextColor="#D8D8D8" style={{color:"red",marginLeft:20,fontSize:20}}/>
        </View><View style={{justifyContent:'center',alignItems:'center'}}><Button label={"Next"} onPress={handlePress} style={{}}></Button></View>
        
    </View></View>
    
    ); 
}
const styles = StyleSheet.create({
    // Styles that are unchanged from previous step are hidden for brevity. 

    container: {
      flex: 1,
      backgroundColor: '#000000',
      justifyContent: 'space-evenly',
      flexDirection: 'column',
    },
    
    container2: {
        flex: 1,
        flexDirection:'row',
        backgroundColor:'#fff',

      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 100, // Half of the width and height to make it a circle
      }
  });