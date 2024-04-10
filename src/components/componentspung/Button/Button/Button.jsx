import { View, Pressable, Text } from 'react-native';
import styles from "./Button.style";
import { LinearGradient } from 'expo-linear-gradient';



export default function Button({label,onPress}) {
    
    return (
      <Pressable onPress={onPress} style={{padding:10}}>
      <LinearGradient colors={['#2acbf9', '#9aeeb0']}
        style={styles.button}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}>
        <Text style={styles.text}>
        {label}</Text>
      </LinearGradient> 
      </Pressable>
  );
}


