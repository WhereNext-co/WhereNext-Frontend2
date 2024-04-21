import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert , Image} from 'react-native';
import Backbutton from '../../components/componentspung/Button/turnbackbutton/Backbutton';
import Button from '../../components/componentspung/Button/Button/Button';
import { SvgUri } from 'react-native-svg';
import { router, useLocalSearchParams,Stack} from "expo-router";

import * as Location from 'expo-location';

export default function LocationRequest() {
  let {name,surname,username,title,mail,birthdate,profile} = useLocalSearchParams();
  console.log(profile)
  console.log(profile.slice (81))
  const [errorMsg, setErrorMsg] = useState(null);
  const handlePress = () => {
    router.push({
      pathname: '/Termagree',
      params: {
        title: title,
        name: name,
        surname: surname,
        mail: mail,
        username: username,
        birthdate:birthdate,
        profile:profile
      }
    });
  };
  const handlePress2 = () => {
    router.push({
      pathname: '/Userprofile',
      params: {
        title: title,
        name: name,
        surname: surname,
        mail: mail,
        username: username,
        birthdate:birthdate,
        profile:profile
      }
    });
  };
  const handlePermissionRequest = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    } else {
      Alert.alert('Permission granted', 'You can now access the location.', [
        { text: 'OK', onPress: handlePress }
      ]);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#14072b' }}>
      <Stack.Screen options={{ headerShown: false }} />
    
      <View style={{ position: 'absolute', top: 60, left: 20 }}>
        <Backbutton style={{}} onPress={handlePress2}/>
      </View>
      <View style={{ alignItems: 'center' , marginBottom: 20}}>
          <Text style={{textAlign :"center",
          textAlignVertical:"bottom",
          fontSize:30,
          padding:20, 
          color:'white'}}>Please turn on your {'\n'} location service.</Text>
     
      </View>
      <View>
       
       <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/wherenext-24624.appspot.com/o/images%2Fa.png?alt=media&token=2ef877f7-1b2a-4f83-a206-41af195eb208' }} 
       style={{width: 200,
               height: 200,
               resizeMode: 'contain',}} />
    
      </View>
      <Button label={"Turn on location service"} onPress={handlePermissionRequest} />
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
});
