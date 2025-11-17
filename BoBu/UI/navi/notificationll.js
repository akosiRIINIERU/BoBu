// screens/Notifications.js
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

export default function Notifications() {
  const navigation = useNavigation();

  const notifications = [
    { id: "1", text: "New maintenance request from Unit 505", type: "info" },
    { id: "2", text: "Payment received from Renhiel Maghanoy", type: "info" },
    { id: "3", text: "New message from Renhiel Maghanoy", type: "chat" },
  ];

  const handlePress = (notification) => {
    if (notification.type === "chat") {
      navigation.navigate("Chat"); // Navigate to Chat screen
    } else {
      alert(notification.text);
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
      source={require("../../assets/bg.png")}
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
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)", // dark overlay for readability
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff", // semi-transparent
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  text: {
    color: "#1D1D82",
    fontSize: 16,
  },
});
