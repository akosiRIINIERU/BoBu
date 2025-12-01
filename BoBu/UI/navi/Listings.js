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
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BarChart } from "react-native-chart-kit";

export default function Listings() {
  const navigation = useNavigation();
  const [isPremium, setIsPremium] = useState(false); 
  const [expandedPropertyId, setExpandedPropertyId] = useState(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const properties = [
    {
      id: "1",
      name: "Boarding House 1: Room 505",
      location: "Makati",
      rent: "₱15,000",
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
      rating: 4.0,
      tenants: [],
      avatar: require("../../assets/listing2.jpeg"),
    },
    {
      id: "3",
      name: "Boarding House 3: Room 103",
      location: "Taguig",
      rent: "₱18,000",
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

  const toggleExpand = (id) => {
    setExpandedPropertyId(expandedPropertyId === id ? null : id);
  };

  const vacantCount = properties.filter((p) => p.tenants.length === 0).length;
  const occupiedCount = properties.length - vacantCount;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <View style={styles.ratingContainer}>
        {Array(fullStars)
          .fill("★")
          .map((_, i) => (
            <Text key={`full-${i}`} style={styles.fullStar}>
              ★
            </Text>
          ))}
        {halfStar && <Text style={styles.halfStar}>★</Text>}
        {Array(emptyStars)
          .fill("★")
          .map((_, i) => (
            <Text key={`empty-${i}`} style={styles.emptyStar}>
              ★
            </Text>
          ))}
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      </View>
    );
  };

  const openPremiumVisitors = (property) => {
    if (!isPremium) {
      setShowPremiumModal(true);
      setSelectedProperty(property);
    } else {
      navigation.navigate("Premium", { property, isPremium });
    }
  };

  const renderProperty = ({ item }) => {
    const isOccupied = item.tenants.length > 0;
    const availabilityColor = isOccupied ? "#ff6b6b" : "#2ed573";
    const isExpanded = expandedPropertyId === item.id;

    return (
      <View style={styles.cardWrapper}>
        <TouchableOpacity style={styles.card} onPress={() => toggleExpand(item.id)}>
          <Image source={item.avatar} style={styles.propertyImage} />
          <View style={styles.cardHeader}>
            <Text style={styles.propertyName}>{item.name}</Text>
            <View style={[styles.availabilityBadge, { backgroundColor: availabilityColor }]}>
              <Text style={styles.availabilityText}>{isOccupied ? "Occupied" : "Vacant"}</Text>
            </View>
          </View>
          <Text style={styles.propertyLocation}>{item.location}</Text>
          <Text style={styles.propertyRent}>{item.rent} / month</Text>
          {renderStars(item.rating)}

          {/* Floating Eye Button */}
          <TouchableOpacity style={styles.eyeButton} onPress={() => openPremiumVisitors(item)}>
            <Image source={require("../../assets/eye.gif")} style={styles.eyeIcon} />
          </TouchableOpacity>

          {/* Expanded Tenant Info */}
          {isExpanded && (
            <View>
              {isOccupied && (
                <View style={styles.tenantInfo}>
                  <Text style={styles.tenantTitle}>Tenant Info</Text>
                  <View style={styles.tenantRow}>
                    <Image source={item.tenants[0].avatar} style={styles.tenantAvatar} />
                    <View style={{ marginLeft: 12 }}>
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

              {/* Analytics Graph for Premium */}
              <View style={styles.analyticsContainer}>
                {isPremium ? (
                  <View>
                    <Text style={styles.analyticsTitle}>Property Analytics</Text>
                    <BarChart
                      data={{
                        labels: ["Vacant", "Occupied"],
                        datasets: [
                          {
                            data: [item.tenants.length === 0 ? 1 : 0, item.tenants.length > 0 ? 1 : 0],
                          },
                        ],
                      }}
                      width={Dimensions.get("window").width - 64}
                      height={200}
                      fromZero
                      chartConfig={{
                        backgroundColor: "#1d1d82",
                        backgroundGradientFrom: "#1d1d82",
                        backgroundGradientTo: "#1d1d82",
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: { borderRadius: 12 },
                      }}
                      style={{ borderRadius: 12, marginTop: 12 }}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.upgradeAnalyticsButton}
                    onPress={() => {
                      setSelectedProperty(item);
                      setShowPremiumModal(true);
                    }}
                  >
                    <Text style={styles.upgradeAnalyticsText}>
                      Upgrade to Premium to see analytics
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground source={require("../../assets/bg2.jpg")} style={styles.background}>
      <View style={styles.overlay}>
        <FlatList
          data={properties}
          keyExtractor={(item) => item.id}
          renderItem={renderProperty}
          contentContainerStyle={{ paddingBottom: 30 }}
          ListHeaderComponent={
            <View>
              {/* Summary Box */}
              <View style={styles.summaryBox}>
                <Text style={styles.summaryTitle}>Boarding House Overview</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Total:</Text>
                  <Text style={styles.summaryValue}>{properties.length}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Vacant:</Text>
                  <Text style={[styles.summaryValue, { color: "#2ed573" }]}>{vacantCount}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Occupied:</Text>
                  <Text style={[styles.summaryValue, { color: "#ff6b6b" }]}>{occupiedCount}</Text>
                </View>
              </View>
            </View>
          }
        />

        {/* Premium Modal */}
        {showPremiumModal && selectedProperty && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Premium Feature</Text>
              <Text style={styles.modalMessage}>
                Upgrade to Premium to view visitors & analytics of {selectedProperty.name}.
              </Text>
              <TouchableOpacity
                style={styles.upgradeButton}
                onPress={() => {
                  setShowPremiumModal(false);
                  navigation.navigate("Premium", { property: selectedProperty, isPremium });
                }}
              >
                <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowPremiumModal(false)} style={{ marginTop: 12 }}>
                <Text style={{ color: "#fff", textAlign: "center" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

// ---- STYLES ----
const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)", padding: 16 },
  summaryBox: { backgroundColor: "rgba(255,255,255,0.1)", padding: 16, borderRadius: 16, marginBottom: 16 },
  summaryTitle: { fontSize: 18, fontWeight: "700", color: "#fff", marginBottom: 10 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  summaryLabel: { fontSize: 14, color: "#ddd" },
  summaryValue: { fontSize: 14, fontWeight: "600", color: "#fff" },
  cardWrapper: { marginBottom: 16 },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 12, overflow: "hidden", ...Platform.select({ ios: { shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } }, android: { elevation: 5 } }) },
  propertyImage: { width: "100%", height: 140, borderRadius: 12, marginBottom: 12 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  propertyName: { fontSize: 16, fontWeight: "700", flex: 1, flexWrap: "wrap" },
  propertyLocation: { color: "#666", fontSize: 13, marginTop: 4 },
  propertyRent: { fontSize: 14, fontWeight: "600", marginTop: 4, color: "#333" },
  availabilityBadge: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 12 },
  availabilityText: { color: "#fff", fontWeight: "600", fontSize: 12 },
  ratingContainer: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  fullStar: { color: "#facc15", fontSize: 14, marginRight: 2 },
  halfStar: { color: "#facc15", fontSize: 14, marginRight: 2, opacity: 0.5 },
  emptyStar: { color: "#ccc", fontSize: 14, marginRight: 2 },
  ratingText: { fontSize: 12, color: "#333", marginLeft: 6 },
  eyeButton: { position: "absolute", bottom: 12, right: 12, padding: 8, borderRadius: 30 },
  eyeIcon: { width: 24, height: 24 },
  tenantInfo: { marginTop: 12, backgroundColor: "#f5f5f5", borderRadius: 12, padding: 12 },
  tenantTitle: { fontWeight: "700", color: "#333", marginBottom: 6 },
  tenantRow: { flexDirection: "row", alignItems: "center" },
  tenantAvatar: { width: 50, height: 50, borderRadius: 25 },
  tenantName: { fontWeight: "600", color: "#333" },
  tenantDetails: { fontSize: 12, color: "#555" },
  chatButton: { marginTop: 8, backgroundColor: "#1d4ed8", paddingVertical: 6, borderRadius: 8 },
  chatText: { color: "#fff", textAlign: "center", fontWeight: "600", fontSize: 13 },
  modalOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center", padding: 20 },
  modalBox: { backgroundColor: "#1d1d82", width: "85%", padding: 20, borderRadius: 14 },
  modalTitle: { fontSize: 18, fontWeight: "700", color: "#fff", marginBottom: 10, textAlign: "center" },
  modalMessage: { color: "#ddd", fontSize: 14, marginBottom: 20, textAlign: "center" },
  upgradeButton: { backgroundColor: "#ffc107", paddingVertical: 10, borderRadius: 10 },
  upgradeButtonText: { textAlign: "center", color: "#000", fontWeight: "700", fontSize: 16 },
  analyticsContainer: { marginTop: 12 },
  analyticsTitle: { fontWeight: "700", fontSize: 14, color: "#333", marginBottom: 8 },
  upgradeAnalyticsButton: { marginTop: 12, backgroundColor: "#ff6b6b", padding: 8, borderRadius: 10 },
  upgradeAnalyticsText: { color: "#fff", fontWeight: "600", textAlign: "center" },
});
