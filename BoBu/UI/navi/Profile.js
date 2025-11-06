import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
  source={require("../../assets/ako.jpg")}
  style={styles.avatar}
      />
      <Text style={styles.name}>Renhiel Maghanoy</Text>
      <Text style={styles.role}>Tenant</Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Email:</Text>
        <Text style={styles.infoValue}>renhiel@boardbuddy.com</Text>

        <Text style={styles.infoTitle}>Phone:</Text>
        <Text style={styles.infoValue}>+63 912 345 6789</Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(141,157,246,1)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E6E6E6",
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  role: {
    fontSize: 16,
    color: "#f0f0f0",
    marginBottom: 20,
  },
  infoCard: {
    width: "90%",
    backgroundColor: "rgba(29,29,130,1)",
    borderRadius: 25,
    padding: 20,
    marginBottom: 30,
  },
  infoTitle: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 10,
  },
  infoValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "#E6E6E6",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  logoutText: {
    color: "#1d1d82",
    fontWeight: "bold",
  },
});
