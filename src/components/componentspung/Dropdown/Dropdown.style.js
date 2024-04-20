import { StyleSheet } from "react-native";
import { transform } from "typescript";

const styles = StyleSheet.create({
    selectedItemStyle: {
        padding: 8,
        borderRadius: 4,
        paddingHorizontal: 6,
        marginBottom: 4,
    },
    dropDownStyle: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 15,
        minHeight: 42,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 2,
        alignItems: 'center',
        width:90,
        marginLeft: 8 
    },
    transform:{transform: [{ rotate: '180deg' }]
    },
    scrollview:{
        backgroundColor:'white',
        padding:8,
        borderRadius:18}
});


export default styles;