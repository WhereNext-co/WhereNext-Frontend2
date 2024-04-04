import { View, Pressable, Text } from 'react-native';
import styles from "./Button.style";
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Button({onPress}) {
    
    return (
      <Pressable onPress={onPress} style={styles.button}>
      
        <Text style={styles.text}>
        <Icon name="arrow-left" size={25} color="black" /></Text>

      </Pressable>
  );
}


