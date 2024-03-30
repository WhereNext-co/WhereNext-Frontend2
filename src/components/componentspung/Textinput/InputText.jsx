import { View, Text, TextInput,  StyleSheet,Pressable,} from "react-native";

export default function InputText({ label , background}) {
<TextInput
        style={styles.Folded} 
        onChangeText={onChangeNumber}
        value={number} 
        placeholder="Enter name"
        keyboardType="numeric"
      />
}