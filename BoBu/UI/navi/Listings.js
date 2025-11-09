// screens/Listings.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Listings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Listings</Text>
      <Text style={styles.subtitle}>🏠 Apartment 1 - Makati</Text>
      <Text style={styles.subtitle}>🏠 Apartment 2 - Quezon City</Text>
      <Text style={styles.subtitle}>🏠 Apartment 3 - Taguig</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#8D9DF6", alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", color: "#1D1D82", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#fff", marginVertical: 5 },
});
