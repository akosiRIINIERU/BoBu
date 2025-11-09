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
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Dashboard() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [ratingVisible, setRatingVisible] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [tempRating, setTempRating] = useState(0);

  // Track history of ratings for each place
  const [ratingHistory, setRatingHistory] = useState({});

  const places = [
    { id: "1", name: "Lapas sa San, CDO", rent: "₱15,000/month" },
    { id: "2", name: "Macatambalan, CDO", rent: "₱10,500/month" },
    { id: "3", name: "Cugmo, CDO", rent: "₱25,000/month" },
    { id: "4", name: "Bugo ka, CDO", rent: "₱8,000/month" },
  ];

  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleRent = () => {
    if (!selectedPlace) return;
    setRatingVisible(true);
  };

  const submitRating = () => {
    if (!tempRating) {
      alert("Please select a rating first!");
      return;
    }
    const tenant = "You"; // Replace with actual tenant name
    const date = new Date().toLocaleDateString();

    setRatingHistory((prev) => ({
      ...prev,
      [selectedPlace.id]: [
        ...(prev[selectedPlace.id] || []),
        { tenant, rating: tempRating, date },
      ],
    }));

    setTempRating(0);
    setRatingVisible(false);
    setSelectedPlace(null);
    alert("Thank you for rating your stay!");
  };

  const renderStars = (currentRating, setRating) => (
    <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 10 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => setRating(star)}>
          <Text style={{ fontSize: 28, color: star <= currentRating ? "#FFD700" : "#ccc" }}>★</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      <TextInput
        style={styles.search}
        placeholder="Search for places..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredPlaces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const ratings = ratingHistory[item.id] || [];
          const avgRating =
            ratings.length > 0
              ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
              : null;

          return (
            <View style={styles.card}>
              <Image source={require("../assets/listing1.jpeg")} style={styles.placeImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.placeName}>{item.name}</Text>
                <Text style={styles.placeRent}>{item.rent}</Text>
                {avgRating ? (
                  <Text style={styles.ratingText}>
                    ⭐ {avgRating} / 5 ({ratings.length})
                  </Text>
                ) : (
                  <Text style={styles.ratingText}>No ratings yet</Text>
                )}

                {ratings.length > 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedPlace(item);
                      setHistoryVisible(true);
                    }}
                  >
                    <Text style={styles.historyLink}>View Rating History</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.rentButton}
                  onPress={() => setSelectedPlace(item) || handleRent()}
                >
                  <Text style={styles.rentText}>Rent</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      {/* Rent Modal */}
      <Modal visible={!!selectedPlace && !ratingVisible && !historyVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{selectedPlace?.name}</Text>
            <Text style={styles.modalText}>{selectedPlace?.rent}</Text>

            <TouchableOpacity style={styles.rentButton} onPress={handleRent}>
              <Text style={styles.rentText}>Rent</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedPlace(null)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Rating Modal */}
      <Modal visible={ratingVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Rate Your Stay</Text>
            {renderStars(tempRating, setTempRating)}

            <TouchableOpacity style={styles.rentButton} onPress={submitRating}>
              <Text style={styles.rentText}>Submit Rating</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setTempRating(0);
                setRatingVisible(false);
                setSelectedPlace(null);
              }}
            >
              <Text style={styles.closeText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Rating History Modal */}
      <Modal visible={historyVisible} transparent animationType="fade">
        <ScrollView style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Rating History</Text>
            {ratingHistory[selectedPlace?.id]?.map((r, i) => (
              <Text key={i} style={styles.historyText}>
                {r.tenant} rated {r.rating} ⭐ on {r.date}
              </Text>
            ))}

            <TouchableOpacity style={styles.closeButton} onPress={() => setHistoryVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Image source={require("../assets/chat.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <Image source={require("../assets/home.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Image source={require("../assets/bell.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image source={require("../assets/user.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E8F0F2", paddingHorizontal: 20, paddingTop: 40 },
  header: { fontSize: 26, fontWeight: "bold", marginBottom: 15, color: "#003366", textAlign: "center" },
  search: { backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 15, paddingVertical: 10, marginBottom: 20, fontSize: 16, borderWidth: 1, borderColor: "#ccc" },
  card: { backgroundColor: "#fff", borderRadius: 15, padding: 15, marginBottom: 10, flexDirection: "row", alignItems: "center", elevation: 3 },
  placeImage: { width: 50, height: 50, marginRight: 15, borderRadius: 10 },
  placeName: { fontSize: 18, fontWeight: "600", color: "#333" },
  placeRent: { fontSize: 14, color: "#666", marginTop: 3 },
  ratingText: { color: "#FFB800", fontWeight: "bold", fontSize: 16, marginTop: 3 },
  historyLink: { fontSize: 14, color: "#0066cc", textDecorationLine: "underline", marginTop: 5 },
  modalContainer: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  modalBox: { backgroundColor: "#fff", borderRadius: 15, padding: 25, width: "80%", alignItems: "center", maxHeight: "80%" },
  modalTitle: { fontSize: 22, fontWeight: "bold", color: "#003366", marginBottom: 10 },
  modalText: { fontSize: 18, marginBottom: 20, color: "#444" },
  rentButton: { backgroundColor: "#0066cc", padding: 12, borderRadius: 10, width: "60%", alignItems: "center", marginTop: 10 },
  rentText: { color: "#fff", fontWeight: "bold" },
  closeButton: { padding: 8, marginTop: 10 },
  closeText: { color: "#0066cc" },
  historyText: { fontSize: 16, color: "#333", marginVertical: 3 },
  navbar: { flexDirection: "row", justifyContent: "space-around", backgroundColor: "#003366", paddingVertical: 12, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  icon: { width: 28, height: 28 },
});
