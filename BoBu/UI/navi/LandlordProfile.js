// screens/LandlordProfile.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";

export default function LandlordProfile() {
  return (
    <ImageBackground
      source={require("../assets/bg.png")} // background image
      style={styles.background}
      resizeMode="cover"
    >
      {/* Optional semi-transparent overlay for readability */}
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
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)", // optional dark overlay for readability
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 30,
  },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: "700", color: "#FFD700", marginBottom: 20 },
  infoBox: {
    backgroundColor: "rgba(29,29,130,0.8)", // semi-transparent card
    padding: 20,
    borderRadius: 20,
    width: "100%",
  },
  label: { fontSize: 16, fontWeight: "600", color: "#fff", marginTop: 10 },
  info: { fontSize: 16, color: "#FFD700", marginBottom: 5 },
});
