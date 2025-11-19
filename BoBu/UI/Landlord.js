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
  Platform,
  Pressable,
  ImageBackground,
} from "react-native";

export default function Landlord({ navigation }) {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [logoutVisible, setLogoutVisible] = useState(false);

  // Sample payments data
  const payments = [
    { id: 1, name: "Renhiel Maghanoy", amount: 12500, status: "Paid" },
    { id: 2, name: "Janna Baby", amount: 12000, status: "Unpaid" },
    { id: 3, name: "Kylie Jenner", amount: 12000, status: "Paid" },
  ];

  // Calculate total rent from paid payments
  const totalPaid = payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const handleLogout = () => {
    setLogoutVisible(false);
    navigation.navigate("Login");
  };

  const navTabs = [
    { img: require("../assets/bh.png"), screen: "Listings", label: "Listings" },
    { img: require("../assets/payment.png"), screen: "Payments", label: "Payments" },
    { img: require("../assets/bell.png"), screen: "Notificationll", label: "Notifications" },
  ];

  return (
    <ImageBackground
      source={require("../assets/bg2.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.navigate("LandlordProfile")}
            android_ripple={{ color: "#FFD700" }}
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
            activeOpacity={0.7}
          >
            <Text style={styles.logoutIcon}>⎋</Text>
          </TouchableOpacity>
        </View>

        {/* Dashboard Cards */}
        <View style={styles.cardRow}>
          <TouchableOpacity
            style={styles.infoCard}
            onPress={() => navigation.navigate("Tenants")}
            activeOpacity={0.8}
          >
            <Text style={styles.cardNumber}>3</Text>
            <Text style={styles.cardLabel}>Tenants</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.infoCard}
            onPress={() => navigation.navigate("Payments")}
            activeOpacity={0.8}
          >
            {/* Dynamic total rent */}
            <Text style={styles.cardNumber}>₱{totalPaid.toLocaleString()}</Text>
            <Text style={styles.cardLabel}>Total Rent</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.navBar}>
        {navTabs.map((tab) => (
          <TouchableOpacity
            key={tab.label}
            style={styles.navItem}
            onPress={() => {
              setActiveTab(tab.label);
              navigation.navigate(tab.screen);
            }}
            activeOpacity={0.7}
          >
            <Image
              source={tab.img}
              style={[
                styles.navImg,
                activeTab === tab.label && styles.navImgActive,
              ]}
            />
            <Text
              style={[
                styles.navLabel,
                activeTab === tab.label && styles.navLabelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Modal */}
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

const styles = StyleSheet.create({
  background: { flex: 1 },
  scrollContainer: { flexGrow: 1, alignItems: "center", padding: 20 },

  header: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#000000aa",
    borderRadius: 25,
    marginBottom: 25,
    alignItems: "center",
    padding: 15,
  },
  avatarWrapper: { borderRadius: 35, overflow: "hidden", marginRight: 15 },
  avatarPressed: {
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  avatar: { width: 70, height: 70, borderRadius: 35 },
  welcome: { color: "#ffffff", fontSize: 16, opacity: 0.9 },
  name: { color: "#ffffff", fontSize: 22, fontWeight: "700" },
  logoutButton: {
    backgroundColor: "#FFD700",
    padding: 8,
    borderRadius: 15,
    justifyContent: "center",
  },
  logoutIcon: { fontSize: 20, fontWeight: "bold", color: "#1D1D82" },

  cardRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
  },
  infoCard: {
    width: 150,
    backgroundColor: "#222222cc",
    borderRadius: 25,
    paddingVertical: 25,
    marginHorizontal: 10,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: { elevation: 6 },
    }),
  },
  cardNumber: { color: "#faf9f5ff", fontSize: 28, fontWeight: "700" },
  cardLabel: { color: "#ffffff", fontSize: 14, marginTop: 6 },

  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#000000aa",
    paddingVertical: 12,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 8,
  },
  navItem: { alignItems: "center" },
  navImg: { width: 28, height: 28, tintColor: "#E6E6E6" },
  navImgActive: { tintColor: "#ffffffff" },
  navLabel: { fontSize: 10, color: "#E6E6E6" },
  navLabelActive: { color: "#ffffffff" },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "700", color: "#1D1D82", marginBottom: 10 },
  modalText: { fontSize: 15, color: "#333", textAlign: "center", marginBottom: 20 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  modalButton: { flex: 1, marginHorizontal: 8, paddingVertical: 10, borderRadius: 12, alignItems: "center" },
  cancelButton: { backgroundColor: "#ccc" },
  confirmButton: { backgroundColor: "#FFD700" },
  cancelText: { color: "#333", fontWeight: "700" },
  confirmText: { color: "#1D1D82", fontWeight: "700" },
});
