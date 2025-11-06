import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from "react-native";

export default function Landlord({ navigation }) {
  const [activeTab, setActiveTab] = useState("Home");
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleLogout = () => {
    setLogoutVisible(false);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../assets/landlord-icon.png")}
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.welcome}>Welcome back,</Text>
            <Text style={styles.name}>Landlord 👋</Text>
          </View>

          {/* Logout Icon Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => setLogoutVisible(true)}
          >
            <Text style={styles.logoutIcon}>🚪</Text>
          </TouchableOpacity>
        </View>

        {/* Dashboard Summary Cards */}
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.cardNumber}>5</Text>
            <Text style={styles.cardLabel}>Properties</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardNumber}>12</Text>
            <Text style={styles.cardLabel}>Tenants</Text>
          </View>
        </View>

        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.cardNumber}>3</Text>
            <Text style={styles.cardLabel}>Pending Requests</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardNumber}>₱48,500</Text>
            <Text style={styles.cardLabel}>Total Rent</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        {[
          { label: "Home", icon: "🏠" },
          { label: "Listings", icon: "📋" },
          { label: "Tenants", icon: "👥" },
          { label: "Payments", icon: "💰" },
          { label: "Notifications", icon: "🔔" },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.label}
            style={styles.navItem}
            onPress={() => {
              setActiveTab(tab.label);
              if (tab.label === "Home") navigation.navigate("Landlord");
              if (tab.label === "Listings") navigation.navigate("Listings");
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

      {/* Logout Confirmation Modal */}
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
  mainContainer: {
    flex: 1,
    backgroundColor: "#8D9DF6",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1D1D82",
    width: "100%",
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  welcome: {
    color: "#fff",
    fontSize: 16,
    opacity: 0.8,
  },
  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  logoutButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutIcon: {
    fontSize: 20,
    color: "#1D1D82",
    fontWeight: "bold",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  card: {
    flex: 1,
    backgroundColor: "#E6E6E6",
    borderRadius: 20,
    paddingVertical: 25,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  cardNumber: {
    color: "#1D1D82",
    fontSize: 28,
    fontWeight: "bold",
  },
  cardLabel: {
    color: "#1D1D82",
    fontSize: 14,
    marginTop: 6,
  },
  // Bottom Navigation
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1D1D82",
    paddingVertical: 12,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 8,
  },
  navItem: {
    alignItems: "center",
  },
  navIcon: {
    fontSize: 22,
    color: "#E6E6E6",
    marginBottom: 3,
  },
  navLabel: {
    fontSize: 12,
    color: "#E6E6E6",
  },
  navIconActive: {
    color: "#FFD700",
  },
  navLabelActive: {
    color: "#FFD700",
    fontWeight: "bold",
  },
  // Modal styles
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
  modalText: {
    fontSize: 15,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  confirmButton: {
    backgroundColor: "#FFD700",
  },
  cancelText: {
    color: "#333",
    fontWeight: "bold",
  },
  confirmText: {
    color: "#1D1D82",
    fontWeight: "bold",
  },
});
