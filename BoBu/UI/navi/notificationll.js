import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Notificationll() {
  const navigation = useNavigation();

  // Example tenants list (you can fetch from DB/API)
  const tenants = [
    { id: 1, name: "Renhiel Maghanoy", room: "Room 505", phone: "0917-123-4567", rent: "₱12,000" },
    { id: 2, name: "Janna Baby", room: "Room 102", phone: "0918-987-6543", rent: "₱12,000" },
    { id: 3, name: "Kylie Jenner", room: "Room 103", phone: "0920-555-1212", rent: "₱12,000" },
  ];

  const notifications = [
    { id: "1", text: "New rent request from Unit 505", type: "info" },
    { id: "2", text: "Payment received from Renhiel Maghanoy", type: "payment", tenantId: 1 },
    { id: "3", text: "New message from Renhiel Maghanoy", type: "chat", tenantId: 1 },
  ];

  const handlePress = (notification) => {
    const tenant = tenants.find(t => t.id === notification.tenantId);

    switch (notification.type) {
      case "chat":
        if (tenant) {
          navigation.navigate("LandlordChat", { tenant });
        } else {
          alert("Tenant data not found");
        }
        break;
      case "payment":
        if (tenant) {
          navigation.navigate("Payments", { tenantId: tenant.id });
        } else {
          alert("Tenant data not found");
        }
        break;
      default:
        alert(notification.text);
        break;
    }
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handlePress(item)}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>🔔 {item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../../assets/bg2.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Notifications</Text>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#000", textAlign: "center", marginBottom: 15 },
  listContent: { paddingBottom: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3 },
      android: { elevation: 3 },
    }),
  },
  text: { color: "#1D1D82", fontSize: 16 },
});
