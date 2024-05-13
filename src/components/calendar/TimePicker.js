import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import Xmark from "../../../assets/friends/x-mark.svg";
import { se } from "date-fns/locale";

export default function TimePicker({
  onDurationChange,
  onDayChange,
  onHourChange,
  onMinuteChange,
  day,
  hour,
  minute,
}) {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedDays, setSelectedDays] = useState(0);
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [selectedInput, setSelectedInput] = useState(null);

  const showPicker = () => {
    setPickerVisible(true);
  };

  const hidePicker = () => {
    setPickerVisible(false);
  };

  const handleConfirm = () => {
    if (selectedDays === "") {
      setSelectedDays(0);
    }
    if (selectedHours === "") {
      setSelectedHours(0);
    }
    if (selectedMinutes === "") {
      setSelectedMinutes(0);
    }

    // onDayChange(selectedDays);
    // onHourChange(selectedHours);
    // onMinuteChange(selectedMinutes);
    // const daysInMinutes = parseInt(selectedDays) * 24 * 60;
    // const hoursInMinutes = parseInt(selectedHours) * 60;
    // const minutes = parseInt(selectedMinutes);
    // const totalDurationInMinutes = daysInMinutes + hoursInMinutes + minutes;

    const days = selectedDays ? parseInt(selectedDays) : 0;
    const hours = selectedHours ? parseInt(selectedHours) : 0;
    const minutes = selectedMinutes ? parseInt(selectedMinutes) : 0;

    onDayChange(days);
    onHourChange(hours);
    onMinuteChange(minutes);

    const daysInMinutes = days * 24 * 60;
    const hoursInMinutes = hours * 60;
    const totalDurationInMinutes = daysInMinutes + hoursInMinutes + minutes;

    onDurationChange(totalDurationInMinutes);
    console.log(totalDurationInMinutes);
    hidePicker();
  };

  return (
    <View>
      <View style={styles.durationContainer}>
        <Text style={styles.pickDurationTitle}>Duration</Text>
        <LinearGradient
          colors={["#2acbf9", "#9aeeb0"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.timeContainer}
        >
          <Button
            title={`${selectedDays}d ${selectedHours}h ${selectedMinutes}m`}
            onPress={showPicker}
            color="#181D45"
          />
        </LinearGradient>
      </View>
      <Modal isVisible={isPickerVisible}>
        <View style={styles.container}>
          <View className="flex flex-row items-center justify-between">
            <Text style={styles.pickDurationTitleModal}>Enter duration:</Text>
            <Xmark
              width={25}
              height={25}
              color="#14072B"
              onPress={hidePicker}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                selectedInput === "days" && styles.focusedInput,
              ]}
              onChangeText={setSelectedDays}
              value={selectedDays}
              onFocus={() => setSelectedInput("days")}
              onBlur={() => setSelectedInput(null)}
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              placeholder="Days"
              keyboardType="numeric"
            />
            <TextInput
              style={[
                styles.input,
                selectedInput === "hours" && styles.focusedInput,
              ]}
              onChangeText={setSelectedHours}
              value={selectedHours}
              onFocus={() => setSelectedInput("hours")}
              onBlur={() => setSelectedInput(null)}
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              placeholder="Hours"
              keyboardType="numeric"
            />
            <TextInput
              style={[
                styles.input,
                selectedInput === "minutes" && styles.focusedInput,
              ]}
              onChangeText={setSelectedMinutes}
              value={selectedMinutes}
              onFocus={() => setSelectedInput("minutes")}
              onBlur={() => setSelectedInput(null)}
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              placeholder="Minutes"
              keyboardType="numeric"
            />
          </View>

          <LinearGradient
            colors={["#2acbf9", "#9aeeb0"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.button}
          >
            <TouchableOpacity onPress={handleConfirm}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#14072b",
    padding: 20,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    color: "#fff",
    borderBottomWidth: 1, // Add a default bottom border
    borderBottomColor: "rgba(255, 255, 255, 0.6)", // Default border color
  },
  focusedInput: {
    borderBottomColor: "#5fede4", // Change border color when focused
  },
  button: {
    borderRadius: 10,
    marginTop: 12,
  },
  buttonText: {
    color: "#14072B",
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
  },
  durationContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeContainer: {
    borderRadius: 10,
  },
  pickDurationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  pickDurationTitleModal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
