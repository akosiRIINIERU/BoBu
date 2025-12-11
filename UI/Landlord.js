// screens/LandlordHome.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LandlordHome() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Home");
  const [logoutVisible, setLogoutVisible] = useState(false);

  // Sample tenants data
  const tenants = [
    { id: 1, name: "Renhiel Maghanoy", room: "Room 505", phone: "0917-123-4567", rent: 12500 },
    { id: 2, name: "Janna Baby", room: "Room 102", phone: "0918-987-6543", rent: 12000 },
    { id: 3, name: "Kylie Jenner", room: "Room 103", phone: "0920-555-1212", rent: 12000 },
  ];

  // Notifications
  const notifications = [
    { id: "1", text: "New rent request from Room 505", type: "info" },
    { id: "2", text: "Payment received from Renhiel", type: "payment", tenantId: 1 },
    { id: "3", text: "New message from Renhiel", type: "chat", tenantId: 1 },
  ];

  const handlePress = (notification) => {
    const tenant = tenants.find((t) => t.id === notification.tenantId);
    switch (notification.type) {
      case "chat":
        tenant ? navigation.navigate("LandlordChat", { tenant }) : alert("Tenant not found");
        break;
      case "payment":
        tenant ? navigation.navigate("Payments", { tenantId: tenant.id }) : alert("Tenant not found");
        break;
      default:
        alert(notification.text);
    }
  };

  const handleLogout = () => {
    setLogoutVisible(false);
    navigation.navigate("Login");
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <Text style={styles.cardText}>🔔 {item.text}</Text>
    </TouchableOpacity>
  );

  // Bottom Navigation
  const navTabs = [
    { label: "Home", screen: "Home", img: require("../assets/bell.png") },
    { label: "Tenants", screen: "Tenants", img: require("../assets/tenants.png") },
    { label: "Payments", screen: "Payments", img: require("../assets/money.png") },
    { label: "Listings", screen: "Listings", img: require("../assets/bh.png") },
  ];

  return (
    <ImageBackground
      source={require("../assets/bg2.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <View style={styles.headerRow}>
              <Pressable
                onPress={() => navigation.navigate("LandlordProfile")}
                android_ripple={{ color: "#FFD700" }}
                style={({ pressed }) => [styles.avatarWrapper, pressed && styles.avatarPressed]}
              >
                <Image source={require("../assets/marhean.png")} style={styles.avatar} />
              </Pressable>

              <View style={styles.welcomeContainer}>
                <Text style={styles.welcome}>Welcome back,</Text>
                <Text style={styles.name}>Marhean!</Text>
              </View>

              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => setLogoutVisible(true)}
              >
                <Text style={styles.logoutText}>⎋</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Notifications</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Navigation */}
      <View style={styles.navBar}>
        {navTabs.map((tab) => (
          <TouchableOpacity
            key={tab.label}
            style={styles.navItem}
            onPress={() => {
              setActiveTab(tab.label);
              if (tab.screen !== "Home") navigation.navigate(tab.screen);
            }}
          >
            <Image
              source={tab.img}
              style={[styles.navImg, activeTab === tab.label && styles.navImgActive]}
            />
            <Text style={[styles.navLabel, activeTab === tab.label && styles.navLabelActive]}>
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
            <Text style={styles.modalText}>Are you sure you want to log out?</Text>
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

  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  welcomeContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  avatarWrapper: {
    borderRadius: 35,
    overflow: "hidden",
  },
  avatarPressed: {
    shadowColor: "#FFD700",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  avatar: { width: 70, height: 70, borderRadius: 35 },
  welcome: { color: "#ffffffcc", fontSize: 14 },
  name: { color: "#ffffff", fontSize: 22, fontWeight: "700" },
  logoutButton: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: { fontSize: 20, fontWeight: "bold", color: "#1D1D82" },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFD700",
    marginTop: 15,
  },

  card: {
    backgroundColor: "#ffffffee",
    borderRadius: 20,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 12,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.2, shadowRadius: 6 },
      android: { elevation: 5 },
    }),
  },
  cardText: { color: "#1D1D82", fontSize: 16, fontWeight: "600" },

  navBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
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
  navImgActive: { tintColor: "#FFD700" },
  navLabel: { fontSize: 10, color: "#E6E6E6" },
  navLabelActive: { color: "#FFD700" },

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
