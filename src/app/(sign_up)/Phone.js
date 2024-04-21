import { View, Text, TextInput,  StyleSheet, ActivityIndicator, Alert,} from "react-native";
import React,{ useState, useEffect } from "react";
import CountryCodePicker from '../../components/componentspung/Countrycodepicker/Countrycodepicker';
import Backbutton from '../../components/componentspung/Button/turnbackbutton/Backbutton';
import Button from '../../components/componentspung/Button/Button/Button';
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { router, useLocalSearchParams} from "expo-router";
import axios from 'axios';
import { AuthContext, useAuth } from "../../context/authContext";


export default function Login() {
    const { login, register, isAuthenticated } = useAuth();
    let {name,surname,username,title,mail,birthdate,profile,phone2} = useLocalSearchParams();
    const [phone, setPhone] = useState(phone2);
    const [countryCode, setCountryCode] = useState("+66"); // Default country code is +66 (Thailand)
    const [emailPhoneFormat, setEmailPhoneFormat] = useState("");
    const [loading, setLoading] = useState(false);
    const [uid, setUid] = useState("");
    const [verifyValidPhone, setVerifyValidPhone] = useState(false);
    const auth = FIREBASE_AUTH;
    const [already,setAlready] = useState(false);
    const [phoneexist,setPhoneexist] = useState(true);
    const phoneChangeHandler = (phoneNumber) => {
      setPhone(phoneNumber);  
    };
    useEffect(() => {
      console.log('already:',already)
      if (already==true){
        console.log("tel in firebase already")
        try {
          console.log(`1${countryCode}${phone}`)  
          axios.post('http://where-next.tech/auth/updateFirebaseUserPassword', {
          telNo: `${countryCode}${phone}`
        } 
      )
        .then(response => {
          console.log(response.data);
          changeEmailPhoneFormat(`${countryCode}${phone}@wherenext.com`);
          
        })
        .catch(error => {
          console.error('There was a problem with your Axios request in updatefirebase:', error);
          setAlready(true);
        });
  
        } catch (error) {
          setVerifyValidPhone(false);
          alert("Create Account failed:"+error.message);
        } finally {
          setLoading(false);
          
        }
      }
    }, [already]);
    const countryCodeChangeHandler = (countryCode) => {
      setCountryCode(`+${countryCode}`);
    };
    useEffect(() => {
      if (emailPhoneFormat!="") {
      //   axios.post('http://where-next.tech/users/check-username', {
      //     uid:uid,  
      //     userName: username,
      //     title: title,
      //     name: name+' '+surname,
      //     mail: emailPhoneFormat,
      //     birthdate:birthdate,
      //     region:countryCode,
      //     telNo:phone,
      //     profilePicture:profile,
      //     bio:'Change this in settings',
          
      // })
      // .then(response => {
      //   console.log(response.data);
      //   router.replace({pathname:'/OTP',params: {
      //     title: title,
      //     name: name,
      //     surname: surname,
      //     mail: emailPhoneFormat,
      //     username: username,
      //     birthdate:birthdate,
      //     profile:profile,
      //     phone:phone,
      //     countryCode:countryCode,
      //     uid:uid
      //   }})
      // })
      // .catch(error => {
      //   console.error('There was a problem with your Axios request:', error);
      // });
      router.replace({pathname:'/OTP',params: {
            title: title,
            name: name,
            surname: surname,
            mail: emailPhoneFormat,
            username: username,
            birthdate:birthdate,
            profile:profile,
            phone2:phone,
            countryCode2:countryCode,
            uid:uid
          }})
      }
    } ,[emailPhoneFormat]);
    const verifyPhoneHandler = () => {
      alert("OTP Sent!");
    };
    const changeEmailPhoneFormat = (a) => {
      setEmailPhoneFormat(a);
    };
    const signUpHandler = async () => {
      console.log('check-telno')
      setLoading(true);
      try {
        console.log(`+${phone}`)
        axios.post('http://where-next.tech/users/check-telno', {
        telNo: `${phone}`
      } 
    )
      .then(response => {
        console.log(response.data);
        if (response.data.exists==true)
        {
          alert("Phone number already exists, please login instead.")
        }
        else
        {
          console.log('There is no telno in database go to createFirebaseUser')
          signUpHandler2();
        }
      })
      .catch(error => {
        console.error('There was a problem with your Axios request:', error);
      });
      } catch (error) {
        setVerifyValidPhone(false);
        alert("Create Account failed:"+error.message);
      } finally {
        setLoading(false);
        
      }
    }
    const signUpHandler2 = async () => {
        setLoading(true);
        try {
        console.log('createFirebaseUser',`${countryCode}${phone}`)
        axios.post('http://where-next.tech/auth/createFirebaseUser', {
        telNo: `${countryCode}${phone}`
      } 
    )
      .then(response => {
        console.log(response.data);
        setUid(response.data.uid)
        changeEmailPhoneFormat(response.data.email);
        
      })
      .catch(error => {
        console.error('There was a problem with your Axios request in createfirebase:', error);
        setAlready(true);
      });
} 
       catch (error) {
        setVerifyValidPhone(false);
        alert("Create Account failed:"+error.message);
      } finally {
        setLoading(false);
        console.log('Will it run?')
      }
    };
    const handlePress2 = () => {
      router.push({
        pathname: '/Termagree',
        params: {
          title: title,
          name: name,
          surname: surname,
          mail: mail,
          username: username,
          birthdate:birthdate,
          profile:profile
        }
      });
    };
    return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <View style={{ position: 'absolute', top: 20, left: 20 }}>
        <Backbutton style={{}} onPress={handlePress2}/>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{textAlign :"center",
          textAlignVertical:"bottom",
          fontSize:30,
          padding:20, 
          color:'white'}}>We want to make sure {'\n'} you're unique</Text>
          <CountryCodePicker onPhoneChange={phoneChangeHandler}
                      onCountryCodeChange={countryCodeChangeHandler}/>
          <Button label={"Next"} onPress={signUpHandler} style={{}}></Button>
        </View>
        
    
        


    </View>
    ); 
}
const styles = StyleSheet.create({
    // Styles that are unchanged from previous step are hidden for brevity. 
    footerContainer: {
      flex: 1 / 3,
      alignItems: 'center',
    },container: {
      flex: 1,
      backgroundColor: '#000000',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      flex: 1,
      paddingTop: 58,
    },
    image: {
      width: 320,
      height: 440,
      borderRadius: 18,
    },
  });