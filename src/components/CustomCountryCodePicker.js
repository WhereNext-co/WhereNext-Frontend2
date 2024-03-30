import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { StyleSheet } from "react-native";

const CustomCountryCodePicker = ({ onPhoneChange }) => {
    const [countryCode, setCountryCode] = useState('');
    const [country, setCountry] = useState({
        cca2: 'TH',
        callingCode: '66',
    });
    const [phoneDisplay, setPhoneDisplay] = useState(''); //Only for displaying purpose

    const onSelect = (country) => {
        setCountry(country);
        setCountryCode(`+${country.callingCode}`);
    };


    return (
        <View>
            <View style={styles.container}>
                <CountryPicker
                    countryCode={country.cca2}
                    withCallingCode
                    withFilter
                    withFlag={false}
                    withCallingCodeButton
                    onSelect={onSelect}
                />
                <Text>{countryCode} {phoneDisplay}</Text>
                <TextInput
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    value={phone}
                    style={styles.input}
                    onChangeText={(text) => {
                        onPhoneChange(text); //Send Phone to parent
                        setPhoneDisplay(text); //Only for displaying purpose
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20, // half of the desired height to make it oval
        width: 200, // adjust width as needed
        height: 40, // adjust height as needed
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
});

export default CustomCountryCodePicker;
