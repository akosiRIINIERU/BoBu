import React, { useState, useRef, useEffect } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

// Assets
const PLACEHOLDER_IMAGE = require("../assets/listing1.jpeg");
const BG_IMAGE = require("../assets/bg2.jpg");
const HOME_ICON = require("../assets/home.png");
const CHAT_ICON = require("../assets/lease.png");
const BELL_ICON = require("../assets/bell.png");
const USER_ICON = require("../assets/user.png");

// Colors
const COLORS = {
  BACKGROUND: "#121212",
  CARD_BG: "#1A1A1A",
  TEXT_LIGHT: "#FFFFFF",
  TEXT_SECONDARY: "#BBBBBB",
  SECONDARY: "#FFD700",
  BUTTON_PRIMARY: "#1E90FF",
  BUTTON_CHAT: "#FF6F61",
  SEARCH_BG: "rgba(255,255,255,0.1)",
  NAV_ACTIVE: "#1E90FF",
  NAV_INACTIVE: "#888",
};

export default function Dashboard() {
  const navigation = useNavigation();
  const route = useRoute();
  const flatListRef = useRef(null);
  const [search, setSearch] = useState("");

  const [places, setPlaces] = useState([
    {
      id: "1",
      name: "Lapas sa San Boarding House",
      rent: 12500,
      details: "Private room with shared bathroom. Free Wi-Fi, clean linens included.",
      amenities: ["Wi-Fi", "AC", "Hot Water"],
      images: [PLACEHOLDER_IMAGE],
      rules: "No pets, No smoking.",
      rating: 4.5,
      feedback: "",
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
      feedback: "",
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
      feedback: "",
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
      feedback: "",
      type: "Simple Room",
      location: "Bugo",
      landlordId: "104",
      landlordName: "Landlord Juan",
    },
  ]);

  // Update rating if navigated from CurrentRentalScreen
  useEffect(() => {
    if (route.params?.newRating && route.params?.rentalId) {
      const { newRating, feedback, rentalId } = route.params;
      setPlaces((prev) =>
        prev.map((r) =>
          r.id === rentalId ? { ...r, rating: newRating, feedback } : r
        )
      );
    }
  }, [route.params]);

  const filteredPlaces = places.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderStars = (rating, size = 14) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++)
      stars.push(
        <FontAwesome key={`star-${i}`} name="star" size={size} color={COLORS.SECONDARY} />
      );
    if (halfStar)
      stars.push(
        <FontAwesome key="star-half" name="star-half-full" size={size} color={COLORS.SECONDARY} />
      );
    while (stars.length < 5)
      stars.push(
        <FontAwesome key={`star-empty-${stars.length}`} name="star-o" size={size} color={COLORS.TEXT_SECONDARY} />
      );

    return <View style={{ flexDirection: "row", marginTop: 4 }}>{stars}</View>;
  };

  const renderPlaceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => navigation.navigate("PlaceDetails", { place: item })}
    >
      <Image source={item.images[0]} style={styles.placeImage} />
      <View style={styles.cardDetails}>
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.placeRent}>₱{item.rent.toLocaleString()}</Text>
        {renderStars(item.rating, 16)}
        {item.feedback ? (
          <Text style={styles.feedbackText}>Feedback: {item.feedback}</Text>
        ) : null}
        <View style={styles.amenitiesWrapper}>
          {item.amenities.map((a, i) => (
            <Text key={i} style={styles.amenityText}>
              {a}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  const navTabs = [
    { img: CHAT_ICON, screen: "CurrentRentalScreen", label: "Lease" },
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

        {/* Floating Chat Button */}
        <TouchableOpacity
          style={styles.floatingChatBtn}
          onPress={() => navigation.navigate("chat")}
        >
          <FontAwesome name="comments" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Search */}
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder="Search for boarding houses..."
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
          contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 20 }}
          showsVerticalScrollIndicator={false}
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
              <Text
                style={[
                  styles.navLabel,
                  tab.screen === "Dashboard" && { color: COLORS.NAV_ACTIVE },
                ]}
              >
                {tab.label}
              </Text>
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
  header: {
    padding: 25,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.TEXT_LIGHT,
  },
  searchWrapper: {
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: COLORS.SEARCH_BG,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  search: {
    color: COLORS.TEXT_LIGHT,
    fontSize: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.CARD_BG,
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  placeImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  cardDetails: {
    flex: 1,
    marginLeft: 15,
  },
  placeName: {
    color: COLORS.TEXT_LIGHT,
    fontSize: 18,
    fontWeight: "700",
  },
  placeRent: {
    color: COLORS.TEXT_LIGHT,
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
  },
  feedbackText: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 12,
    marginTop: 4,
  },
  amenitiesWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },
  amenityText: {
    backgroundColor: COLORS.BUTTON_PRIMARY,
    color: "#fff",
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 6,
    marginTop: 4,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "rgba(0,0,0,0.85)",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: { alignItems: "center" },
  navImg: { width: 28, height: 28, tintColor: COLORS.NAV_INACTIVE },
  navLabel: { fontSize: 10, color: COLORS.NAV_INACTIVE, marginTop: 2 },
  floatingChatBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.BUTTON_CHAT,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
