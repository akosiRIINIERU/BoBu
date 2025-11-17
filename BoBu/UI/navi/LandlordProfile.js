// screens/LandlordProfile.js
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

export default function LandlordProfile() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/marhean.png")}
        style={styles.avatar}
      />
      <Text style={styles.name}>Marhean langTOH</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.info}>marhean@example.com</Text>
      <Text style={styles.label}>Phone:</Text>
      <Text style={styles.info}>+63 912 345 6789</Text>
      <Text style={styles.label}>Address:</Text>
      <Text style={styles.info}>123 Main St, Cebu City, Philippines</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 30,
    backgroundColor: "#8D9DF6",
  },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: "700", color: "#1D1D82", marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", color: "#fff", marginTop: 10 },
  info: { fontSize: 16, color: "#FFD700", marginBottom: 5 },
});
