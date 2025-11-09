// screens/Payments.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Payments() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment History</Text>
      <Text style={styles.item}>💳 Juan Dela Cruz - ₱12,000 - Paid</Text>
      <Text style={styles.item}>💳 Maria Santos - ₱12,000 - Unpaid</Text>
      <Text style={styles.item}>💳 Carlos Reyes - ₱12,000 - Paid</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#8D9DF6", alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", color: "#1D1D82", marginBottom: 15 },
  item: { fontSize: 16, color: "#fff", marginVertical: 5 },
});
