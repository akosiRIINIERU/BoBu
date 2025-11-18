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
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Tenants() {
  const navigation = useNavigation();
  const [expandedTenantId, setExpandedTenantId] = useState(null);
  const [noticeModalVisible, setNoticeModalVisible] = useState(false);
  const [currentTenant, setCurrentTenant] = useState(null);
  const [noticeText, setNoticeText] = useState("");

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

  // Open notice modal
  const openNoticeModal = (tenant) => {
    setCurrentTenant(tenant);
    setNoticeText(
      `Dear ${tenant.name},\n\nThis is a friendly reminder regarding your unpaid rent for ${tenant.room}. Please settle the payment at your earliest convenience.\n\nThank you,\nYour Landlord.`
    );
    setNoticeModalVisible(true);
  };

  const sendProfessionalNotice = () => {
    Alert.alert("Notice Sent", `Professional notice sent to ${currentTenant.name}`);
    setNoticeModalVisible(false);
  };

  const renderTenant = ({ item }) => {
    const isExpanded = expandedTenantId === item.id;

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

            {/* CHAT BUTTON */}
            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => navigation.navigate("LandlordChat", { tenant: item })}
            >
              <Text style={styles.chatText}>Chat with Tenant</Text>
            </TouchableOpacity>

            {/* SEND NOTICE BUTTON ONLY IF UNPAID */}
            {item.status === "Unpaid" && (
              <TouchableOpacity
                style={styles.noticeButton}
                onPress={() => openNoticeModal(item)}
              >
                <Text style={styles.noticeText}>Send Professional Notice</Text>
              </TouchableOpacity>
            )}
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

        {/* NOTICE MODAL */}
        <Modal
          visible={noticeModalVisible}
          transparent
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Send Professional Notice</Text>
              <TextInput
                style={styles.modalInput}
                multiline
                value={noticeText}
                onChangeText={setNoticeText}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.noticeButton, { flex: 1, marginRight: 5 }]}
                  onPress={sendProfessionalNotice}
                >
                  <Text style={styles.noticeText}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.noticeButton, { flex: 1, backgroundColor: "#ccc", marginLeft: 5 }]}
                  onPress={() => setNoticeModalVisible(false)}
                >
                  <Text style={[styles.noticeText, { color: "#000" }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
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

  statusBadge: { paddingVertical: 4, paddingHorizontal: 14, borderRadius: 12 },
  paidBadge: { backgroundColor: "#28a745cc" },
  unpaidBadge: { backgroundColor: "#dc3545cc" },
  statusText: { color: "#fff", fontWeight: "700", fontSize: 12 },

  detailBlock: { marginTop: 8 },
  chatButton: {
    backgroundColor: "#1d1d82",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  chatText: { color: "#fff", fontWeight: "700" },

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
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
});
