import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const Dropdown = ({
    data = [],
    value = null,
    onSelect = () => { },
    label = ''
}) => {
    const [showOption, setShowOption] = useState(false);

    const onSelectedItem = (val) => {
        setShowOption(false);
        onSelect(val);
    };

    return (
        <View style={{ position: 'relative' }}>
            <TouchableOpacity
                style={styles.dropDownStyle}
                activeOpacity={0.8}
                onPress={() => setShowOption(!showOption)}>
                <Text>{!!value ? value?.name : label}</Text>
                <Text style={{}}>{!showOption ? '▼' : '▲'}</Text>
            </TouchableOpacity>
            {showOption && (
                <View style={styles.optionContainer}>
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={true}
                        style={styles.scrollview}>
                        {data.map((val, i) => (
                            <TouchableOpacity
                                key={String(i)}
                                onPress={() => onSelectedItem(val)}
                                style={{
                                    ...styles.selectedItemStyle,
                                    backgroundColor: value && value.id === val.id ? 'gray' : 'gray',
                                }}>
                                <Text>{val.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
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
        height: 40,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 2,
        alignItems: 'center',
        marginLeft: 8,
    },
    optionContainer: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        paddingVertical: 8,
        paddingLeft: 8,
        borderRadius: 18,
        zIndex: 1, // Ensure it appears above other content
    },
    scrollview: {
        backgroundColor: '#1f1f1f',
        padding: 8,
        borderRadius: 18,
        position: 'relative',
    },
});

export default Dropdown;
