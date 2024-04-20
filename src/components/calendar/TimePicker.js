import React, { useState } from "react";
import { Button, View, TextInput, StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";

export default function TimePicker({
  onDurationChange,
  onDayChange,
  onHourChange,
  onMinuteChange,
}) {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedDays, setSelectedDays] = useState(0);
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(0);

  const showPicker = () => {
    setPickerVisible(true);
  };

  const hidePicker = () => {
    setPickerVisible(false);
  };

  const handleConfirm = () => {
    onDayChange(selectedDays);
    onHourChange(selectedHours);
    onMinuteChange(selectedMinutes);
    const daysInMinutes = parseInt(selectedDays) * 24 * 60;
    const hoursInMinutes = parseInt(selectedHours) * 60;
    const minutes = parseInt(selectedMinutes);
    const totalDurationInMinutes = daysInMinutes + hoursInMinutes + minutes;
    onDurationChange(totalDurationInMinutes);
    hidePicker();
  };

  return (
    <View>
      <View style={styles.durationContainer}>
        <Text style={styles.pickDurationTitle}>Pick Duration</Text>
        <Button
          title={`${selectedDays}d ${selectedHours}h ${selectedMinutes}m`}
          onPress={showPicker}
        />
      </View>
      <Modal isVisible={isPickerVisible}>
        <View style={styles.container}>
          <Text>Enter time:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setSelectedDays}
            value={selectedDays}
            placeholderTextColor="#7d7d7c"
            placeholder="Days"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={setSelectedHours}
            value={selectedHours}
            placeholderTextColor="#7d7d7c"
            placeholder="Hours"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={setSelectedMinutes}
            value={selectedMinutes}
            placeholderTextColor="#7d7d7c"
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
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
    color: "#000",
  },
  durationContainer: {
    margin: 10,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickDurationTitle: {
    fontSize: 20,
  },
});
