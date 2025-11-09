import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

export default function Notifications({ navigation, route }) {
  const isPaid = route.params?.isPaid || false;

  const notifications = [
    { id: "1", message: "Your rent is due next week.", screen: "Profile" },
    { id: "2", message: "New message from Landlord.", screen: "Chat" },
    { id: "3", message: "Maintenance request approved." },
  ];

  // Filter out rent notification if paid
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
    <View style={styles.container}>

       <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <Text style={styles.header}>Notifications 🔔</Text>
        </TouchableOpacity>
  
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(141,157,246,1)",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "rgba(29,29,130,1)",
    borderRadius: 20,
    padding: 15,
    marginVertical: 8,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
