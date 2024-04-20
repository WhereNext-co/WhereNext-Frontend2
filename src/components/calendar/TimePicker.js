import React, { useState } from "react";
import { Button, View, TextInput, StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";

export default function TimePicker({ onDurationChange }) {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedDays, setSelectedDays] = useState("");
  const [selectedHours, setSelectedHours] = useState("");
  const [selectedMinutes, setSelectedMinutes] = useState("");

  const showPicker = () => {
    setPickerVisible(true);
  };

  const hidePicker = () => {
    setPickerVisible(false);
  };

  const handleConfirm = () => {
    const daysInMinutes = parseInt(selectedDays) * 24 * 60;
    const hoursInMinutes = parseInt(selectedHours) * 60;
    const minutes = parseInt(selectedMinutes);
    const totalDurationInMinutes = daysInMinutes + hoursInMinutes + minutes;
    onDurationChange(totalDurationInMinutes);
    hidePicker();
  };

  return (
    <View>
      <Button title="Choose Time" onPress={showPicker} />
      <Modal isVisible={isPickerVisible}>
        <View style={styles.container}>
          <Text>Enter time:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setSelectedDays}
            value={selectedDays}
            placeholder="Days"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={setSelectedHours}
            value={selectedHours}
            placeholder="Hours"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={setSelectedMinutes}
            value={selectedMinutes}
            placeholder="Minutes"
            keyboardType="numeric"
          />
          <Button title="Confirm" onPress={handleConfirm} />
          <Button title="Cancel" onPress={hidePicker} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
