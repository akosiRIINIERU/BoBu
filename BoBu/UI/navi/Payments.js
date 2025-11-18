import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Platform,
  Modal,
  TextInput,
} from "react-native";

export default function Payments() {
  const [expandedPaymentId, setExpandedPaymentId] = useState(null);
  const [noticeModalVisible, setNoticeModalVisible] = useState(false);
  const [currentTenant, setCurrentTenant] = useState(null);
  const [noticeText, setNoticeText] = useState("");

  const payments = [
    {
      id: 1,
      name: "Renhiel Maghanoy",
      avatar: require("../../assets/ako.jpg"),
      amount: 12500,
      status: "Paid",
      unit: "Unit 505",
      date: "Nov 1, 2025",
      method: "Gcash",
    },
    {
      id: 2,
      name: "Janna Baby",
      avatar: require("../../assets/Jana.jpg"),
      amount: 12000,
      status: "Unpaid",
      unit: "Unit 402",
      date: "Nov 2, 2025",
      method: "Bank",
    },
    {
      id: 3,
      name: "Kylie Jenner",
      avatar: require("../../assets/kyle.jpg"),
      amount: 12000,
      status: "Paid",
      unit: "Unit 301",
      date: "Nov 3, 2025",
      method: "Gcash",
    },
  ];

  const paidCount = payments.filter((p) => p.status === "Paid").length;
  const unpaidCount = payments.filter((p) => p.status === "Unpaid").length;

  const toggleExpand = (id) => {
    setExpandedPaymentId(expandedPaymentId === id ? null : id);
  };

  // Open professional notice modal
  const openNoticeModal = (tenant) => {
    setCurrentTenant(tenant);
    setNoticeText(
      `Dear ${tenant.name},\n\nThis is a friendly reminder regarding your unpaid rent for ${tenant.unit}. Please settle the payment at your earliest convenience.\n\nThank you,\nYour Landlord.`
    );
    setNoticeModalVisible(true);
  };

  // Send notice handler
  const sendProfessionalNotice = () => {
    // Here you could add API call / backend integration
    setNoticeModalVisible(false);
    setCurrentTenant(null);
    setNoticeText("");
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedPaymentId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.card,
          item.status === "Paid" ? styles.paidCard : styles.unpaidCard,
          Platform.OS === "ios" ? styles.cardShadowIOS : styles.cardShadowAndroid,
        ]}
        activeOpacity={0.9}
        onPress={() => toggleExpand(item.id)}
      >
        <View style={styles.cardHeader}>
          <View style={styles.nameSection}>
            <Image source={item.avatar} style={styles.avatar} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.details}>
                {item.unit} • {item.date}
              </Text>
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
          <View style={styles.paymentDetails}>
            <Text style={styles.amount}>₱{item.amount.toLocaleString()}</Text>
            <Text style={styles.method}>Method: {item.method}</Text>

            {/* Show Send Notice button for unpaid */}
            {item.status === "Unpaid" && (
              <TouchableOpacity
                style={styles.noticeButton}
                onPress={() => openNoticeModal(item)}
              >
                <Text style={styles.noticeText}>Send Notice</Text>
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
          <Text style={styles.summaryTitle}>Payment Overview</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Payments:</Text>
            <Text style={styles.summaryValue}>{payments.length}</Text>
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
          data={payments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Professional Notice Modal */}
        <Modal visible={noticeModalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Send Notice</Text>
              <TextInput
                style={styles.modalInput}
                multiline
                value={noticeText}
                onChangeText={setNoticeText}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={sendProfessionalNotice}
              >
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.sendButton, { backgroundColor: "#ccc", marginTop: 8 }]}
                onPress={() => setNoticeModalVisible(false)}
              >
                <Text style={[styles.sendButtonText, { color: "#000" }]}>Cancel</Text>
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
  details: { fontSize: 14, color: "#666", marginTop: 2 },

  statusBadge: { paddingVertical: 4, paddingHorizontal: 14, borderRadius: 12 },
  paidBadge: { backgroundColor: "#ff8c00" },
  unpaidBadge: { backgroundColor: "#dc3545cc" },
  statusText: { color: "#fff", fontWeight: "700", fontSize: 12 },

  paymentDetails: { marginTop: 6, alignItems: "flex-start" },
  amount: { fontSize: 16, fontWeight: "700", color: "#1D1D82" },
  method: { fontSize: 14, color: "#444", marginTop: 2 },

  noticeButton: {
    backgroundColor: "#ff8c00",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  noticeText: { fontSize: 14, fontWeight: "700", color: "#fff" },

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10, color: "#1D1D82" },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    height: 120,
    textAlignVertical: "top",
    marginBottom: 12,
  },
  sendButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  sendButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
