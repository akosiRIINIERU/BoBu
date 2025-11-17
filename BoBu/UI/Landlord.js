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
} from "react-native";

export default function Landlord({ navigation }) {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleLogout = () => {
    setLogoutVisible(false);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.navigate("Profile")}
            android_ripple={{ color: "#FFD700" }}
            style={({ pressed }) => [
              styles.avatarWrapper,
              pressed ? styles.avatarPressed : null,
            ]}
          >
            <Image
              source={require("../assets/marhean.png")}
              style={styles.avatar}
            />
          </Pressable>

          <View style={{ flex: 1 }}>
            <Text style={styles.welcome}>Welcome back,</Text>
            <Text style={styles.name}>Marhean langTOH</Text>
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
            onPress={() => navigation.navigate("Listings")}
            activeOpacity={0.8}
          >
            <Text style={styles.cardNumber}>3</Text>
            <Text style={styles.cardLabel}>Properties</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.infoCard}
            onPress={() => navigation.navigate("Tenants")}
            activeOpacity={0.8}
          >
            <Text style={styles.cardNumber}>3</Text>
            <Text style={styles.cardLabel}>Tenants</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardRow}>
          <TouchableOpacity
            style={styles.infoCard}
            onPress={() => navigation.navigate("Notificationll")}
            activeOpacity={0.8}
          >
            <Text style={styles.cardNumber}>3</Text>
            <Text style={styles.cardLabel}>Pending Requests</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.infoCard}
            onPress={() => navigation.navigate("Payments")}
            activeOpacity={0.8}
          >
            <Text style={styles.cardNumber}>₱48,500</Text>
            <Text style={styles.cardLabel}>Total Rent</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.navBar}>
        {[
          { icon: "📋", screen: "Listings", label: "Listings" },
          { icon: "👥", screen: "Tenants", label: "Tenants" },
          { icon: "💰", screen: "Payments", label: "Payments" },
          { icon: "🔔", screen: "Notificationll", label: "Notifications" },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.label}
            style={styles.navItem}
            onPress={() => {
              setActiveTab(tab.label);
              navigation.navigate(tab.screen);
            }}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.navIcon,
                activeTab === tab.label && styles.navIconActive,
              ]}
            >
              {tab.icon}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#8D9DF6" },
  scrollContainer: { flexGrow: 1, alignItems: "center", padding: 20 },
  header: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#1D1D82",
    borderRadius: 25,
    marginBottom: 25,
    alignItems: "center",
    padding: 15,
  },
  avatarWrapper: {
    borderRadius: 35,
    overflow: "hidden",
    marginRight: 15,
  },
  avatarPressed: {
    // shadow/highlight effect when pressed
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  avatar: { width: 70, height: 70, borderRadius: 35 },
  welcome: { color: "#fff", fontSize: 16, opacity: 0.85 },
  name: { color: "#fff", fontSize: 22, fontWeight: "700" },
  logoutButton: {
    backgroundColor: "#FFD700",
    padding: 8,
    borderRadius: 15,
    justifyContent: "center",
  },
  logoutIcon: { fontSize: 20, color: "#1D1D82", fontWeight: "bold" },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#1D1D82",
    borderRadius: 25,
    paddingVertical: 25,
    marginHorizontal: 5,
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
  cardNumber: { color: "#FFD700", fontSize: 28, fontWeight: "bold" },
  cardLabel: { color: "#fff", fontSize: 14, marginTop: 6 },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1D1D82",
    paddingVertical: 12,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 8,
  },
  navItem: { alignItems: "center" },
  navIcon: { fontSize: 26, color: "#E6E6E6" },
  navIconActive: { color: "#FFD700" },
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1D1D82",
    marginBottom: 10,
  },
  modalText: { fontSize: 15, color: "#333", textAlign: "center", marginBottom: 20 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  modalButton: { flex: 1, marginHorizontal: 8, paddingVertical: 10, borderRadius: 12, alignItems: "center" },
  cancelButton: { backgroundColor: "#ccc" },
  confirmButton: { backgroundColor: "#FFD700" },
  cancelText: { color: "#333", fontWeight: "bold" },
  confirmText: { color: "#1D1D82", fontWeight: "bold" },
});
