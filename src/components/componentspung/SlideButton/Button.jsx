import { View, Pressable, Text } from 'react-native';
import styles from "./Button.style";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Button({label,onPress}) {
    
    return (
      <Pressable onPress={onPress} >
      <LinearGradient colors={['#2acbf9', '#9aeeb0']}
        style={styles.button}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}>
        <Text style={styles.text}>
        {label}<Icon name="arrow-right" size={25} color="black" /></Text>
      </LinearGradient> 
      </Pressable>
  );
}


