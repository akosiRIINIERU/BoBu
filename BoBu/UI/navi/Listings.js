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

  // ⭐ Compute vacant vs occupied
  const vacantCount = properties.filter(
    (p) => p.maxRooms - p.tenants.length > 0
  ).length;

  const occupiedCount = properties.length - vacantCount;

  const renderStars = (rating) => "⭐".repeat(rating) + "☆".repeat(5 - rating);

  const renderProperty = ({ item }) => {
    const availableRooms = item.maxRooms - item.tenants.length;
    const availabilityText =
      availableRooms > 0 ? `Vacant (${availableRooms})` : "Occupied";
    const availabilityColor = availableRooms > 0 ? "#28a745" : "#dc3545";

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

        <Text style={styles.ratingText}>
          Overall Rating: {renderStars(lastRating)}
        </Text>

        <View
          style={[
            styles.availabilityBadge,
            { backgroundColor: availabilityColor },
          ]}
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

        {/* 🔥 SUMMARY BOX AT TOP */}
        <TouchableOpacity
          style={styles.summaryBox}
          onPress={() => navigation.navigate("BHStatus", { vacantCount, occupiedCount })}
        >
          <Text style={styles.summaryTitle}>Boarding House Status</Text>

          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.vacantNum}>{vacantCount}</Text>
              <Text style={styles.summaryLabel}>Vacant</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.occupiedNum}>{occupiedCount}</Text>
              <Text style={styles.summaryLabel}>Occupied</Text>
            </View>
          </View>
        </TouchableOpacity>

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

  /* 🟦 SUMMARY BOX STYLE */
  summaryBox: {
    backgroundColor: "#ffffffff",
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
  },
  summaryTitle: {
    color: "#0c0c0cff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  summaryItem: {
    alignItems: "center",
  },
  vacantNum: {
    color: "#28a745",
    fontSize: 30,
    fontWeight: "bold",
  },
  occupiedNum: {
    color: "#dc3545",
    fontSize: 30,
    fontWeight: "bold",
  },
  summaryLabel: {
    color: "#000000ff",
    fontSize: 14,
    marginTop: 5,
  },

  listContent: {
    paddingBottom: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#cedbebcc",
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
    color: "#000000ff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  propertyLocation: {
    color: "#141414ff",
    fontSize: 14,
    marginBottom: 3,
  },
  propertyRent: {
    color: "#000000ff",
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
