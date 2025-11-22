import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  ImageBackground,
  Modal,
  TextInput,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const COLORS = {
  TEXT_LIGHT: "#FFFFFF",
  SECONDARY: "#FFD700",
  BUTTON_PRIMARY: "#1E90FF",
  BUTTON_SECONDARY: "#FFA500",
};

const PLACEHOLDER_IMAGE = require("../../assets/listing1.jpeg");
const BG_IMAGE = require("../../assets/bg2.jpg");

export default function CurrentRentalScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [thankYouVisible, setThankYouVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const thankYouAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (thankYouVisible) {
      Animated.spring(thankYouAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }).start();
    } else {
      thankYouAnim.setValue(0);
    }
  }, [thankYouVisible]);

  const currentRental = {
    id: "1",
    name: "Lapas sa San Boarding House",
    rent: 15000,
    details: "Private room with shared bathroom. Free Wi-Fi, clean linens included.",
    amenities: ["Wi-Fi", "AC", "Hot Water"],
    rules: "No pets, No smoking.",
    leaseStart: "2025-11-01",
    leaseEnd: "2026-10-31",
    paymentFrequency: "Monthly",
    rating: 4.5,
    type: "Private Room",
    location: "Lapas sa San",
    landlordName: "Landlord Marhean",
    Gcash: "0123456789",
    images: [PLACEHOLDER_IMAGE],
  };

  const renderStars = (rating, size = 20, interactive = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const name = i <= rating ? "star" : "star-o";
      stars.push(
        <TouchableOpacity
          key={`star-${i}`}
          disabled={!interactive}
          onPress={() => interactive && setSelectedRating(i)}
          style={{ marginHorizontal: 2 }}
        >
          <FontAwesome name={name} size={size} color={COLORS.SECONDARY} />
        </TouchableOpacity>
      );
    }
    return <View style={{ flexDirection: "row", alignItems: "center" }}>{stars}</View>;
  };

  const handleSubmitRating = () => {
    if (selectedRating === 0) {
      alert("Please select a star rating before submitting!");
      return;
    }
    setModalVisible(false);
    setThankYouVisible(true);
    setTimeout(() => {
      setThankYouVisible(false);
      setSelectedRating(0);
      setFeedbackText("");
      navigation.navigate("Dashboard", {
        newRating: selectedRating,
        feedback: feedbackText,
        rentalId: currentRental.id,
      });
    }, 2000);
  };

  return (
    <ImageBackground source={BG_IMAGE} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        {/* Floating Chat Circle */}
        <Animated.View style={[styles.chatCircle, { transform: [{ scale: pulseAnim }] }]}>
          <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            <FontAwesome name="comments" size={28} color="#fff" />
          </TouchableOpacity>
        </Animated.View>

        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
          <Image source={currentRental.images[0]} style={styles.image} />

          {/* Lease Details Card */}
          <BlurView
            style={styles.card}
            intensity={80}
            tint={Platform.OS === "ios" ? "dark" : undefined}
            fallbackColor={Platform.OS === "android" ? "rgba(0,0,0,0.5)" : undefined}
          >
            <Text style={styles.cardTitle}>Lease Details</Text>
            <Text style={styles.cardText}>
              <Text style={styles.label}>Lease Start: </Text>
              {currentRental.leaseStart}
            </Text>
            <Text style={styles.cardText}>
              <Text style={styles.label}>Lease End: </Text>
              {currentRental.leaseEnd}
            </Text>
            <Text style={styles.cardText}>
              <Text style={styles.label}>Payment: </Text>
              {currentRental.paymentFrequency}
            </Text>
            <Text style={styles.cardText}>
              <Text style={styles.label}>Rent: </Text>₱{currentRental.rent.toLocaleString()}
            </Text>
            <Text style={styles.cardText}>
              <Text style={styles.label}>Landlord: </Text>
              {currentRental.landlordName}
            </Text>
            <Text style={styles.cardText}>
              <Text style={styles.label}>Gcash: </Text>
              {currentRental.Gcash}
            </Text>
          </BlurView>

          {/* Details & Rules Card */}
          <BlurView
            style={styles.card}
            intensity={80}
            tint={Platform.OS === "ios" ? "dark" : undefined}
            fallbackColor={Platform.OS === "android" ? "rgba(0,0,0,0.5)" : undefined}
          >
            <Text style={styles.cardTitle}>Details & Rules</Text>
            <Text style={styles.cardText}>{currentRental.details}</Text>
            <Text style={styles.cardText}>{currentRental.rules}</Text>
          </BlurView>

          {/* Action Buttons */}
          <View style={styles.buttonsWrapper}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.BUTTON_PRIMARY }]}
              onPress={() => alert("Renew clicked!")}
            >
              <Text style={styles.buttonText}>Renew</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.BUTTON_SECONDARY }]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonText}>Rate</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#080808ff" }]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Rate Modal */}
        <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Rate this Rental</Text>
              {renderStars(selectedRating, 36, true)}

              <TextInput
                placeholder="Write your feedback..."
                placeholderTextColor="#ccc"
                style={styles.input}
                value={feedbackText}
                onChangeText={setFeedbackText}
                multiline
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: COLORS.BUTTON_PRIMARY }]}
                  onPress={handleSubmitRating}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#888" }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Thank You Modal */}
        <Modal transparent visible={thankYouVisible} animationType="fade">
          <View style={styles.thankYouOverlay}>
            <Animated.View style={[styles.thankYouContent, { transform: [{ scale: thankYouAnim }] }]}>
              <BlurView
                style={styles.thankYouBlur}
                intensity={100}
                tint={Platform.OS === "ios" ? "dark" : undefined}
                fallbackColor={Platform.OS === "android" ? "rgba(0,0,0,0.7)" : undefined}
              >
                <Text style={styles.thankYouText}>Thank you for staying!</Text>
                <FontAwesome name="smile-o" size={36} color={COLORS.SECONDARY} style={{ marginTop: 10 }} />
              </BlurView>
            </Animated.View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  chatCircle: {
    position: "absolute",
    top: 25,
    right: 25,
    backgroundColor: COLORS.BUTTON_PRIMARY,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  image: { width: "100%", height: 240, borderRadius: 15, marginBottom: 20 },
  card: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: Platform.OS === "android" ? "rgba(0, 0, 0, 0.99)" : "transparent",
  },
  cardTitle: { fontSize: 20, fontWeight: "700", color: COLORS.TEXT_LIGHT, marginBottom: 10 },
  cardText: { fontSize: 16, color: COLORS.TEXT_LIGHT, lineHeight: 24 },
  label: { fontWeight: "700" },
  buttonsWrapper: { marginTop: 10 },
  button: { marginBottom: 15, paddingVertical: 14, borderRadius: 18, alignItems: "center" },
  buttonText: { fontSize: 17, fontWeight: "bold", color: COLORS.TEXT_LIGHT },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center" },
  modalContent: { width: "85%", backgroundColor: "rgba(0,0,0,0.7)", borderRadius: 20, padding: 20, alignItems: "center" },
  modalTitle: { fontSize: 20, fontWeight: "700", color: COLORS.TEXT_LIGHT, marginBottom: 15 },
  input: { backgroundColor: "rgba(255,255,255,0.1)", color: COLORS.TEXT_LIGHT, borderRadius: 12, padding: 12, fontSize: 16, marginTop: 15, marginBottom: 20, minHeight: 80, textAlignVertical: "top", width: "100%" },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  modalButton: { flex: 0.48, paddingVertical: 12, borderRadius: 15, alignItems: "center" },
  thankYouOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center" },
  thankYouContent: { borderRadius: 25, overflow: "hidden" },
  thankYouBlur: { padding: 30, alignItems: "center", borderRadius: 25 },
  thankYouText: { fontSize: 24, fontWeight: "700", color: COLORS.TEXT_LIGHT },
});
