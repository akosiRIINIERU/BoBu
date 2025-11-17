// screens/LandlordProfile.js
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function LandlordProfile({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Landlord Profile</Text>

      {/* Avatar and Name */}
      <View style={styles.avatarBox}>
        <Image
          source={require("../../assets/marhean.png")}
          style={styles.avatar}
        />
        <Text style={styles.name}>Marhean langTOH</Text>
      </View>

      {/* Info Card */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>marhean@example.com</Text>

        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>+63 912 345 6789</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>123 Main St, Cebu City, Philippines</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsBox}>
        <TouchableOpacity
          style={styles.statCard}
          onPress={() => navigation.navigate("Listings")}
        >
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Properties</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.statCard}
          onPress={() => navigation.navigate("Tenants")}
        >
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Tenants</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.statCard}
          onPress={() => navigation.navigate("Payments")}
        >
          <Text style={styles.statNumber}>₱48,500</Text>
          <Text style={styles.statLabel}>Total Rent</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("EditLandlordProfile")}
      >
        <Text style={styles.editButtonText}>✏️ Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#8D9DF6",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  avatarBox: {
    alignItems: "center",
    marginBottom: 25,
  },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
  name: { fontSize: 22, fontWeight: "700", color: "#1D1D82" },
  infoBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
  },
  label: { fontSize: 16, fontWeight: "bold", color: "#333", marginTop: 10 },
  value: { fontSize: 16, color: "#555", marginBottom: 5 },
  statsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#1D1D82",
    borderRadius: 15,
    paddingVertical: 20,
    marginHorizontal: 5,
    alignItems: "center",
  },
  statNumber: { color: "#FFD700", fontSize: 22, fontWeight: "bold" },
  statLabel: { color: "#fff", fontSize: 14, marginTop: 5 },
  editButton: {
    width: "60%",
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  editButtonText: { color: "#1D1D82", fontWeight: "bold", fontSize: 16 },
});
