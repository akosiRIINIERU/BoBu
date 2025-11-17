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
      source={require("../../assets/bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={require("../../assets/marhean.png")}
            style={styles.avatar}
          />
          <Text style={styles.name}>Marhean langTOH</Text>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.info}>marhean@example.com</Text>

            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.info}>+63 912 345 6789</Text>

            <Text style={styles.label}>Address:</Text>
            <Text style={styles.info}>123 Main St, Cebu City, Philippines</Text>
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
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)" },
  container: { flexGrow: 1, alignItems: "center", padding: 30 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: "700", color: "#FFD700", marginBottom: 20 },
  infoBox: {
    backgroundColor: "#cedbebcc",
    padding: 20,
    borderRadius: 20,
    width: "100%",
    marginBottom: 20,
  },
  label: { fontSize: 16, fontWeight: "600", color: "#ffffff", marginTop: 10 },
  info: { fontSize: 16, fontWeight: "700", color: "#000000", marginBottom: 5 },
  statsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  statItem: {
    flex: 1,
    backgroundColor: "#020235ff",
    borderRadius: 25,
    paddingVertical: 25,
    marginHorizontal: 5,
    alignItems: "center",
    elevation: 5, // subtle shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  statNumber: { fontSize: 28, fontWeight: "700", color: "#FFD700" },
  statLabel: { fontSize: 16, fontWeight: "600", color: "#FFD700", marginTop: 5 },
});
