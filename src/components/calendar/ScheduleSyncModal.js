import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import Modal from "react-native-modal";

function ConfirmationModal({ isVisible, onConfirm, onCancel }) {
  const [timeList, setTimeList] = useState([
    {
      startTime: "16:00",
      endTime: "20:00",
    },
    {
      startTime: "16:00",
      endTime: "20:00",
    },
  ]);

  return (
    <Modal isVisible={isVisible}>
      <View style={{ backgroundColor: "white", padding: 22 }}>
        <Text>Schedule Sync</Text>
        <Text>Friends:</Text>
        {timeList.map((time, index) => (
          <Text key={index}>
            {time.startTime} - {time.endTime}
          </Text>
        ))}
        <Button title="Send Invites" onPress={onConfirm} />
        <Button title="Cancel" onPress={onCancel} />
      </View>
    </Modal>
  );
}

export default ConfirmationModal;
