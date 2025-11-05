import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function Notifications() {
  const notifications = [
    { id: "1", message: "Your rent is due next week." },
    { id: "2", message: "New message from Landlord." },
    { id: "3", message: "Maintenance request approved." },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications 🔔</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(141,157,246,1)",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "rgba(29,29,130,1)",
    borderRadius: 20,
    padding: 15,
    marginVertical: 8,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
