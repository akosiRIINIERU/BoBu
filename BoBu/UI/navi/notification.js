import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Image } from "react-native";

// Icons
const RENT_ICON = require("../../assets/rent.png");       // for rent due notifications
const MESSAGE_ICON = require("../../assets/message.png"); // for messages
const APPROVED_ICON = require("../../assets/approved.png"); // for approved rent requests

export default function Notifications({ navigation, route }) {
  const isPaid = route.params?.isPaid || false;

  const notifications = [
    { id: "1", message: "Your rent is due next week.", screen: "Profile", icon: RENT_ICON },
    { id: "2", message: "New message from Landlord.", screen: "Chat", icon: MESSAGE_ICON },
    { id: "3", message: "Rent request approved.", screen:"CurrentRentalScreen", icon: APPROVED_ICON },
  ];

  const filteredNotifications = notifications.filter(
    (item) => !(isPaid && item.id === "1")
  );

  const handlePress = (item) => {
    if (item.screen) {
      navigation.navigate(item.screen);
    } else {
      alert("No screen linked!");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/bg2.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Header */}
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <Text style={styles.header}>Notifications</Text>
        </TouchableOpacity>

        {/* Notifications List */}
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => handlePress(item)}
            >
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.text}>{item.message}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
}

const COLORS = {
  TEXT_LIGHT: "#FFFFFF",
  CARD_BG: "#1A1A1ACC",
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, padding: 20 },
  header: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.TEXT_LIGHT,
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.CARD_BG,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 6,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 15,
    tintColor: COLORS.TEXT_LIGHT,
  },
  text: {
    color: COLORS.TEXT_LIGHT,
    fontSize: 16,
    fontWeight: "600",
    flexShrink: 1,
  },
});
