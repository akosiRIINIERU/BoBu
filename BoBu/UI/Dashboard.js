import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Dashboard() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);

  const places = [
    { id: "1", name: "Lapas sa san, CDO", rent: "₱15,000/month" },
    { id: "2", name: "Macatambalan, CDO", rent: "₱10,500/month" },
    { id: "3", name: "Cugmo, CDO", rent: "₱25,000/month" },
    { id: "4", name: "Bugo ka, CDO", rent: "₱8,000/month" },
  ];

  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Dashboard</Text>

      {/* Search bar */}
      <TextInput
        style={styles.search}
        placeholder="Search for places..."
        value={search}
        onChangeText={setSearch}
      />

      {/* List of places */}
      <FlatList
        data={filteredPlaces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => setSelectedPlace(item)}
          >
            <Image
              source={require("../assets/listing1.jpeg")} // change your image filename
              style={styles.placeImage}
            />
            <Text style={styles.placeName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Rent Modal */}
      <Modal visible={!!selectedPlace} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{selectedPlace?.name}</Text>
            <Text style={styles.modalText}>{selectedPlace?.rent}</Text>

            <TouchableOpacity
              style={styles.rentButton}
              onPress={() => {
                setSelectedPlace(null);
                alert("Rent request sent!");
              }}
            >
              <Text style={styles.rentText}>Rent</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedPlace(null)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Image
            source={require("../assets/chat.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <Image
            source={require("../assets/home.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Image
            source={require("../assets/bell.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={require("../assets/user.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F0F2",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#003366",
    textAlign: "center",
  },
  search: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  placeImage: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 10,
  },
  placeName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: "#444",
  },
  rentButton: {
    backgroundColor: "#0066cc",
    padding: 12,
    borderRadius: 10,
    width: "60%",
    alignItems: "center",
    marginBottom: 10,
  },
  rentText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    color: "#0066cc",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#003366",
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  icon: {
    width: 28,
    height: 28,
  },
});
