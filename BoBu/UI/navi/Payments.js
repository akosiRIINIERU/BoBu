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

  const openNoticeModal = (tenant) => {
    setCurrentTenant(tenant);
    setNoticeText(
      `Dear ${tenant.name},\n\nThis is a friendly reminder regarding your unpaid rent for ${tenant.unit}. Please settle the payment at your earliest convenience.\n\nThank you,\nYour Landlord.`
    );
    setNoticeModalVisible(true);
  };

  const sendProfessionalNotice = () => {
    setNoticeModalVisible(false);
    setCurrentTenant(null);
    setNoticeText("");
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedPaymentId === item.id;

    return (
      <View style={styles.cardWrapper}>
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
      </View>
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
            <Text style={[styles.summaryValue, { color: "#2ed573" }]}>{paidCount}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Unpaid:</Text>
            <Text style={[styles.summaryValue, { color: "#ff6b6b" }]}>{unpaidCount}</Text>
          </View>
        </View>

        <FlatList
          data={payments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        />

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
  overlay: { flex: 1, padding: 16, backgroundColor: "rgba(0,0,0,0.25)" },

  summaryBox: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  summaryTitle: { fontSize: 18, fontWeight: "700", color: "#fff", marginBottom: 10 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  summaryLabel: { fontSize: 14, color: "#ddd" },
  summaryValue: { fontSize: 14, fontWeight: "600", color: "#fff" },

  cardWrapper: { marginBottom: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    overflow: "hidden",
  },
  cardShadowIOS: { shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  cardShadowAndroid: { elevation: 5 },
  paidCard: { backgroundColor: "#f0faff" },
  unpaidCard: { backgroundColor: "#fff0f0" },

  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  nameSection: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  name: { fontSize: 16, fontWeight: "700", color: "#1D1D82" },
  details: { fontSize: 13, color: "#666", marginTop: 2 },

  statusBadge: { paddingVertical: 4, paddingHorizontal: 12, borderRadius: 12 },
  paidBadge: { backgroundColor: "#2ed573" },
  unpaidBadge: { backgroundColor: "#ff6b6b" },
  statusText: { color: "#fff", fontWeight: "700", fontSize: 12 },

  paymentDetails: { marginTop: 6, alignItems: "flex-start" },
  amount: { fontSize: 16, fontWeight: "700", color: "#1D1D82" },
  method: { fontSize: 14, color: "#444", marginTop: 2 },

  noticeButton: { marginTop: 10, backgroundColor: "#ff8c00", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 10 },
  noticeText: { fontSize: 14, fontWeight: "700", color: "#fff" },

  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)", padding: 20 },
  modalContainer: { backgroundColor: "#fff", width: "100%", borderRadius: 16, padding: 16 },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10, color: "#1D1D82" },
  modalInput: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, height: 120, textAlignVertical: "top", marginBottom: 12 },
  sendButton: { backgroundColor: "#1D1D82", paddingVertical: 10, borderRadius: 10, alignItems: "center" },
  sendButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
