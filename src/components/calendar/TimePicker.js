import React, { useState } from "react";
import { Button, View, Text, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";

export default function TimePicker({ time, setTime, title }) {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const showPicker = () => {
    setPickerVisible(true);
  };

  const hidePicker = () => {
    setPickerVisible(false);
  };

  const handleConfirm = () => {
    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    setTime(`${formattedHours}:${formattedMinutes}`);
    hidePicker();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedTime;
    setSelectedTime(currentDate);
  };

  return (
    <View>
      <Button title={time || title} onPress={showPicker} />
      <Modal isVisible={isPickerVisible} onBackdropPress={hidePicker}>
        <View style={styles.modalContainer}>
          <DateTimePicker
            value={selectedTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
          <View style={styles.confirmButton}>
            <Button title="Confirm" onPress={handleConfirm} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
  },
  confirmButton: {
    marginTop: "60%", // Add this line
  },
});
