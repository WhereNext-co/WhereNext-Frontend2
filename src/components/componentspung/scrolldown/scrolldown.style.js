import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#14072b',
      width: 350, 
      marginHorizontal: 20,
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: 'white',
      marginBottom: 10,
      width:350
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    scrollView: {
      flex: 1,
      borderRadius: 8,
      backgroundColor: '#0e051e',
      margin: 10,
      maxHeight: 150,
      width: 250,
    },
  });
  export default styles;