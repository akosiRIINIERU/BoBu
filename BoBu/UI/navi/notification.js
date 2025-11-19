import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from "react-native";

export default function Notifications({ navigation, route }) {
  const isPaid = route.params?.isPaid || false;

  const notifications = [
    { id: "1", message: "Your rent is due next week.", screen: "Profile" },
    { id: "2", message: "New message from Landlord.", screen: "Chat" },
    { id: "3", message: "Maintenance request approved." },
  ];

  const filteredNotifications = notifications.filter(
    (item) => !(isPaid && item.id === "1")
  );

  const handlePress = (screen) => {
    if (screen) {
      navigation.navigate(screen);
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
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <Text style={styles.header}>Notifications</Text>
        </TouchableOpacity>

        <View style={styles.listWrapper}>
          <FlatList
            data={filteredNotifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => handlePress(item.screen)}
              >
                <Text style={styles.text}>{item.message}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fffffdff",
    marginBottom: 20,
    textAlign: "center", // center header
  },
  listWrapper: {
    flex: 1,
    justifyContent: "center", // center vertically
  },
  card: {
    backgroundColor: "#222222cc",
    borderRadius: 20,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center", // center text horizontally
  },
  text: {
    color: "#fffffeff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center", // center text inside card
  },
});
