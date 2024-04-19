import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import Modal from "react-native-modal";

function ConfirmationModal({
  isVisible,
  rendezvousName,
  date,
  time,
  users,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal isVisible={isVisible}>
      <View style={{ backgroundColor: "white", padding: 22 }}>
        <Text>Rendezvous Name: {rendezvousName}</Text>
        <Text>Date: {date}</Text>
        <Text>Time: {time}</Text>
        <Text>Friends:</Text>
        {users.map((user, index) => (
          <Text key={index}>{user}</Text>
        ))}
        <Button title="Confirm" onPress={onConfirm} />
        <Button title="Cancel" onPress={onCancel} />
      </View>
    </Modal>
  );
}

export default ConfirmationModal;
