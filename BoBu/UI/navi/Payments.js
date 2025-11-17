// screens/Payments.js
import React, { useState } from "react";
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground 
} from "react-native";

export default function Payments() {
  const [selectedTenant, setSelectedTenant] = useState(null);

  const payments = [
    { id: 1, name: "Renhiel Maghanoy", amount: 12500, status: "Paid", unit: "Unit 505", date: "Nov 1, 2025" },
    { id: 2, name: "Maria Santos", amount: 12000, status: "Unpaid", unit: "Unit 402", date: "Nov 2, 2025" },
    { id: 3, name: "Carlos Reyes", amount: 12000, status: "Paid", unit: "Unit 301", date: "Nov 3, 2025" },
  ];

  const handleSendNotice = (tenant) => {
    setSelectedTenant(tenant);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>{item.unit} • {item.date}</Text>
      </View>
      <View style={styles.payment}>
        <Text style={styles.amount}>₱{item.amount.toLocaleString()}</Text>
        <Text style={[styles.status, item.status === "Paid" ? styles.paid : styles.unpaid]}>
          {item.status}
        </Text>
        {item.status === "Unpaid" && (
          <TouchableOpacity style={styles.noticeButton} onPress={() => handleSendNotice(item)}>
            <Text style={styles.noticeText}>Send Notice</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require("../../assets/bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {!selectedTenant ? (
          <>
            <Text style={styles.title}>Payment History</Text>
            <FlatList
              data={payments}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </>
        ) : (
          <View style={styles.chatBox}>
            <Text style={styles.chatTitle}>Message {selectedTenant.name}</Text>

            <View style={styles.chatBubble}>
              <Text>
                Hello {selectedTenant.name}, your rent status is still {selectedTenant.status}.
              </Text>
            </View>

            <View style={[styles.chatBubble, styles.reply]}>
              <Text>{selectedTenant.name}: Hi! Yes, I’ll settle it soon. Thanks for the reminder!</Text>
            </View>

            <TouchableOpacity style={styles.backButton} onPress={() => setSelectedTenant(null)}>
              <Text style={styles.backText}>Back to Payments</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, padding: 20, backgroundColor: "rgba(255,255,255,0.15)" },
  title: { fontSize: 26, fontWeight: "700", color: "#1D1D82", textAlign: "center", marginBottom: 20 },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  info: { flex: 2 },
  name: { fontSize: 18, fontWeight: "700", color: "#1D1D82" },
  details: { fontSize: 14, color: "#555", marginTop: 3 },
  payment: { flex: 1, alignItems: "flex-end" },
  amount: { fontSize: 16, fontWeight: "700", color: "#1D1D82" },
  status: { marginTop: 5, paddingVertical: 2, paddingHorizontal: 8, borderRadius: 12, fontSize: 12, fontWeight: "700" },
  paid: { backgroundColor: "#A4EDC6", color: "#056608" },
  unpaid: { backgroundColor: "#F8AFAF", color: "#A80000" },
  noticeButton: { marginTop: 8, backgroundColor: "#FFB400", paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8 },
  noticeText: { fontSize: 12, fontWeight: "700", color: "#fff" },
  chatBox: { marginTop: 20, backgroundColor: "#fff", padding: 20, borderRadius: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3 },
  chatTitle: { fontSize: 20, fontWeight: "700", color: "#1D1D82", marginBottom: 15 },
  chatBubble: { backgroundColor: "#E2E8F0", padding: 12, borderRadius: 12, marginBottom: 10 },
  reply: { backgroundColor: "#D1FAE5", alignSelf: "flex-end" },
  backButton: { marginTop: 10, padding: 10, backgroundColor: "#8D9DF6", borderRadius: 8, alignSelf: "center" },
  backText: { color: "#fff", fontWeight: "700" },
});
