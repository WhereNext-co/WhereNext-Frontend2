import React,{Component, useState} from "react";
import { View,Text,StyleSheet,TouchableOpacity,Image,ScrollView} from "react-native";
import styles from "./Dropdown.style";

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
                <Text style={styles.transform}>▼</Text>
            </TouchableOpacity>
            {showOption && (<View>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={true}
                    style={styles.scrollview}>
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


export default Dropdown;