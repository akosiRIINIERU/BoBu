// Landlord.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Landlord() {
  const navigation = useNavigation();

  const tenants = [
    { id: 1, name: "Renhiel Maghanoy", unit: "Unit 505", status: "Active" },
    { id: 2, name: "Marhean Buhisan", unit: "Unit 302", status: "Active" },
    { id: 3, name: "Stella Ramos", unit: "Unit 210", status: "Inactive" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Landlord Dashboard</Text>

      {/* Actions */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Payments")}
        >
          <Text style={styles.actionText}>Payments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("ManageTenants")}
        >
          <Text style={styles.actionText}>Manage Tenants</Text>
        </TouchableOpacity>
      </View>

      {/* Tenant List */}
      <Text style={styles.sectionTitle}>Tenant List</Text>

      {tenants.map((tenant) => (
        <View key={tenant.id} style={styles.card}>
          <Text style={styles.cardName}>{tenant.name}</Text>
          <Text>Unit: {tenant.unit}</Text>
          <Text>Status: {tenant.status}</Text>

          <TouchableOpacity
            style={styles.viewBtn}
            onPress={() => navigation.navigate("TenantDetails", { tenant })}
          >
            <Text style={styles.viewText}>View</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: "bold",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#4a90e2",
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  actionText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f3f3f3",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  cardName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewBtn: {
    marginTop: 10,
    backgroundColor: "#4a90e2",
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  viewText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
