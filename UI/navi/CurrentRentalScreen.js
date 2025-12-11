import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const COLORS = {
  ACCENT: "#1E88E5",
  TEXT_PRIMARY: "#222",
  TEXT_SECONDARY: "#555",
  CARD_BG: "rgba(255,255,255,0.92)",
  BORDER: "#DADADA",
  BUTTON_PRIMARY: "#1E88E5",
  BUTTON_SECONDARY: "#E0E0E0",
  BUTTON_TEXT_LIGHT: "#fff",
  BUTTON_TEXT_DARK: "#222",
  BUTTON_THIRD: "#ffee00ff",
};

const PLACEHOLDER_IMAGE = require("../../assets/listing1.jpeg");
const BG_IMAGE = require("../../assets/bg2.jpg");

export default function CurrentRentalScreen({ route, navigation }) {
  const initialRental = {
    id: "1",
    rent: 12500,
    details:
      "Private room with shared bathroom. Free Wi-Fi, clean linens included.",
    rules: "No pets, No smoking.",
    leaseStart: "2025-11-01",
    leaseEnd: "2026-10-31",
    paymentFrequency: "Monthly",
    images: [PLACEHOLDER_IMAGE],
    landlord: "Juan Luna",
    landlordContact: "0917 123 4567",
    location: "Brgy. San Vicente, Lapasan.",
    gcash: "09171234567",
    bank: "1234-5678-9012-3456",
  };

  const [currentRental, setCurrentRental] = useState(initialRental);
  const [remainingRent, setRemainingRent] = useState(initialRental.rent);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const [renewVisible, setRenewVisible] = useState(false);
  const [acceptedContract, setAcceptedContract] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [renewDuration, setRenewDuration] = useState("1");
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [summaryData, setSummaryData] = useState({});

  // New state for Rating modal
  const [ratingVisible, setRatingVisible] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    if (route.params?.updatedRemaining !== undefined) {
      setRemainingRent(route.params.updatedRemaining);
    }
    if (route.params?.paymentHistory) {
      setPaymentHistory(route.params.paymentHistory);
    }
  }, [route.params]);

  const calculateNewLeaseEnd = (startDate, monthsToAdd) => {
    const start = new Date(startDate);
    start.setMonth(start.getMonth() + monthsToAdd);
    const yyyy = start.getFullYear();
    const mm = String(start.getMonth() + 1).padStart(2, "0");
    const dd = String(start.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleRenewLease = () => {
    if (!paymentMethod) return alert("Select payment method");

    const months = parseInt(renewDuration);
    const newEndDate = calculateNewLeaseEnd(currentRental.leaseEnd, months);
    const total = currentRental.rent * months + currentRental.rent * 2;

    setSummaryData({
      months,
      rent: currentRental.rent,
      deposit: currentRental.rent * 2,
      total,
      paymentMethod,
      newEndDate,
    });

    setCurrentRental((prev) => ({
      ...prev,
      leaseEnd: newEndDate,
    }));

    setRenewVisible(false);
    setAcceptedContract(false);
    setShowPayment(false);
    setPaymentMethod("");
    setSummaryVisible(true);
  };

  // Inside your rating modal submission handler:
const handleSubmitRating = () => {
  if (starRating === 0) {
    Alert.alert("Rating Required", "Please select a star rating before submitting.");
    return;
  }

  // Navigate back to Dashboard and pass rating info
  navigation.navigate("Dashboard", {
    newRating: starRating,
    feedback: reviewText,
    rentalId: currentRental.id, // Make sure this matches Dashboard's rental id
  });

  // Show a professional alert
  Alert.alert(
    "Thank You!",
    "Your rating has been submitted successfully.",
    [
      {
        text: "OK",
        onPress: () => {
          setRatingVisible(false);
          setStarRating(0);
          setReviewText("");
        },
      },
    ],
    { cancelable: false }
  );
};

  return (
    <ImageBackground source={BG_IMAGE} style={{ flex: 1 }} blurRadius={1}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 70 }}>
          <Image source={currentRental.images[0]} style={styles.propertyImage} />
          

          {/* LANDLORD INFO */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Landlord & Location</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Landlord:</Text>
              <Text style={styles.accent}>{currentRental.landlord}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Contact:</Text>
              <Text style={styles.text}>{currentRental.landlordContact}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Location:</Text>
              <Text style={styles.text}>{currentRental.location}</Text>
            </View>
          </View>

          {/* LEASE INFO */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Lease Information</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Rent:</Text>
              <Text style={styles.text}>₱{currentRental.rent.toLocaleString()}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Lease Start:</Text>
              <Text style={styles.text}>{currentRental.leaseStart}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Lease End:</Text>
              <Text style={styles.text}>{currentRental.leaseEnd}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Remaining Rent:</Text>
              <Text style={{ fontWeight: "700", color: COLORS.ACCENT }}>
                ₱{remainingRent.toLocaleString()}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Payment:</Text>
              <Text style={styles.text}>{currentRental.paymentFrequency}</Text>
            </View>
          </View>

          {/* PROPERTY DETAILS */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Property Details</Text>
            <Text style={styles.description}>{currentRental.details}</Text>
            <Text style={[styles.cardTitle, { marginTop: 15 }]}>Rules</Text>
            <Text style={styles.description}>{currentRental.rules}</Text>
          </View>

          {/* PAYMENT HISTORY */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Payment History</Text>
            {paymentHistory.length === 0 ? (
              <Text>No payments yet</Text>
            ) : (
              paymentHistory.map((p, index) => (
                <View key={index} style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 4 }}>
                  <Text>{p.date}</Text>
                  <Text>₱{p.amount.toLocaleString()} via {p.method}</Text>
                </View>
              ))
            )}
          </View>

          {/* BUTTONS */}
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => setRenewVisible(true)}
            >
              <Text style={styles.primaryButtonText}>Renew Lease</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setRatingVisible(true)}
            >
              <Text style={styles.secondaryButtonText}>Rate Stay</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.secondaryButtonText}>Close</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>

        {/* RENEW MODAL */}
        <Modal transparent visible={renewVisible} animationType="fade">
          <View style={styles.renewOverlay}>
            <View style={styles.renewBox}>
              <Text style={styles.modalTitle}>Renew Lease</Text>
              <Text style={{ fontWeight: "600", marginBottom: 6 }}>Current Rent:</Text>
              <Text style={{ marginBottom: 12 }}>₱{currentRental.rent.toLocaleString()} / month</Text>

              <TouchableOpacity
                style={styles.contractRow}
                onPress={() => {
                  setAcceptedContract(!acceptedContract);
                  setShowPayment(!acceptedContract);
                  setPaymentMethod("");
                }}
              >
                <View
                  style={[styles.checkbox, acceptedContract && { backgroundColor: COLORS.BUTTON_PRIMARY }]}
                >
                  {acceptedContract && <FontAwesome name="check" size={16} color="#fff" />}
                </View>
                <Text style={{ marginLeft: 10 }}>I have read and accept the contract terms</Text>
              </TouchableOpacity>

              {showPayment && (
                <>
                  <Text style={{ fontWeight: "600", marginBottom: 6 }}>Months to Renew:</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={renewDuration}
                      onValueChange={(itemValue) => setRenewDuration(itemValue)}
                    >
                      {[1, 2, 3, 6, 12].map((months) => (
                        <Picker.Item key={months} label={`${months} month(s)`} value={String(months)} />
                      ))}
                    </Picker>
                  </View>

                  <Text style={{ fontWeight: "600", marginBottom: 6 }}>Payment Method:</Text>
                  <View style={{ flexDirection: "row", marginBottom: 15 }}>
                    {["Gcash", "Bank"].map((method) => (
                      <TouchableOpacity
                        key={method}
                        onPress={() => setPaymentMethod(method)}
                        style={{
                          flex: 1,
                          padding: 10,
                          marginHorizontal: 5,
                          borderRadius: 10,
                          backgroundColor: paymentMethod === method ? COLORS.BUTTON_PRIMARY : COLORS.BUTTON_SECONDARY,
                          alignItems: "center",
                        }}
                      >
                        <Text style={{
                          color: paymentMethod === method ? COLORS.BUTTON_TEXT_LIGHT : COLORS.BUTTON_TEXT_DARK,
                          fontWeight: "700"
                        }}>{method}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {paymentMethod && (
                    <View style={{ width: "100%", marginBottom: 15 }}>
                      <Text style={{ fontWeight: "600" }}>Send Payment To:</Text>
                      <Text style={{ marginTop: 4 }}>{paymentMethod === "Gcash" ? currentRental.gcash : currentRental.bank}</Text>
                    </View>
                  )}
                </>
              )}

              <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 10 }}>
                <TouchableOpacity
                  style={{ backgroundColor: COLORS.BUTTON_PRIMARY, paddingVertical: 13, borderRadius: 12, width: "48%", alignItems: "center" }}
                  onPress={handleRenewLease}
                >
                  <Text style={{ color: COLORS.BUTTON_TEXT_LIGHT, fontWeight: "700" }}>Send Payment</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ backgroundColor: COLORS.BUTTON_SECONDARY, paddingVertical: 13, borderRadius: 12, width: "48%", alignItems: "center" }}
                  onPress={() => setRenewVisible(false)}
                >
                  <Text style={{ color: COLORS.BUTTON_TEXT_DARK, fontWeight: "700" }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* SUMMARY MODAL */}
        <Modal transparent visible={summaryVisible} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={[styles.renewBox, { padding: 20 }]}>
              <Text style={styles.modalTitle}>Lease Renewal Summary</Text>
              {Object.entries(summaryData).map(([key, value]) => (
                <View style={styles.summaryRow} key={key}>
                  <Text style={{ fontWeight: "600", textTransform: "capitalize" }}>
                    {key.replace(/([A-Z])/g, " $1")}:
                  </Text>
                  <Text>
                    {["rent", "deposit", "total"].includes(key) ? `₱${value.toLocaleString()}` : value}
                  </Text>
                </View>
              ))}
              <TouchableOpacity
                style={[styles.modalPrimary, { marginTop: 20, width: "100%" }]}
                onPress={() => setSummaryVisible(false)}
              >
                <Text style={styles.primaryButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* RATING MODAL */}
        <Modal transparent visible={ratingVisible} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={[styles.renewBox, { padding: 20 }]}>
              <Text style={styles.modalTitle}>Rate Your Stay</Text>

              <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 15 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setStarRating(star)}>
                    <FontAwesome
                      name={star <= starRating ? "star" : "star-o"}
                      size={30}
                      color={COLORS.BUTTON_THIRD}
                      style={{ marginHorizontal: 5 }}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                style={styles.input}
                placeholder="Write a review (optional)"
                multiline
                value={reviewText}
                onChangeText={setReviewText}
              />

              <TouchableOpacity
                style={[styles.modalPrimary, { marginTop: 15, width: "100%" }]}
                onPress={handleSubmitRating}
              >
                <Text style={styles.primaryButtonText}>Submit Rating</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalCancel, { marginTop: 10, width: "100%" }]}
                onPress={() => setRatingVisible(false)}
              >
                <Text style={{ fontWeight: "700" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </ImageBackground>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  propertyImage: { width: "100%", height: 240, borderRadius: 16, marginBottom: 15 },
  propertyName: { fontSize: 26, fontWeight: "700", color: COLORS.TEXT_PRIMARY, marginBottom: 15 },
  card: { backgroundColor: COLORS.CARD_BG, borderRadius: 16, padding: 18, marginBottom: 20, borderWidth: 1, borderColor: COLORS.BORDER },
  cardTitle: { fontSize: 18, fontWeight: "700", color: COLORS.TEXT_PRIMARY, marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  label: { color: COLORS.TEXT_SECONDARY, fontSize: 15 },
  text: { color: COLORS.TEXT_PRIMARY, fontSize: 15 },
  accent: { color: COLORS.ACCENT, fontSize: 15, fontWeight: "700" },
  description: { fontSize: 15, color: COLORS.TEXT_PRIMARY },
  primaryButton: { backgroundColor: COLORS.BUTTON_PRIMARY, paddingVertical: 15, borderRadius: 14, alignItems: "center", marginBottom: 12 },
  primaryButtonText: { color: COLORS.BUTTON_TEXT_LIGHT, fontWeight: "700", fontSize: 16 },
  secondaryButton: { backgroundColor: COLORS.BUTTON_THIRD, paddingVertical: 15, borderRadius: 14, alignItems: "center", marginBottom: 12 },
  secondaryButtonText: { color: COLORS.BUTTON_TEXT_DARK, fontWeight: "700", fontSize: 16 },
  closeButton: { backgroundColor: COLORS.BUTTON_SECONDARY, paddingVertical: 15, borderRadius: 14, alignItems: "center", marginBottom: 12 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "center", alignItems: "center" },
  modalTitle: { fontSize: 20, fontWeight: "700", color: COLORS.TEXT_PRIMARY, textAlign: "center", marginBottom: 15 },
  modalPrimary: { backgroundColor: COLORS.BUTTON_PRIMARY, paddingVertical: 13, borderRadius: 12, width: "48%", alignItems: "center" },
  modalCancel: { backgroundColor: COLORS.BUTTON_SECONDARY, paddingVertical: 13, borderRadius: 12, width: "48%", alignItems: "center", marginBottom: 0 },
  renewOverlay: { flex:1, backgroundColor:"#00000073", justifyContent:"center", alignItems:"center" },
  renewBox: { width:"85%", backgroundColor:"#fff", borderRadius:18, padding:22, borderWidth:1, borderColor:COLORS.BORDER, alignItems:"center" },
  pickerContainer: { backgroundColor:"#f5f5f5", borderRadius:12, borderWidth:1, borderColor:COLORS.BORDER, marginBottom:12, width:"100%" },
  contractRow: { flexDirection:"row", alignItems:"center", marginBottom:20, width:"100%" },
  checkbox: { width:24, height:24, borderWidth:1, borderColor:COLORS.BORDER, borderRadius:6, justifyContent:"center", alignItems:"center", backgroundColor:"#fff" },
  summaryRow: { flexDirection:"row", justifyContent:"space-between", marginVertical:6, width:"100%" },
  input: { width: "100%", borderWidth: 1, borderColor: COLORS.BORDER, borderRadius: 12, padding: 10, minHeight: 80, textAlignVertical: "top" },
});
