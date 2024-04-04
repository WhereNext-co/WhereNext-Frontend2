import React,{Component, useState} from "react";
import { View,Text,StyleSheet,TouchableOpacity,Image,ScrollView} from "react-native";


const Dropdown = ({
    data = [],
    value = null,
    onSelect = () => { },
    label =''
}) => {
    const [showOption, setShowOption] = useState(false);

    const onSelectedItem = (val) => {
        setShowOption(false);
        onSelect(val);
    };

    return (
        <View>
            <TouchableOpacity
                style={styles.dropDownStyle}
                activeOpacity={0.8}
                onPress={() => setShowOption(!showOption)}>
                <Text>{!!value ? value?.name : label}</Text>
                <Text style={{transform: [{rotate: showOption? '180deg':'0deg'}]}}>▼</Text>
            </TouchableOpacity>
            {showOption && (<View>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={true}
                    style={{backgroundColor:'white',padding:8,borderRadius:18}}>
                    {data.map((val, i) => {
                        return (
                            <TouchableOpacity
                                key={String(i)}
                                onPress={() => onSelectedItem(val)}
                                style={{
                                    ...styles.selectedItemStyle,
                                    backgroundColor: value && value.id === val.id ? 'gray' : 'gray',

                                }}>
                                <Text>{val.name}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>)}
        </View>
    );
};

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
    }
});

export default Dropdown;