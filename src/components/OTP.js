import OTPInputView from '@twotalltotems/react-native-otp-input';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function OTP( {onOTPChange} ) {

  return(
    <OTPInputView
    style={{width: '80%', height: 200}}
    pinCount={6}
    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
    // onCodeChanged = {code => { this.setState({code})}}
    autoFocusOnLoad
    codeInputFieldStyle={styles.underlineStyleBase}
    codeInputHighlightStyle={styles.underlineStyleHighLighted}
    onCodeFilled = {(code => {
        onOTPChange(code)
    })}
    />
  );
// onCodeFilled for when the OTP is filled
}



const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});