import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

// Assets
const PLACEHOLDER_IMAGE = require("../assets/listing1.jpeg");
const BG_IMAGE = require("../assets/bg2.jpg");
const HOME_ICON = require("../assets/home.png");
const CHAT_ICON = require("../assets/chat.png");
const BELL_ICON = require("../assets/bell.png");
const USER_ICON = require("../assets/user.png");

// Colors
const COLORS = {
  BACKGROUND: "#121212",
  CARD_BG: "rgba(0,0,0,0.7)",
  TEXT_LIGHT: "#FFFFFF",
  SECONDARY: "#FFD700",
  BUTTON_PRIMARY: "#1E90FF",
};

export default function Dashboard() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  const flatListRef = useRef(null);

  const places = [
    {
      id: "1",
      name: "Lapas sa San Boarding House",
      rent: 15000,
      details: "Private room with shared bathroom. Free Wi-Fi, clean linens included.",
      amenities: ["Wi-Fi", "AC", "Hot Water"],
      images: [PLACEHOLDER_IMAGE],
      rules: "No pets, No smoking.",
      rating: 4.5,
      type: "Private Room",
      location: "San",
      landlordId: "101",
      landlordName: "Landlord Farquad",
    },
    {
      id: "2",
      name: "Macatambalan Boarding House",
      rent: 10500,
      details: "Affordable single room.",
      amenities: ["Wi-Fi", "Laundry"],
      images: [PLACEHOLDER_IMAGE],
      rules: "No parties, quiet hours after 10 PM.",
      rating: 4,
      type: "Single Room",
      location: "Macatambalan",
      landlordId: "102",
      landlordName: "Landlord Maria",
    },
    {
      id: "3",
      name: "Cugmo Boarding House",
      rent: 25000,
      details: "Spacious private room.",
      amenities: ["Wi-Fi", "Balcony"],
      images: [PLACEHOLDER_IMAGE],
      rules: "No pets.",
      rating: 4.8,
      type: "Private Room",
      location: "Cugmo",
      landlordId: "103",
      landlordName: "Landlord Pedro",
    },
    {
      id: "4",
      name: "Bugo ka Boarding House",
      rent: 8000,
      details: "Simple boarding house.",
      amenities: ["Wi-Fi"],
      images: [PLACEHOLDER_IMAGE],
      rules: "No smoking indoors.",
      rating: 3.9,
      type: "Simple Room",
      location: "Bugo",
      landlordId: "104",
      landlordName: "Landlord Juan",
    },
  ];

  const filteredPlaces = places.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderStars = (rating, size = 14) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    for (let i = 0; i < fullStars; i++)
      stars.push(<FontAwesome key={`star-${i}`} name="star" size={size} color={COLORS.SECONDARY} />);
    if (halfStar)
      stars.push(<FontAwesome key="star-half" name="star-half-full" size={size} color={COLORS.SECONDARY} />);
    while (stars.length < 5)
      stars.push(<FontAwesome key={`star-empty-${stars.length}`} name="star-o" size={size} color={COLORS.SECONDARY} />);
    return <View style={{ flexDirection: "row", marginTop: 3 }}>{stars}</View>;
  };

  const renderPlaceItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.images[0]} style={styles.placeImage} />
      <View style={styles.cardDetails}>
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.placeRent}>₱{item.rent.toLocaleString()}</Text>
        {renderStars(item.rating)}
        <TouchableOpacity
          style={styles.viewDetailsBtn}
          onPress={() => navigation.navigate("PlaceDetails", { place: item })}
        >
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const navTabs = [
    { img: CHAT_ICON, screen: "Chat", label: "Chat" },
    { img: HOME_ICON, screen: "Dashboard", label: "Dashboard" },
    { img: BELL_ICON, screen: "Notifications", label: "Notifications" },
    { img: USER_ICON, screen: "Profile", label: "Profile" },
  ];

  return (
    <ImageBackground source={BG_IMAGE} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>BoardBuddy</Text>
        </View>

        {/* Search */}
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#bbb"
            style={styles.search}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Boarding Places */}
        <FlatList
          ref={flatListRef}
          data={filteredPlaces}
          keyExtractor={(item) => item.id}
          renderItem={renderPlaceItem}
          contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 15 }}
        />

        {/* Bottom Nav */}
        <View style={styles.navBar}>
          {navTabs.map((tab) => (
            <TouchableOpacity
              key={tab.label}
              style={styles.navItem}
              onPress={() => navigation.navigate(tab.screen)}
            >
              <Image source={tab.img} style={styles.navImg} />
              <Text style={styles.navLabel}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  background: { flex: 1 },
  header: { padding: 30, alignItems: "center", marginBottom: 0, borderRadius: 30 },
  headerTitle: { fontSize: 28, fontWeight: "700", color: COLORS.TEXT_LIGHT },
  searchWrapper: {
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  search: { color: COLORS.TEXT_LIGHT },
  card: { flexDirection: "row", backgroundColor: COLORS.CARD_BG, padding: 15, marginBottom: 15, borderRadius: 20, alignItems: "center" },
  placeImage: { width: 90, height: 90, borderRadius: 15 },
  cardDetails: { flex: 1, marginLeft: 15 },
  placeName: { color: COLORS.TEXT_LIGHT, fontSize: 16, fontWeight: "700" },
  placeRent: { color: COLORS.TEXT_LIGHT, fontWeight: "bold", marginTop: 2 },
  viewDetailsBtn: {
    marginTop: 10,
    backgroundColor: COLORS.BUTTON_PRIMARY,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignSelf: "flex-start",
  },
  viewDetailsText: {
    color: COLORS.TEXT_LIGHT,
    fontWeight: "bold",
    fontSize: 14,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: { alignItems: "center" },
  navImg: { width: 28, height: 28, tintColor: "#aaa" },
  navLabel: { fontSize: 10, color: "#aaa" },
});
