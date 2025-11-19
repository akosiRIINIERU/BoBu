import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const COLORS = {
  TEXT_LIGHT: "#FFFFFF",
  SECONDARY: "#FFD700",
  CARD_BG: "rgba(0,0,0,0.7)",
};

export default function PlaceDetails({ route }) {
  const { place } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={place.images[0]} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{place.name}</Text>
        <Text style={styles.rent}>₱{place.rent.toLocaleString()}</Text>
        <Text style={styles.details}>{place.details}</Text>
        <Text style={styles.subTitle}>Amenities:</Text>
        <Text style={styles.details}>{place.amenities.join(", ")}</Text>
        <Text style={styles.subTitle}>Rules:</Text>
        <Text style={styles.details}>{place.rules}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  image: { width: "100%", height: 250 },
  content: { padding: 20 },
  name: { color: COLORS.SECONDARY, fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  rent: { color: COLORS.SECONDARY, fontSize: 18, marginBottom: 15 },
  details: { color: COLORS.TEXT_LIGHT, fontSize: 16, marginBottom: 10 },
  subTitle: { color: COLORS.SECONDARY, fontSize: 18, fontWeight: "bold", marginTop: 10 },
});
