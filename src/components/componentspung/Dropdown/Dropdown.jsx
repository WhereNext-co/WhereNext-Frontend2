import React,{Component, useState} from "react";
import { View,Text,StyleSheet,TouchableOpacity } from "react-native";

let date=[{id:1,name:'a'},{id:2,name:'b'},{id:3,name:'c'}]

const Dropdown =  () => {
    const [data,setData] =useState([])
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            style={styles.dropDownStyle}
            activeOpacity={0.8}>
                <Text>Choose an option</Text>
            </TouchableOpacity>
            {date.map((val,i)=>{
                return (
                    <Text key={String(i)}>{val.name}</Text>
                )
            })}
        </View>
    )
};

const styles= StyleSheet.create({
    container:{

    },
    dropDownStyle:{
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding:8,
        borderRadius:6,
        minHeight:42,
        justifyContent:'space-between',
        flexDirection: 'row',

        alignItems:'center'
    }
})
export default Dropdown;