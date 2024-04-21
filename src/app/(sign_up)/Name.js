import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import Backbutton from "../../components/componentspung/Button/turnbackbutton/Backbutton";
import { router, useLocalSearchParams } from "expo-router";
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
    router.push({
      pathname: "/Username",
      params: {
        title: selectedTitle.name,
        name: nameInputValue,
        surname: surnameInputValue,
        mail:''
      },
    });
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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <View style={{ position: "absolute", top: 20, left: 20 }}>
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
          backgroundColor: "black",
          marginBottom: 20,
        }}
      >
        <Dropdown
          onSelect={onSelectTitle}
          value={selectedTitle}
          data={titledata}
          label=" title "
        />
        <Inputtext
          placeholder="Name"
          value={nameInputValue}
          onPress={nameInputChange}
        />
        <Inputtext
          placeholder="Surname"
          value={surnameInputValue}
          onPress={surnameInputChange}
        />
      </View>

      <Button label={"Next"} onPress={handlePress} style={{}}></Button>
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
