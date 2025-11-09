// screens/Tenants.js
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

export default function Tenants() {
  const [selectedTenant, setSelectedTenant] = useState(null);

  const tenants = [
    { id: 1, name: "Juan Dela Cruz", status: "Paid", unit: "Unit 101" },
    { id: 2, name: "Maria Santos", status: "Unpaid", unit: "Unit 102" },
    { id: 3, name: "Carlos Reyes", status: "Paid", unit: "Unit 103" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tenants Overview</Text>
      <FlatList
        data={tenants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, item.status === "Paid" ? styles.paid : styles.unpaid]}
            onPress={() => setSelectedTenant(item)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.details}>{item.unit}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedTenant && (
        <View style={styles.chatBox}>
          <Text style={styles.chatTitle}>Chat with {selectedTenant.name}</Text>
          <View style={styles.chatBubble}>
            <Text>Hi {selectedTenant.name}, your rent status is {selectedTenant.status}.</Text>
          </View>
          <View style={[styles.chatBubble, styles.reply]}>
            <Text>{selectedTenant.name}: Thanks, noted!</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#8D9DF6", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#1D1D82", marginBottom: 10, textAlign: "center" },
  card: { padding: 15, borderRadius: 15, marginVertical: 8 },
  paid: { backgroundColor: "#b0ffb0" },
  unpaid: { backgroundColor: "#ffb0b0" },
  name: { fontSize: 18, fontWeight: "bold" },
  details: { fontSize: 14, color: "#333" },
  status: { marginTop: 5, fontWeight: "bold" },
  chatBox: { backgroundColor: "#fff", padding: 15, borderRadius: 15, marginTop: 20 },
  chatTitle: { fontWeight: "bold", color: "#1D1D82", marginBottom: 10 },
  chatBubble: { backgroundColor: "#E6E6E6", padding: 10, borderRadius: 10, marginBottom: 5 },
  reply: { alignSelf: "flex-end", backgroundColor: "#FFD700" },
});
