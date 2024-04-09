import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import * as IntentLauncher from 'expo-intent-launcher';
import { getStorage, ref, uploadFile, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
const storage = getStorage();
const firestore = getFirestore();

const ProfilePictureUploader = () => {
  const [localImage, setLocalImage] = useState(null);

  const addCameraImage = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();

    if (granted === true) {
      let image = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!image.cancelled) {
        setLocalImage(image.uri);
        await uploadImage(image);
      }
    } else {
      openSettings();
    }
  };

  const uploadImage = async (image) => {
    const filename = image.uri.split('/').pop();

    // Assuming you have a function to upload the image to your server
    // and get back the URL
    const imageUrl = await uploadToBlobStorage(image.uri, filename);

    // Assuming you have a function to update the profile picture in your database
    await saveProfilePictureUrl(imageUrl);
  };

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    }
    if (Platform.OS === 'android') {
      const pkg = Constants.manifest.releaseChannel
        ? Constants.manifest.android.package
        : 'host.exp.exponent';
      IntentLauncher.startActivityAsync(
        IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
        { data: 'package:' + pkg }
      );
    }
  };

  const uploadToBlobStorage = async (uri, filename) => {
    const storageRef = ref(storage, `profilepicture/${filename}`);
  
    try {
      const response = await uploadFile(storageRef, uri);
      const downloadURL = await getDownloadURL(response.ref);
  
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const saveProfilePictureUrl = async (userId, url) => {
    const userDoc = doc(firestore, 'users', userId);
  
    try {
      await setDoc(userDoc, { profilePicture: url }, { merge: true });
      console.log('Saved profile picture URL:', url);
    } catch (error) {
      console.error('Error saving profile picture URL:', error);
    }
  };

  return (
    <View>
      {localImage && <Image source={{ uri: localImage }} style={{ width: 200, height: 200 }} />}
      <Button title="Add Profile Picture" onPress={addCameraImage} />
    </View>
  );
};

export default ProfilePictureUploader;
