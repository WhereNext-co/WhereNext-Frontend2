import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import Backbutton from "../../components/componentspung/Button/turnbackbutton/Backbutton";
import { router, useLocalSearchParams,Stack } from "expo-router";
import Button from "../../components/componentspung/Button/Button/Button";
import Inputtext from "../../components/componentspung/InputText/InputText";
import Dropdown from "../../components/componentspung/Dropdown/Dropdown";

let titledata = [
  { id: 1, name: "Mr." },
  { id: 2, name: "Ms." },
];

export default function Login({}) {
  const { name, surname, title } = useLocalSearchParams();
  const [selectedTitle, setSelectedTitle] = useState(null);
  const handlePress = () => {
    if (selectedTitle==null || nameInputValue==null || surnameInputValue==null) {
      setShowError(true);
    }
    else {router.push({
      pathname: "/Username",
      params: {
        title: selectedTitle.name,
        name: nameInputValue,
        surname: surnameInputValue,
        mail:''
      },
    });}
  };
  const handlePress2 = () => {
    router.push("/Introduce");
  };
  useEffect(() => {
    if (title == "Mr.") {
      onSelectTitle({ id: 1, name: "Mr." });
    } else if (title == "Ms.") {
      onSelectTitle({ id: 2, name: "Ms." });
    } else {
      onSelectTitle(null);
    }
  }, [title]);
  const [nameInputValue, setNameInputValue] = useState(name);
  const [surnameInputValue, setSurnameInputValue] = useState(surname);
  const nameInputChange = (text) => {
    setNameInputValue(text);
  };
  const surnameInputChange = (text) => {
    setSurnameInputValue(text);
  };
  const onSelectTitle = (item) => {
    setSelectedTitle(item);
  };
  const [showError, setShowError] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#14072b",
      }}
    >
      <Stack.Screen options={{ headerShown: false }} />

      <View style={{ position: "absolute", top: 60, left: 20 }}>
        <Backbutton style={{}} onPress={handlePress2} />
      </View>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "bottom",
            fontSize: 30,
            padding: 20,
            color: "white",
          }}
        >
          Please tell us {"\n"} your full name.
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#14072b",
          marginBottom: 20,
        }}
      ><View style={{flex:0.2}}>
        <Dropdown
          onSelect={onSelectTitle}
          value={selectedTitle}
          data={titledata}
          label=" title "
        /></View><View style={{flex:0.3,marginLeft:6}}>
        <Inputtext
          placeholder="Name"
          value={nameInputValue}
          onPress={nameInputChange}
        /></View><View style={{flex:0.5}}>
        <Inputtext
          placeholder="Surname"
          value={surnameInputValue}
          onPress={surnameInputChange}
        />
      </View></View>

      <Button label={"Next"} onPress={handlePress} style={{}}></Button>
      {showError && (
  <View style={{ alignItems: "center", position: "absolute", bottom: 300 }}>
    <Text style={{ color: "red", fontSize: 30 }}>Please fill in all fields.</Text>
  </View>
)}
    </View>
  );
}

const styles = StyleSheet.create({
  // Styles that are unchanged from previous step are hidden for brevity.

  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },

  container2: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
});
