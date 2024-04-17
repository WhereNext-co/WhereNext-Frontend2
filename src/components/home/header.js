import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import colors from "../../shared/colors";
import Back from "../../../assets/home/search/back";

export default function Header({ onFocus }) {
  return (
    <View>
      <Back width={30} height={30} name="back" />
      <TextInput
        placeholder="Search here"
        placeholderTextColor={colors.gray}
        style={styles.searchBar}
        onFocus={onFocus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: colors.white,
    shadowColor: colors.black, // This is required for iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // This property adds shadow on Android
  },
});
