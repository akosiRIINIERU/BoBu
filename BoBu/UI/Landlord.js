// screens/Landlord.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Pressable,
  ImageBackground,
  Platform,
} from "react-native";

export default function Landlord({ navigation }) {
  const [activeTab, setActiveTab] = useState("Listings");
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleLogout = () => {
    setLogoutVisible(false);
    navigation.navigate("Login");
  };

  const navTabs = [
    { img: require("../../assets/bh.png"), screen: "Listings", label: "Listings" },
    { img: require("../../assets/ako.png"), screen: "Tenants", label: "Tenants" },
    { img: require("../../assets/marhean.png"), screen: "Payments", label: "Payments" },
    { img: require("../../assets/bell.png"), screen: "Notificationll", label: "Notifications" },
  ];

  return (
    <ImageBackground
      source={require("../assets/bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.navigate("LandlordProfile")}
            style={({ pressed }) => [
              styles.avatarWrapper,
              pressed && styles.avatarPressed,
            ]}
          >
            <Image
              source={require("../assets/marhean.png")}
              style={styles.avatar}
            />
          </Pressable>

          <View style={{ flex: 1 }}>
            <Text style={styles.welcome}>Welcome back,</Text>
            <Text style={styles.name}>Marhean!</Text>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => setLogoutVisible(true)}
          >
            <Text style={styles.logoutIcon}>⎋</Text>
          </TouchableOpacity>
        </View>

        {/* DASHBOARD CARDS */}
        <View style={styles.cardRow}>
          <TouchableOpacity
            style={styles.infoCard}
            onPress={() => navigation.navigate("Listings")}
            activeOpacity={0.85}
          >
            <Text style={styles.cardNumber}>3</Text>
            <Text style={styles.cardLabel}>Properties</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.infoCard}
            onPress={() => navigation.navigate("Tenants")}
            activeOpacity={0.85}
          >
            <Text style={styles.cardNumber}>3</Text>
            <Text style={styles.cardLabel}>Tenants</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardRow}>
          <TouchableOpacity
            style={styles.infoCard}
            onPress={() => navigation.navigate("Notificationll")}
            activeOpacity={0.85}
          >
            <Text style={styles.cardNumber}>3</Text>
            <Text style={styles.cardLabel}>Pending Alerts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.infoCard}
            onPress={() => navigation.navigate("Payments")}
            activeOpacity={0.85}
          >
            <Text style={styles.cardNumber}>₱48,500</Text>
            <Text style={styles.cardLabel}>Total Rent</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.navBar}>
        {navTabs.map((tab) => (
          <TouchableOpacity
            key={tab.label}
            style={styles.navItem}
            onPress={() => {
              setActiveTab(tab.label);
              navigation.navigate(tab.screen);
            }}
          >
            <Image
              source={tab.img}
              style={[
                styles.navImg,
                activeTab === tab.label && styles.navImgActive,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* LOGOUT MODAL */}
      <Modal transparent visible={logoutVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalText}>
              Are you sure you want to log out?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setLogoutVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleLogout}
              >
                <Text style={styles.confirmText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

/* =================== STYLES =================== */
const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, padding: 20, backgroundColor: "rgba(255,255,255,0.15)" },
  scrollContainer: { flexGrow: 1, paddingBottom: 20 },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 15,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: { elevation: 5 },
    }),
  },
  avatarWrapper: { borderRadius: 40, overflow: "hidden", marginRight: 15 },
  avatarPressed: { opacity: 0.8, transform: [{ scale: 0.97 }] },
  avatar: { width: 70, height: 70, borderRadius: 35 },
  welcome: { fontSize: 16, color: "#fff", opacity: 0.9 },
  name: { fontSize: 22, fontWeight: "700", color: "#fff" },
  logoutButton: { backgroundColor: "#FFD700", padding: 10, borderRadius: 12 },
  logoutIcon: { fontSize: 20, fontWeight: "700", color: "#1D1D82" },

  /* DASHBOARD CARDS */
  cardRow: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
  infoCard: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: { elevation: 5 },
    }),
  },
  cardNumber: { fontSize: 26, fontWeight: "700", color: "#fff" },
  cardLabel: { fontSize: 14, color: "#fff", marginTop: 5 },

  /* BOTTOM NAVIGATION */
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  navItem: { alignItems: "center" },
  navImg: { width: 28, height: 28, tintColor: "#E6E6E6" },
  navImgActive: { tintColor: "#FFD700" },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalBox: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 25,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "700", color: "#1D1D82", marginBottom: 10 },
  modalText: { fontSize: 15, color: "#444", textAlign: "center", marginBottom: 15 },
  modalButtons: { flexDirection: "row", width: "100%", justifyContent: "space-between" },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButton: { backgroundColor: "#ccc" },
  confirmButton: { backgroundColor: "#FFD700" },
  cancelText: { color: "#333", fontWeight: "700" },
  confirmText: { color: "#1D1D82", fontWeight: "700" },
});
