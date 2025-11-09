// screens/Notifications.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Notificationll() {
  const navigation = useNavigation();

  const notifications = [
    { id: 1, text: "New maintenance request from Unit 505", type: "info" },
    { id: 2, text: "Payment received from Renhiel Maghanoy", type: "info" },
    { id: 3, text: "New message from Renhiel Maghanoy", type: "chat" },
  ];

  const handlePress = (notification) => {
    if (notification.type === "chat") {
      navigation.navigate("Chat"); // Navigate to Chat screen
    } else {
      alert(notification.text);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      {notifications.map((note) => (
        <TouchableOpacity
          key={note.id}
          style={styles.card}
          onPress={() => handlePress(note)}
        >
          <Text style={styles.text}>🔔 {note.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#8D9DF6", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#1D1D82", marginBottom: 10 },
  card: { backgroundColor: "#E6E6E6", padding: 12, borderRadius: 10, marginVertical: 5 },
  text: { color: "#1D1D82" },
});
