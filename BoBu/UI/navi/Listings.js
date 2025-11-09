// screens/Listings.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Listings() {
  const navigation = useNavigation();

  const properties = [
    {
      id: "1",
      name: "Boarding House 1: Room 505",
      location: "Makati",
      rent: "₱15,000",
      tenants: [
        { id: "t1", name: "Juan Dela Cruz", room: "101" },
        { id: "t2", name: "Maria Santos", room: "102" },
      ],
    },
    {
      id: "2",
      name: "Boarding House 2: Room 102",
      location: "Quezon City",
      rent: "₱12,500",
      tenants: [
        { id: "t3", name: "Carlos Reyes", room: "201" },
        { id: "t4", name: "Ana Lopez", room: "202" },
      ],
    },
    {
      id: "3",
      name: "Boarding House 3: Room 103",
      location: "Taguig",
      rent: "₱18,000",
      tenants: [
        { id: "t5", name: "Liza Manalo", room: "301" },
        { id: "t6", name: "Mark Tan", room: "302" },
      ],
    },
  ];

  const renderProperty = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Tenants", { property: item })}
    >
      <Text style={styles.propertyName}>🏠 {item.name}</Text>
      <Text style={styles.propertyLocation}>{item.location}</Text>
      <Text style={styles.propertyRent}>{item.rent} / month</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <TouchableOpacity onPress={() => navigation.goBack("Landlord")}>
            <Text style={styles.header}>Your Listing 🏠</Text>
          </TouchableOpacity>
        }
        data={properties}
        keyExtractor={(item) => item.id}
        renderItem={renderProperty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(141,157,246,1)",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(29,29,130,1)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  propertyName: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  propertyLocation: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 3,
  },
  propertyRent: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
