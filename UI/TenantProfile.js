import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function TenantProfile() {
  const route = useRoute();
  const navigation = useNavigation();
  const { tenant } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tenant Profile</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{tenant.name}</Text>

        <Text style={styles.label}>Unit:</Text>
        <Text style={styles.value}>{tenant.unit}</Text>
      </View>

      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => navigation.navigate("LandlordChat", { tenantName: tenant.name })}
      >
        <Text style={styles.chatText}>💬 Chat with {tenant.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#8D9DF6" },
  header: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 15 },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  label: { fontSize: 16, fontWeight: "bold", color: "#333" },
  value: { fontSize: 16, marginBottom: 10, color: "#555" },
  chatButton: {
    backgroundColor: "#1d1d82",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  chatText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
