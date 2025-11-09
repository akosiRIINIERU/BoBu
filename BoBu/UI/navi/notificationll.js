// screens/Notifications.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Notificationll() {
  const notifications = [
    "New maintenance request from Unit 102",
    "Payment received from Carlos Reyes",
    "New tenant inquiry: Makati Apartment",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      {notifications.map((note, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.text}>🔔 {note}</Text>
        </View>
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
