import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert , Image} from 'react-native';
import Backbutton from '../../components/componentspung/Button/turnbackbutton/Backbutton';
import { router } from "expo-router";
import Button from '../../components/componentspung/Button/Button/Button';
import { SvgUri } from 'react-native-svg';

import * as Location from 'expo-location';

export default function LocationRequest() {
  const [errorMsg, setErrorMsg] = useState(null);
  const handlePress = () => {
    router.push('/Termagree')
  };
  const handlePress2 = () => {
    router.push('/OTP')
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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
    
      <View style={{ position: 'absolute', top: 20, left: 20 }}>
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
       
        <Image
        source={require('../../../assets/Pung/location.png')}
        style={{ width: 200, height: 200 ,backgroundColor:'white'}}
      />
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
