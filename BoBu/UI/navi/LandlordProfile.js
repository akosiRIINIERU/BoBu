// screens/LandlordProfile.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

export default function LandlordProfile({ navigation }) {
  // Example data for stats
  const activeListings = 3;
  const tenants = 3;

  return (
    <ImageBackground
      source={require("../../assets/bg2.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require("../../assets/marhean.png")}
          style={styles.avatar}
        />
        <Text style={styles.name}>Marhean langTOH</Text>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Contact Info</Text>

          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>marhean@example.com</Text>

          <Text style={styles.infoLabel}>Phone:</Text>
          <Text style={styles.infoValue}>+63 912 345 6789</Text>

          <Text style={styles.infoLabel}>Address:</Text>
          <Text style={styles.infoValue}>123 Main St, Cebu City, Philippines</Text>
        </View>

        {/* Stats Box */}
        <View style={styles.statsBox}>
          <TouchableOpacity
            style={styles.statItem}
            onPress={() => navigation.navigate("Listings")}
          >
            <Text style={styles.statNumber}>{activeListings}</Text>
            <Text style={styles.statLabel}>Active Listings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statItem}
            onPress={() => navigation.navigate("Tenants")}
          >
            <Text style={styles.statNumber}>{tenants}</Text>
            <Text style={styles.statLabel}>Tenants</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    backgroundColor: "#E6E6E6",
  },
  name: { fontSize: 24, fontWeight: "700", color: "#fff", marginBottom: 20 },

  infoCard: {
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#fff", marginBottom: 10 },
  infoLabel: { fontSize: 14, fontWeight: "600", color: "#ccc", marginTop: 10 },
  infoValue: { fontSize: 16, fontWeight: "500", color: "#fff", marginBottom: 5 },

  statsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  statItem: {
    flex: 1,
    backgroundColor: "#1d1d82",
    borderRadius: 25,
    paddingVertical: 25,
    marginHorizontal: 5,
    alignItems: "center",
    elevation: 5, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  statNumber: { fontSize: 28, fontWeight: "700", color: "#fff" },
  statLabel: { fontSize: 16, fontWeight: "600", color: "#fff", marginTop: 5 },
});
