// screens/Tenants.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Image,
  ImageBackground,
  Modal,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Tenants() {
  const navigation = useNavigation();
  const [expandedTenantId, setExpandedTenantId] = useState(null);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [currentTenant, setCurrentTenant] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingNote, setRatingNote] = useState("");
  const [tenantRatings, setTenantRatings] = useState({}); // store rating + note per tenant

  const tenants = [
    {
      id: 1,
      name: "Renhiel Maghanoy",
      avatar: require("../../assets/ako.jpg"),
      status: "Paid",
      room: "Room 505",
      email: "renhiel@example.com",
      phone: "0917-123-4567",
      rent: "₱12,000",
      leaseStart: "Nov 1, 2025",
      leaseEnd: "Oct 31, 2026",
      notes: "Prefers online payment",
    },
    {
      id: 2,
      name: "Janna Baby",
      avatar: require("../../assets/Jana.jpg"),
      status: "Unpaid",
      room: "Room 102",
      email: "janna@example.com",
      phone: "0918-987-6543",
      rent: "₱12,000",
      leaseStart: "Nov 1, 2025",
      leaseEnd: "Oct 31, 2026",
      notes: "Late payments last month",
    },
    {
      id: 3,
      name: "Kylie Jenner",
      avatar: require("../../assets/kyle.jpg"),
      status: "Paid",
      room: "Room 103",
      email: "kylie@example.com",
      phone: "0920-555-1212",
      rent: "₱12,000",
      leaseStart: "Nov 1, 2025",
      leaseEnd: "Oct 31, 2026",
      notes: "No issues",
    },
  ];

  const paidCount = tenants.filter((t) => t.status === "Paid").length;
  const unpaidCount = tenants.filter((t) => t.status === "Unpaid").length;

  const toggleExpand = (id) => {
    setExpandedTenantId(expandedTenantId === id ? null : id);
  };

  // Open rating modal
  const openRatingModal = (tenant) => {
    setCurrentTenant(tenant);
    const existingRating = tenantRatings[tenant.id] || { stars: 0, note: "" };
    setSelectedRating(existingRating.stars);
    setRatingNote(existingRating.note);
    setRatingModalVisible(true);
  };

  const submitRating = () => {
    setTenantRatings({
      ...tenantRatings,
      [currentTenant.id]: { stars: selectedRating, note: ratingNote },
    });
    setRatingModalVisible(false);
  };

  const renderStars = (count) => {
    return (
      <Text style={styles.ratingStars}>
        {"★".repeat(count)}
        {"☆".repeat(5 - count)}
      </Text>
    );
  };

  const renderTenant = ({ item }) => {
    const isExpanded = expandedTenantId === item.id;
    const tenantRating = tenantRatings[item.id]?.stars || 0;
    const tenantNote = tenantRatings[item.id]?.note || "";

    return (
      <TouchableOpacity
        style={[
          styles.card,
          item.status === "Paid" ? styles.paidCard : styles.unpaidCard,
          Platform.OS === "ios" ? styles.cardShadowIOS : styles.cardShadowAndroid,
        ]}
        onPress={() => toggleExpand(item.id)}
        activeOpacity={0.9}
      >
        <View style={styles.cardHeader}>
          <View style={styles.nameSection}>
            <Image source={item.avatar} style={styles.avatar} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.details}>{item.room}</Text>
              {tenantRating > 0 && renderStars(tenantRating)}
            </View>
          </View>
          <View
            style={[
              styles.statusBadge,
              item.status === "Paid" ? styles.paidBadge : styles.unpaidBadge,
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        {isExpanded && (
          <View style={styles.detailBlock}>
            <Text style={styles.details}>Email: {item.email}</Text>
            <Text style={styles.details}>Phone: {item.phone}</Text>
            <Text style={styles.details}>Rent: {item.rent}</Text>
            <Text style={styles.details}>
              Lease: {item.leaseStart} - {item.leaseEnd}
            </Text>
            <Text style={styles.details}>Notes: {item.notes}</Text>
            {tenantNote ? (
              <Text style={styles.details}>Rating Note: {tenantNote}</Text>
            ) : null}

            <View style={styles.buttonRow}>
              {/* CHAT BUTTON */}
              <TouchableOpacity
                style={styles.chatButton}
                onPress={() => navigation.navigate("LandlordChat", { tenant: item })}
              >
                <Text style={styles.chatText}>Chat with Tenant</Text>
              </TouchableOpacity>

              {/* RATE BUTTON */}
              <TouchableOpacity
                style={styles.rateButton}
                onPress={() => openRatingModal(item)}
              >
                <Text style={styles.rateText}>Rate Tenant</Text>
              </TouchableOpacity>
            </View>
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
          <Text style={styles.summaryTitle}>Tenant Overview</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Tenants:</Text>
            <Text style={styles.summaryValue}>{tenants.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Paid:</Text>
            <Text style={[styles.summaryValue, { color: "#28a745" }]}>{paidCount}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Unpaid:</Text>
            <Text style={[styles.summaryValue, { color: "#dc3545" }]}>{unpaidCount}</Text>
          </View>
        </View>

        <FlatList
          data={tenants}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTenant}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        />

        {/* RATING MODAL */}
        <Modal visible={ratingModalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Rate Tenant</Text>
              <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setSelectedRating(star)}>
                    <Text style={[styles.star, selectedRating >= star && styles.selectedStar]}>★</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                style={[styles.modalInput, { height: 80 }]}
                placeholder="Add a note (optional)"
                multiline
                value={ratingNote}
                onChangeText={setRatingNote}
              />
              <TouchableOpacity style={[styles.noticeButton, { marginTop: 10 }]} onPress={submitRating}>
                <Text style={styles.noticeText}>Submit Rating</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.noticeButton, { backgroundColor: "#ccc", marginTop: 8 }]}
                onPress={() => setRatingModalVisible(false)}
              >
                <Text style={[styles.noticeText, { color: "#000" }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, padding: 20, backgroundColor: "rgba(255,255,255,0.1)" },

  summaryBox: {
    backgroundColor: "rgba(0, 0, 0, 0.81)",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  summaryTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8, color: "#fffefeaa" },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  summaryLabel: { fontSize: 14, color: "#ffffffaa" },
  summaryValue: { fontSize: 14, fontWeight: "600", color: "#ffffffe0" },

  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    backgroundColor: "#f7eeeeff",
  },
  cardShadowIOS: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  cardShadowAndroid: { elevation: 6 },
  paidCard: { backgroundColor: "#f0faff" },
  unpaidCard: { backgroundColor: "#fff0f0" },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  nameSection: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  name: { fontSize: 18, fontWeight: "700", color: "#1D1D82" },
  details: { fontSize: 14, color: "#444", marginTop: 2 },

  ratingStars: { fontSize: 16, color: "#ffcc00", marginTop: 2 },

  statusBadge: { paddingVertical: 4, paddingHorizontal: 14, borderRadius: 12 },
  paidBadge: { backgroundColor: "#28a745cc" },
  unpaidBadge: { backgroundColor: "#dc3545cc" },
  statusText: { color: "#fff", fontWeight: "700", fontSize: 12 },

  detailBlock: { marginTop: 8 },
  buttonRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  chatButton: {
    backgroundColor: "#1d1d82",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  chatText: { color: "#fff", fontWeight: "700" },

  rateButton: {
    backgroundColor: "#ff8c00",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  rateText: { color: "#fff", fontWeight: "700" },

  noticeButton: {
    backgroundColor: "#ff8c00",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  noticeText: { color: "#fff", fontWeight: "700" },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  modalTitle: { fontSize: 16, fontWeight: "700", marginBottom: 10 },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    height: 120,
    textAlignVertical: "top",
    marginBottom: 12,
    width: "100%",
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },

  ratingRow: { flexDirection: "row", justifyContent: "center", marginVertical: 10 },
  star: { fontSize: 30, color: "#ccc", marginHorizontal: 5 },
  selectedStar: { color: "#ffcc00" },
});
