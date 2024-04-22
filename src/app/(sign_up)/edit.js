import { View, Text, TextInput,  StyleSheet,Pressable,Image, TouchableOpacity,Alert} from "react-native";
import React,{useEffect, useState,useContext}  from "react";
import Backbutton from '../../components/componentspung/Button/turnbackbutton/Backbutton';
import { router, useLocalSearchParams,Stack} from "expo-router";
import Button from '../../components/componentspung/Button/Button/Button';
import { listFiles, uploadToFirebase, fbStorage } from '../../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { set } from "date-fns";
import { se } from "date-fns/locale";
import { AuthContext } from "../../context/authContext";

export default function Login({}) {
  const [link,setLink]=useState('https://firebasestorage.googleapis.com/v0/b/wherenext-24624.appspot.com/o/images%2F732A162A-5181-41A1-BDDC-3FACDBC8C706.png?alt=media&token=baa3a32e-2732-4086-ab60-8e3759ef32af');
  const [nameInputValue, setNameInputValue] = useState('');
  const [surnameInputValue, setSurnameInputValue] = useState('');
  const [dInputValue, setDInputValue] = useState('');
  const [mInputValue, setMInputValue] = useState('');
  const [yInputValue, setYInputValue] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [bioInputValue, setBioInputValue] = useState('');
  const [email, setEmail] = useState('');
  const [title,setTitle]=useState('');
  const [region,setRegion]=useState('');
  const [telNo,setTelNo]=useState('');
  const userUID =useContext(AuthContext)

  handleChangeBirthdate = (text) => {
    setDInputValue(text.split('-')[2].split('T')[0])
    setMInputValue(text.split('-')[1])
    setYInputValue(text.split('-')[0])
    setBirthdate(text.slice(10))
    console.log(text.slice(10))
  }

  useEffect(() => {
    axios.post('http://where-next.tech/users/get-profile', {
        uid: userUID.user.uid,
      })
      .then(response => {
        console.log("all",response.data);
        console.log("Name",response.data.Name);
        setNameInputValue(response.data.user.Name)
        setSurnameInputValue(response.data.user.UserName)
        handleChangeBirthdate(response.data.user.Birthdate)
        setBioInputValue(response.data.user.Bio)
        setLink('https://firebasestorage.googleapis.com/v0/b/wherenext-24624.appspot.com/o/images%2F'+response.data.user.ProfilePicture.slice(81))
        setEmail(response.data.user.Email)
        setTitle(response.data.user.Title)
        setRegion(response.data.user.Region)
        setTelNo(response.data.user.TelNo)
      })
      .catch(error => {
        console.error('There was a problem with your Axios request:', error);
      });
  },[])
    const handlePress = () => {
      if (dInputValue.length==1){
        setDInputValue("0"+dInputValue)
      }
      if (mInputValue.length==1){
        setMInputValue("0"+mInputValue)
      }
      if (yInputValue.length==1){
        setYInputValue("0"+yInputValue)
      }
      console.log(link)
      console.log('link:',link.slice(83))
      axios.put('http://where-next.tech/users/profile', {
        uid: userUID.user.uid,
        userName:surnameInputValue,
        email:email,
        title:title,
        name:nameInputValue,
        Birthdate:yInputValue+"-"+mInputValue+"-"+dInputValue+birthdate,
        region:region,
        telNo:telNo,
        profilePicture:'https://firebasestorage.googleapis.com/v0/b/wherenext-24624.appspot.com/o/images/'+link.slice(83),
        bio:bioInputValue

      })
      .then(response => {
        console.log("all",response.data);
      })
      .catch(error => {
        console.error('There was a problem with your Axios request:', error);
      }).finally(() => {
        router.push("../(app)/profile");
      }
      );
    };
    const handlePress2 = () => {
      router.push("../(app)/profile");
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
      <Stack.Screen options={{ headerShown: false }} />
        <View style={{ position: 'absolute', top: 60, left: 20, flexDirection:'row', }}>
        <Backbutton style={{}} onPress={handlePress2}/> 
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
        <TextInput placeholder='DD'  maxLength={2} value={dInputValue} keyboardType="numeric" onChangeText={setDInputValue} placeholderTextColor="#D8D8D8" style={{color:"red",marginLeft:20,fontSize:20}}/><Text style={{
          fontSize:20,
          color:'white'}}>/</Text><TextInput maxLength={2} placeholder='MM' keyboardType="numeric" value={mInputValue} onChangeText={setMInputValue} placeholderTextColor="#D8D8D8" style={{color:"red",fontSize:20}}/><Text style={{
            fontSize:20,
            color:'white'}}>/</Text>
          <TextInput placeholder='YYYY' maxLength={4} keyboardType="numeric" value={yInputValue} onChangeText={setYInputValue} placeholderTextColor="#D8D8D8" style={{color:"red",fontSize:20}}/>
        </View><View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',padding: 20,borderBottomWidth:1,borderColor:'white'}}>
        <Text style={{
          fontSize:20,
          color:'white',
          justifyContent: 'center', alignItems: 'center'}}>Bio</Text>
        <TextInput multiline numberOfLines={4}
        maxLength={40} placeholder='Bio' value={bioInputValue} onChangeText={setBioInputValue} placeholderTextColor="#D8D8D8" style={{color:"red",marginLeft:20,fontSize:20}}/>
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