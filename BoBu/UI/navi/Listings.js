// screens/Listings.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Listings() {
  const navigation = useNavigation();

  const properties = [
    {
      id: "1",
      name: "Boarding House 1: Room 505",
      location: "Makati",
      rent: "₱15,000",
      maxRooms: 1,
      tenants: [
        { id: "t1", name: "Juan Dela Cruz", room: "101", rating: 4 },
        { id: "t2", name: "Maria Santos", room: "102", rating: 5 },
      ],
    },
    {
      id: "2",
      name: "Boarding House 2: Room 102",
      location: "Quezon City",
      rent: "₱12,500",
      maxRooms: 2,
      tenants: [
        { id: "t3", name: "Carlos Reyes", room: "201", rating: 3 },
        { id: "t4", name: "Ana Lopez", room: "202", rating: 4 },
      ],
    },
    {
      id: "3",
      name: "Boarding House 3: Room 103",
      location: "Taguig",
      rent: "₱18,000",
      maxRooms: 4,
      tenants: [
        { id: "t5", name: "Liza Manalo", room: "301", rating: 5 },
        { id: "t6", name: "Mark Tan", room: "302", rating: 4 },
      ],
    },
  ];

  const renderStars = (rating) => "⭐".repeat(rating) + "☆".repeat(5 - rating);

  const renderProperty = ({ item }) => {
    const availableRooms = item.maxRooms - item.tenants.length;
    const availabilityText =
      availableRooms > 0 ? `Vacant (${availableRooms})` : "Occupied";
    const availabilityColor = availableRooms > 0 ? "#28a745" : "#dc3545"; // green or red

    // Get rating from last tenant
    const lastTenant = item.tenants[item.tenants.length - 1];
    const lastRating = lastTenant?.rating || 0;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Tenants", { property: item })}
        activeOpacity={0.85}
      >
        <Text style={styles.propertyName}>🏠 {item.name}</Text>
        <Text style={styles.propertyLocation}>{item.location}</Text>
        <Text style={styles.propertyRent}>{item.rent} / month</Text>

        {/* Last tenant rating */}
        <Text style={styles.ratingText}>Overall Rating: {renderStars(lastRating)}</Text>

        <View
          style={[styles.availabilityBadge, { backgroundColor: availabilityColor }]}
        >
          <Text style={styles.availabilityText}>{availabilityText}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <FlatList
          data={properties}
          keyExtractor={(item) => item.id}
          renderItem={renderProperty}
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
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(29,29,130,0.85)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  propertyName: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  propertyLocation: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 3,
  },
  propertyRent: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  ratingText: {
    color: "#FFD700",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 5,
  },
  availabilityBadge: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  availabilityText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
