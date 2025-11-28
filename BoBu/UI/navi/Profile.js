import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  ImageBackground,
} from "react-native";

export default function Profile({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [payAmount, setPayAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Gcash");
  const [payName, setName] = useState("");
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (route.params?.isPaid) setIsPaid(route.params.isPaid);
  }, [route.params?.isPaid]);

  const handlePayment = () => {
    if (!payAmount.trim()) {
      Alert.alert("Error", "Please enter an amount to pay");
      return;
    }
    if (!payName.trim()) {
      Alert.alert("Error", "Please enter your landlord's name");
      return;
    }
    setIsPaid(true);
    setModalVisible(false);
    navigation.navigate("Notifications", { isPaid: true });
    Alert.alert(
      "Payment Successful",
      `You paid ₱${payAmount} to ${payName} via ${paymentMethod}`
    );
    setPayAmount("");
  };

  return (
    <ImageBackground
      source={require("../../assets/bg2.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Image source={require("../../assets/ako.jpg")} style={styles.avatar} />
        <Text style={styles.name}>Renhiel Maghanoy</Text>
        <Text style={styles.role}>Tenant</Text>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Personal Info</Text>
          <Text style={styles.infoTitle}>Email:</Text>
          <Text style={styles.infoValue}>renhiel@boardbuddy.com</Text>
          <Text style={styles.infoTitle}>Phone:</Text>
          <Text style={styles.infoValue}>+63 912 345 6789</Text>
          <Text style={styles.infoTitle}>Linked Wallet / Bank:</Text>
          <Text style={styles.infoValue}>GCash - 0912 345 6789</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Rental Info</Text>
          <Text style={styles.infoTitle}>Current Landlord:</Text>
          <Text style={styles.infoValue}>Marhean langTOH</Text>
          <Text style={styles.infoTitle}>Current Room:</Text>
          <Text style={styles.infoValue}>Room 505</Text>
          <Text style={styles.infoTitle}>Current Rent:</Text>
          <Text style={styles.infoValue}>₱12,500 / month</Text>

          <Text style={isPaid ? styles.paidText : styles.payNotice}>
            {isPaid
              ? "✅ Rent Paid"
              : "💡 Pay notice: Rent due by November 15, 2025"}
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

        <TouchableOpacity
          style={styles.logoutButton}
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

              <TextInput
                style={styles.input}
                placeholder="Payment Method (e.g., GCash, Bank)"
                value={paymentMethod}
                onChangeText={setPaymentMethod}
              />

              <TextInput
                style={styles.input}
                placeholder="Landlord's Name"
                value={payName}
                onChangeText={setName}
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
  container: { flex: 1, backgroundColor: "transparent" },
  contentContainer: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E6E6E6",
    marginBottom: 15,
    marginTop: 20,
  },
  name: { fontSize: 24, color: "#fff", fontWeight: "bold" },
  role: { fontSize: 16, color: "#f0f0f0", marginBottom: 20 },
  infoCard: {
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 10 },
  infoTitle: { color: "#ccc", fontSize: 14, marginTop: 10 },
  infoValue: { color: "#fff", fontSize: 16, fontWeight: "500" },
  payNotice: { color: "#FFD700", fontSize: 14, marginTop: 5, fontStyle: "italic" },
  paidText: { color: "#2ed573", fontSize: 16, marginTop: 5, fontWeight: "700" },
  payButton: {
    backgroundColor: "#FFD700",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 10,
    alignItems: "center",
  },
  payButtonText: { color: "#1d1d82", fontWeight: "700" },
  logoutButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 10,
    alignItems: "center",
  },
  logoutText: { color: "#1d1d82", fontWeight: "700" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: "700", marginBottom: 15, color: "#1d1d82", textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: "#1d1d82",
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  cancelButton: { backgroundColor: "#ccc" },
  modalButtonText: { color: "#fff", fontWeight: "700" },
});
