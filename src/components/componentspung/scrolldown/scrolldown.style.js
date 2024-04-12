import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
      width:300
    },
    buttonText: {
      fontSize: 16,
    },
    scrollView: {
      borderWidth: 1,
      borderColor: 'black',
      marginTop: 10,
      maxHeight: 200,
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
  });
  export default styles;