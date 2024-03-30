import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Link } from "expo-router";

export default function index() {
  return (
    <View>
      <Link href="/home">Home</Link>
    </View>
  );
}
