import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native";

export default function Tenants({ navigation }) {
  const tenants = [
    {
      id: 1,
      name: "Renhiel Maghanoy",
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
      name: "Maria Santos",
      status: "Unpaid",
      room: "Room 102",
      email: "maria@example.com",
      phone: "0918-987-6543",
      rent: "₱12,000",
      leaseStart: "Nov 1, 2025",
      leaseEnd: "Oct 31, 2026",
      notes: "Late payments last month",
    },
    {
      id: 3,
      name: "Carlos Reyes",
      status: "Paid",
      room: "Room 103",
      email: "carlos@example.com",
      phone: "0920-555-1212",
      rent: "₱12,000",
      leaseStart: "Nov 1, 2025",
      leaseEnd: "Oct 31, 2026",
      notes: "No issues",
    },
  ];

  // SUMMARY COUNTS
  const paidCount = tenants.filter((t) => t.status === "Paid").length;
  const unpaidCount = tenants.filter((t) => t.status === "Unpaid").length;

  const handleTenantPress = (tenant) => {
    navigation.navigate("LandlordChat", { tenant });
  };

  const renderTenant = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        item.status === "Paid" ? styles.paid : styles.unpaid,
        Platform.OS === "ios" ? styles.cardShadowIOS : styles.cardShadowAndroid,
      ]}
      onPress={() => handleTenantPress(item)}
      activeOpacity={0.85}
    >
      <Text style={styles.name}>👤 {item.name}</Text>

      <View style={styles.detailBlock}>
        <Text style={styles.details}>🏠 {item.room}</Text>
        <Text style={styles.details}>📧 {item.email}</Text>
        <Text style={styles.details}>📞 {item.phone}</Text>
        <Text style={styles.details}>💰 {item.rent}</Text>
        <Text style={styles.details}>
          📅 {item.leaseStart} - {item.leaseEnd}
        </Text>
        <Text style={styles.details}>📝 {item.notes}</Text>
      </View>

      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>
          {item.status === "Paid" ? "✅ Paid" : "⚠️ Unpaid"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../../assets/bg.png")}
      style={styles.container}
      resizeMode="cover"
    >
      {/* SUMMARY BOX */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>Tenant Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Tenants:</Text>
          <Text style={styles.summaryValue}>{tenants.length}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Paid:</Text>
          <Text style={[styles.summaryValue, { color: "#007b00" }]}>
            {paidCount}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Unpaid:</Text>
          <Text style={[styles.summaryValue, { color: "#cc0000" }]}>
            {unpaidCount}
          </Text>
        </View>
      </View>

      <FlatList
        data={tenants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTenant}
        contentContainerStyle={styles.listSpacing}
        showsVerticalScrollIndicator={false}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  summaryBox: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#000",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#333",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },

  listSpacing: {
    paddingBottom: 40,
  },
  card: {
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 22,
    marginBottom: 24,
  },
  cardShadowIOS: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardShadowAndroid: {
    elevation: 6,
  },
  paid: {
    backgroundColor: "#cedbebcc",
  },
  unpaid: {
    backgroundColor: "#FF4D4D",
  },
  name: {
    color: "#171733ff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 14,
  },
  detailBlock: {
    marginBottom: 14,
  },
  details: {
    color: "#000",
    fontSize: 17,
    marginBottom: 6,
  },
  statusBadge: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 14,
    alignSelf: "flex-start",
  },
  statusText: {
    fontWeight: "700",
    color: "#1D1D82",
    fontSize: 14,
  },
});
