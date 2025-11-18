// screens/Listings.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Listings() {
  const navigation = useNavigation();
  const [expandedPropertyId, setExpandedPropertyId] = useState(null);

  const properties = [
    {
      id: "1",
      name: "Boarding House 1: Room 505",
      location: "Makati",
      rent: "₱15,000",
      maxRooms: 1,
      rating: 4.5,
      tenants: [
        {
          id: "t1",
          name: "Renhiel Maghanoy",
          unit: "Unit 505",
          phone: "0917-123-4567",
          rent: "₱12,500",
          avatar: require("../../assets/ako.jpg"),
        },
      ],
      avatar: require("../../assets/listing1.jpeg"),
    },
    {
      id: "2",
      name: "Boarding House 2: Room 102",
      location: "Quezon City",
      rent: "₱12,500",
      maxRooms: 1,
      rating: 4.0,
      tenants: [],
      avatar: require("../../assets/listing2.jpeg"),
    },
    {
      id: "3",
      name: "Boarding House 3: Room 103",
      location: "Taguig",
      rent: "₱18,000",
      maxRooms: 1,
      rating: 4.8,
      tenants: [
        {
          id: "t2",
          name: "Kylie Jenner",
          unit: "Unit 103",
          phone: "0920-555-1212",
          rent: "₱12,000",
          avatar: require("../../assets/kyle.jpg"),
        },
      ],
      avatar: require("../../assets/listing3.jpeg"),
    },
  ];

  const sortedProperties = [...properties].sort(
    (a, b) => b.tenants.length - a.tenants.length
  );

  const vacantCount = properties.filter((p) => p.tenants.length === 0).length;
  const occupiedCount = properties.length - vacantCount;

  const toggleExpand = (id) => {
    setExpandedPropertyId(expandedPropertyId === id ? null : id);
  };

  // Enhanced rating design
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <View style={styles.ratingBadge}>
        <View style={styles.starsRow}>
          {Array(fullStars)
            .fill("★")
            .map((star, i) => (
              <Text key={`full-${i}`} style={styles.fullStar}>
                {star}
              </Text>
            ))}
          {halfStar && <Text style={styles.halfStar}>★</Text>}
          {Array(emptyStars)
            .fill("★")
            .map((star, i) => (
              <Text key={`empty-${i}`} style={styles.emptyStar}>
                {star}
              </Text>
            ))}
        </View>
        <Text style={styles.ratingText}>{rating.toFixed(1)}/5</Text>
      </View>
    );
  };

  const renderProperty = ({ item }) => {
    const isOccupied = item.tenants.length > 0;
    const availabilityText = isOccupied ? "Occupied" : "Vacant";
    const availabilityColor = isOccupied ? "#dc3545" : "#28a745";

    const isExpanded = expandedPropertyId === item.id;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => toggleExpand(item.id)}
      >
        {/* AVAILABILITY BADGE */}
        <View
          style={[
            styles.availabilityBadge,
            { backgroundColor: availabilityColor, position: "absolute", top: 12, right: 12, zIndex: 10 },
          ]}
        >
          <Text style={styles.availabilityText}>{availabilityText}</Text>
        </View>

        {/* Property Avatar */}
        <Image source={item.avatar} style={styles.propertyAvatar} />

        <Text style={styles.propertyName}>🏠 {item.name}</Text>
        <Text style={styles.propertyLocation}>{item.location}</Text>
        <Text style={styles.propertyRent}>{item.rent} / month</Text>

        {/* Rating */}
        {renderStars(item.rating)}

        {/* Expanded Tenant Info */}
        {isExpanded && isOccupied && (
          <View style={styles.tenantInfo}>
            <Text style={styles.tenantTitle}>Tenant Info:</Text>
            <View style={styles.tenantRow}>
              <Image source={item.tenants[0].avatar} style={styles.tenantAvatar} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.tenantName}>{item.tenants[0].name}</Text>
                <Text style={styles.tenantDetails}>Unit: {item.tenants[0].unit}</Text>
                <Text style={styles.tenantDetails}>Phone: {item.tenants[0].phone}</Text>
                <Text style={styles.tenantDetails}>Rent: {item.tenants[0].rent}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => navigation.navigate("Tenants", { tenant: item.tenants[0] })}
            >
              <Text style={styles.chatText}>See Tenant</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/bg2.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Boarding House Overview</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Properties:</Text>
            <Text style={styles.summaryValue}>{properties.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Vacant:</Text>
            <Text style={[styles.summaryValue, { color: "#28a745" }]}>{vacantCount}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Occupied:</Text>
            <Text style={[styles.summaryValue, { color: "#dc3545" }]}>{occupiedCount}</Text>
          </View>
        </View>

        <FlatList
          data={sortedProperties}
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
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)", padding: 15 },

  summaryBox: {
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
  },
  summaryTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10, color: "#ffffffcc" },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  summaryLabel: { fontSize: 14, color: "#ffffffaa" },
  summaryValue: { fontSize: 14, fontWeight: "700", color: "#ffffff" },

  listContent: { paddingBottom: 20 },
  card: {
    width: "100%",
    backgroundColor: "#cedbebcc",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    position: "relative",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: { elevation: 5 },
    }),
  },

  propertyAvatar: {
    width: "100%",
    height: 120,
    borderRadius: 15,
    marginBottom: 10,
  },
  propertyName: { color: "#000", fontSize: 18, fontWeight: "bold", marginBottom: 3 },
  propertyLocation: { color: "#141414", fontSize: 14, marginBottom: 3 },
  propertyRent: { color: "#000", fontSize: 16, fontWeight: "500", marginBottom: 4 },

  // Rating styles
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1D1D82",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  starsRow: { flexDirection: "row" },
  fullStar: { color: "#FFD700", fontSize: 16, marginRight: 2 },
  halfStar: { color: "#FFD700", fontSize: 16, marginRight: 2, opacity: 0.5 },
  emptyStar: { color: "#ccc", fontSize: 16, marginRight: 2 },
  ratingText: { fontSize: 14, fontWeight: "600", color: "#fff", marginLeft: 6 },

  availabilityBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  availabilityText: { color: "#fff", fontWeight: "700", fontSize: 14 },

  tenantInfo: { marginTop: 12 },
  tenantTitle: { fontSize: 14, fontWeight: "700", marginBottom: 6, color: "#000" },
  tenantRow: { flexDirection: "row", alignItems: "center" },
  tenantAvatar: { width: 60, height: 60, borderRadius: 30 },
  tenantName: { fontSize: 16, fontWeight: "700", color: "#000" },
  tenantDetails: { fontSize: 14, color: "#333" },

  chatButton: {
    backgroundColor: "#1d1d82",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  chatText: { color: "#fff", fontWeight: "700" },
});
