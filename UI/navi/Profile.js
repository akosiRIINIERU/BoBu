import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const COLORS = {
  ACCENT: "#1E88E5",
  BUTTON_PRIMARY: "#1E88E5",
  BUTTON_TEXT_LIGHT: "#FFFFFF",
  BUTTON_SECONDARY: "#E0E0E0",
  BUTTON_TEXT_DARK: "#222",
  TEXT_PRIMARY: "#222",
  TEXT_SECONDARY: "#555",
};

export default function Profile({ route }) {
  const navigation = useNavigation();

  // Edit Personal Info
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("renhiel@boardbuddy.com");
  const [phone, setPhone] = useState("+63 912 345 6789");
  const [wallet, setWallet] = useState("GCash - 0912 345 6789");

  const handleSaveInfo = () => {
    if (!email.trim() || !phone.trim() || !wallet.trim()) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    setIsEditing(false);
   
  };

  // Rent info
  const [modalVisible, setModalVisible] = useState(false);
  const [payAmount, setPayAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Gcash");
  const [payName, setPayName] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const initialRent = 12500;
  const [currentRent] = useState(initialRent);
  const [remainingRent, setRemainingRent] = useState(initialRent);

  // Payment history
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    if (route.params?.isPaid) setIsPaid(route.params.isPaid);
  }, [route.params?.isPaid]);

  const handlePayment = () => {
    if (!payAmount.trim() || isNaN(payAmount)) {
      Alert.alert("Error", "Please enter a valid amount to pay");
      return;
    }
    if (!payName.trim()) {
      Alert.alert("Error", "Please enter landlord's name");
      return;
    }

    const amountPaid = parseFloat(payAmount);
    if (amountPaid > remainingRent) {
      Alert.alert(
        "Error",
        `Amount exceeds remaining rent of ₱${remainingRent.toLocaleString()}`
      );
      return;
    }

    const newRemaining = remainingRent - amountPaid;
    setRemainingRent(newRemaining);
    if (newRemaining === 0) setIsPaid(true);

    const newHistory = [
      ...paymentHistory,
      {
        id: paymentHistory.length + 1,
        date: new Date().toLocaleDateString(),
        amount: amountPaid,
        method: paymentMethod,
        landlord: payName,
      },
    ];
    setPaymentHistory(newHistory);

    setModalVisible(false);
    setPayAmount("");
    setPayName("");

    Alert.alert(
      "Payment Successful",
      `You paid ₱${amountPaid.toLocaleString()} to ${payName} via ${paymentMethod}`
    );

    navigation.navigate("CurrentRentalScreen", {
      updatedRemaining: newRemaining,
      paymentHistory: newHistory,
    });
  };

  return (
    <ImageBackground
      source={require("../../assets/bg2.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* HEADER */}
        <View style={{ alignItems: "center", paddingBottom: 20 }}>
          <Image source={require("../../assets/ako.jpg")} style={styles.avatar} />
          <Text style={styles.name}>Renhiel Maghanoy</Text>
          <Text style={styles.role}>Tenant</Text>
        </View>

        {/* PERSONAL INFO */}
        <View style={styles.infoCard}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={styles.sectionTitle}>Personal Info</Text>
            <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
              <Text style={{ color: "#FFD700", fontWeight: "700" }}>{isEditing ? "Cancel" : "Edit"}</Text>
            </TouchableOpacity>
          </View>

          {isEditing ? (
            <>
              <Text style={styles.infoTitle}>Email:</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <Text style={styles.infoTitle}>Phone:</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />

              <Text style={styles.infoTitle}>Linked Wallet / Bank:</Text>
              <TextInput
                style={styles.input}
                value={wallet}
                onChangeText={setWallet}
              />

              <TouchableOpacity style={styles.payButton} onPress={handleSaveInfo}>
                <Text style={styles.payButtonText}>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.infoTitle}>Email:</Text>
              <Text style={styles.infoValue}>{email}</Text>
              <Text style={styles.infoTitle}>Phone:</Text>
              <Text style={styles.infoValue}>{phone}</Text>
              <Text style={styles.infoTitle}>Linked Wallet / Bank:</Text>
              <Text style={styles.infoValue}>{wallet}</Text>
            </>
          )}
        </View>

        {/* RENTAL INFO */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Rental Info</Text>
          <Text style={styles.infoTitle}>Current Landlord:</Text>
          <Text style={styles.infoValue}>Marhean langTOH</Text>
          <Text style={styles.infoTitle}>Current Room:</Text>
          <Text style={styles.infoValue}>Room 505</Text>
          <Text style={styles.infoTitle}>Current Rent:</Text>
          <Text style={styles.infoValue}>₱{currentRent.toLocaleString()} / month</Text>

          <Text style={isPaid ? styles.paidText : styles.payNotice}>
            {isPaid
              ? "✅ Rent Fully Paid"
              : `💡 Remaining Rent: ₱${remainingRent.toLocaleString()}`}
          </Text>

          {!isPaid && (
            <TouchableOpacity
              style={styles.payButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.payButtonText}>Pay Rent</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.infoTitle}>Rating:</Text>
          <Text style={styles.infoValue}>⭐ 4.8 / 5</Text>
        </View>

        {/* PAYMENT HISTORY */}
        <View style={[styles.infoCard, { maxHeight: 200 }]}>
          <Text style={styles.sectionTitle}>Payment History</Text>
          <ScrollView>
            {paymentHistory.length === 0 ? (
              <Text style={styles.historyText}>No payments made yet.</Text>
            ) : (
              paymentHistory.map((item) => (
                <Text key={item.id} style={styles.historyText}>
                  {item.date}: ₱{item.amount.toLocaleString()} via {item.method} to {item.landlord}
                </Text>
              ))
            )}
          </ScrollView>
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity
          style={[styles.logoutButton, { alignSelf: "center", marginTop: 10 }]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* PAYMENT MODAL */}
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Pay Rent</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={payAmount}
                onChangeText={setPayAmount}
              />

              <View style={{ flexDirection: "row", marginBottom: 15 }}>
                {["Gcash", "Bank"].map((method) => (
                  <TouchableOpacity
                    key={method}
                    style={{
                      flex: 1,
                      padding: 12,
                      marginHorizontal: 5,
                      borderRadius: 10,
                      backgroundColor:
                        paymentMethod === method ? COLORS.BUTTON_PRIMARY : COLORS.BUTTON_SECONDARY,
                      alignItems: "center",
                    }}
                    onPress={() => setPaymentMethod(method)}
                  >
                    <Text
                      style={{
                        color: paymentMethod === method ? COLORS.BUTTON_TEXT_LIGHT : COLORS.BUTTON_TEXT_DARK,
                        fontWeight: "700",
                      }}
                    >
                      {method}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                style={styles.input}
                placeholder="Landlord's Name"
                value={payName}
                onChangeText={setPayName}
              />

              <TouchableOpacity style={styles.modalButton} onPress={handlePayment}>
                <Text style={styles.modalButtonText}>Send Payment</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: "#000" }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  avatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: "#E6E6E6", marginBottom: 15, marginTop: 20 },
  name: { fontSize: 24, color: "#fff", fontWeight: "bold" },
  role: { fontSize: 16, color: "#f0f0f0", marginBottom: 20 },
  infoCard: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 10 },
  infoTitle: { color: "#ccc", fontSize: 14, marginTop: 10 },
  infoValue: { color: "#fff", fontSize: 16, fontWeight: "500" },
  payNotice: { color: "#FFD700", fontSize: 14, marginTop: 5, fontStyle: "italic" },
  paidText: { color: "#2ed573", fontSize: 16, marginTop: 5, fontWeight: "700" },
  payButton: { backgroundColor: "#FFD700", borderRadius: 20, paddingVertical: 12, paddingHorizontal: 30, marginTop: 10, alignItems: "center" },
  payButtonText: { color: "#1d1d82", fontWeight: "700" },
  logoutButton: { backgroundColor: "#fff", borderRadius: 20, paddingVertical: 12, paddingHorizontal: 30, marginTop: 10, alignItems: "center" },
  logoutText: { color: "#1d1d82", fontWeight: "700" },
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)", padding: 20 },
  modalContainer: { width: "85%", backgroundColor: "#fff", borderRadius: 20, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: "700", marginBottom: 15, color: "#1d1d82", textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 12, padding: 12, marginBottom: 15, color: "#fffafaff" },
  modalButton: { backgroundColor: "#1d1d82", paddingVertical: 12, borderRadius: 12, marginBottom: 10, alignItems: "center" },
  cancelButton: { backgroundColor: "#ccc" },
  modalButtonText: { color: "#fff", fontWeight: "700" },
  historyText: { fontSize: 14, color: "#fff", marginBottom: 5 },
});
