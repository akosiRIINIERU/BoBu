import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const BG_IMAGE = require("../../assets/bg2.jpg");

const COLORS = {
  TEXT_LIGHT: "#FFFFFF",
  SECONDARY: "#FFD700",
  CARD_BG: "rgba(0,0,0,0.7)",
  BUTTON_PRIMARY: "#1d1d82",
  BUTTON_CHAT: "#32CD32",
  INPUT_BG: "rgba(255,255,255,0.15)",
  POPUP_BG: "rgba(0,0,0,0.9)",
};

export default function PlaceDetails({ route }) {
  const { place } = route.params;
  const navigation = useNavigation();

  // Rent popup states
  const [showRentPopup, setShowRentPopup] = useState(false);
  const [renterName, setRenterName] = useState("");
  const [duration, setDuration] = useState("");
  const [rentStatus, setRentStatus] = useState("Rent Now"); // Rent Now or Rent Request Sent

  // Chat states
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const flatListRef = useRef(null);

  // Premium Payment Modal state
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Quick message presets
  const quickQueries = [
    "Is this still available?",
    "Can I schedule a visit?",
    "What are the requirements?",
    "Is the price negotiable?",
    "When is the earliest move-in date?",
  ];

  // Default reviews
  const reviews = place.reviews || [
    { id: "1", tenant: "Juan Dela Cruz", rating: 5, text: "Very clean and cozy place!" },
    { id: "2", tenant: "Maria Santos", rating: 4.5, text: "Good location, friendly landlord." },
    { id: "3", tenant: "Pedro Reyes", rating: 4, text: "Affordable and safe." },
  ];

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

  const getCurrentTime = () => {
    const timestamp = new Date();
    const hours = timestamp.getHours() % 12 || 12;
    const minutes = timestamp.getMinutes().toString().padStart(2, "0");
    const ampm = timestamp.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleRentRequest = () => {
    if (!renterName || !duration) {
      alert("Please fill all fields");
      return;
    }

    setShowRentPopup(false);
    setRenterName("");
    setDuration("");
    setRentStatus("Rent Request Sent");

    const systemMessage = {
      id: Date.now().toString(),
      sender: "System",
      text: `Rent request for ${place.name} has been sent!`,
      system: true,
      time: getCurrentTime(),
    };
    setMessages((prev) => [...prev, systemMessage]);
    if (!showChat) setShowChat(true);
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const handleChat = () => setShowChat(true);

  const autoReply = () => {
    setTyping(true);
    setTimeout(() => {
      const replies = [
        "Hello! Thank you for your interest.",
        "Please provide your move-in date.",
        "Currently unavailable, will reply soon.",
        "Sure! Let me check that for you.",
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: place.landlordName, text: reply, time: getCurrentTime() },
      ]);
      setTyping(false);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1200);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { id: Date.now().toString(), sender: "You", text: input, time: getCurrentTime() };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    autoReply();
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const sendQuickMessage = (text) => {
    const newMessage = { id: Date.now().toString(), sender: "You", text, time: getCurrentTime() };
    setMessages((prev) => [...prev, newMessage]);
    autoReply();
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderMessage = ({ item }) => {
    if (item.system)
      return (
        <View style={styles.systemMessage}>
          <Text style={styles.systemText}>{item.text}</Text>
          {item.time && <Text style={styles.systemTime}>{item.time}</Text>}
        </View>
      );

    return (
      <TouchableOpacity
        onPress={() => item.sender !== "You" && setMessages((prev) => prev.filter((m) => m.id !== item.id))}
        style={[styles.messageBubble, item.sender === "You" ? styles.sent : styles.received]}
      >
        <Text style={[styles.messageText, { color: item.sender === "You" ? "#fff" : "#000" }]}>{item.text}</Text>
        {item.time && (
          <Text style={[styles.messageTime, { color: item.sender === "You" ? "#fffcc0" : "#555" }]}>{item.time}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const handlePremiumPayment = () => {
    if (!cardName || !cardNumber || !expiry || !cvv) {
      alert("Please fill all payment details");
      return;
    }

    alert("Payment successful! Premium features unlocked.");
    setShowPremiumModal(false);
    setCardName(""); setCardNumber(""); setExpiry(""); setCvv("");
  };

  return (
    <ImageBackground source={BG_IMAGE} style={styles.background}>
      <View style={styles.overlay} />
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <Image source={place.images[0]} style={styles.image} />
        <View style={styles.detailsCard}>
          <Text style={styles.name}>{place.name}</Text>
          {renderStars(place.rating || 4, 18)}
          <Text style={styles.rent}>₱{place.rent.toLocaleString()}</Text>
          {place.type && <Text style={styles.subInfo}>{place.type} • {place.location}</Text>}
          <Text style={styles.details}>{place.details}</Text>
          <Text style={styles.subTitle}>Amenities:</Text>
          <Text style={styles.amenities}>{place.amenities.join(", ")}</Text>
          <Text style={styles.subTitle}>Rules:</Text>
          <Text style={styles.details}>{place.rules}</Text>
        </View>

        <View style={styles.reviewContainer}>
          <Text style={styles.subTitle}>Recent Reviews:</Text>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.tenantName}>{review.tenant}</Text>
                {renderStars(review.rating, 14)}
              </View>
              <Text style={styles.reviewText}>{review.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom buttons */}
      {!showChat && (
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
            <FontAwesome name="comments" size={18} color="#fff" style={{ marginRight: 5 }} />
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.rentButton, rentStatus === "Rent Request Sent" && { backgroundColor: "gray" }]}
            onPress={() => {
              if (rentStatus === "Rent Now") {
                setShowRentPopup(true);
              } else {
                navigation.navigate("Notifications", {
                  message: `Your rent request for ${place.name} has been sent!`,
                });
              }
            }}
          >
            <FontAwesome name="money" size={18} color="#fff" style={{ marginRight: 5 }} />
            <Text style={styles.buttonText}>{rentStatus}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Rent Popup */}
      {showRentPopup && (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.rentPopup}>
          <View style={styles.popupCardEnhanced}>
            <Text style={[styles.subTitle, { marginBottom: 15 }]}>Rent This Place</Text>
            <TextInput
              placeholder="Your Name"
              placeholderTextColor="#ccc"
              style={styles.inputEnhanced}
              value={renterName}
              onChangeText={setRenterName}
            />
            <TextInput
              placeholder="Duration (e.g., 3 months)"
              placeholderTextColor="#ccc"
              style={styles.inputEnhanced}
              value={duration}
              onChangeText={setDuration}
            />
            <TouchableOpacity style={styles.confirmRentButtonEnhanced} onPress={handleRentRequest}>
              <Text style={styles.buttonText}>Send Rent Request</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowRentPopup(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}

      {/* Chat Overlay */}
      {showChat && (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.chatOverlay}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatHeaderText}>{place.landlordName}</Text>
            <TouchableOpacity onPress={() => setShowChat(false)}>
              <Text style={styles.chatClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.chatList}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />

          {typing && (
            <View style={styles.typingIndicator}>
              <Text style={{ color: "#fff", fontStyle: "italic" }}>{place.landlordName} is typing...</Text>
            </View>
          )}

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickQueryBar} contentContainerStyle={{ paddingHorizontal: 10 }}>
            {quickQueries.map((query, index) => (
              <TouchableOpacity key={index} style={styles.quickQueryButton} onPress={() => sendQuickMessage(query)}>
                <Text style={styles.quickQueryText}>{query}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.chatInputRow}>
            {/* Chat input */}
            
        {/*  <TextInput
              placeholder="Type a message..."
              placeholderTextColor="#ccc"
              style={styles.chatInput}
              value={input}
              onChangeText={setInput}
            />*/}

            {/* Premium Feature Banner */}
            <View style={styles.premiumBanner}>
              <Text style={styles.premiumTitle}>Unlock Premium Features</Text>
              <Text style={styles.premiumSubtitle}>
                Access priority landlord responses, early notifications, and exclusive listings!
              </Text>
              <TouchableOpacity
                style={styles.premiumButton}
                onPress={() => setShowPremiumModal(true)}
              >
                <Text style={styles.premiumButtonText}>Upgrade Now</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.chatSendButton} onPress={sendMessage}>
              <FontAwesome name="paper-plane" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}

      {/* Premium Payment Modal */}
      {showPremiumModal && (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.rentPopup}>
          <View style={styles.popupCardEnhanced}>
            <Text style={[styles.subTitle, { marginBottom: 15 }]}>Premium Payment</Text>
            <TextInput
              placeholder="Cardholder Name"
              placeholderTextColor="#ccc"
              style={styles.inputEnhanced}
              value={cardName}
              onChangeText={setCardName}
            />
            <TextInput
              placeholder="Card Number"
              placeholderTextColor="#ccc"
              style={styles.inputEnhanced}
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={setCardNumber}
            />
            <TextInput
              placeholder="Expiry (MM/YY)"
              placeholderTextColor="#ccc"
              style={styles.inputEnhanced}
              value={expiry}
              onChangeText={setExpiry}
            />
            <TextInput
              placeholder="CVV"
              placeholderTextColor="#ccc"
              style={styles.inputEnhanced}
              keyboardType="numeric"
              secureTextEntry
              value={cvv}
              onChangeText={setCvv}
            />

            <TouchableOpacity style={styles.confirmRentButtonEnhanced} onPress={handlePremiumPayment}>
              <Text style={styles.buttonText}>Pay & Unlock</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowPremiumModal(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.5)" },
  container: { paddingBottom: 100 },
  image: { width: "100%", height: 250 },
  detailsCard: { padding: 20, backgroundColor: COLORS.CARD_BG, margin: 15, borderRadius: 15 },
  name: { color: COLORS.TEXT_LIGHT, fontSize: 26, fontWeight: "bold", marginBottom: 5 },
  rent: { color: COLORS.TEXT_LIGHT, fontSize: 20, marginBottom: 5, fontWeight: "bold" },
  subInfo: { color: "#ccc", fontSize: 14, marginBottom: 10 },
  details: { color: COLORS.TEXT_LIGHT, fontSize: 16, marginBottom: 10 },
  subTitle: { color: COLORS.TEXT_LIGHT, fontSize: 18, fontWeight: "bold", marginTop: 15 },
  amenities: { color: COLORS.SECONDARY, fontSize: 16, marginBottom: 10 },
  reviewContainer: { padding: 20, backgroundColor: COLORS.CARD_BG, marginHorizontal: 15, marginBottom: 20, borderRadius: 15 },
  reviewCard: { backgroundColor: "rgba(255,255,255,0.1)", padding: 15, borderRadius: 12, marginVertical: 8 },
  reviewHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 },
  tenantName: { color: COLORS.TEXT_LIGHT, fontWeight: "bold", fontSize: 14 },
  reviewText: { color: COLORS.TEXT_LIGHT, fontSize: 14 },
  closeButton: { position: "absolute", top: 40, right: 20, zIndex: 10, backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 20, width: 40, height: 40, justifyContent: "center", alignItems: "center" },
  closeText: { color: COLORS.TEXT_LIGHT, fontSize: 24, fontWeight: "bold" },
  bottomButtons: { position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", justifyContent: "space-around", paddingVertical: 15, backgroundColor: "rgba(0,0,0,0.8)" },
  chatButton: { flex: 1, flexDirection: "row", backgroundColor: COLORS.BUTTON_CHAT, padding: 15, borderRadius: 10, marginRight: 10, justifyContent: "center", alignItems: "center" },
  rentButton: { flex: 1, flexDirection: "row", backgroundColor: COLORS.BUTTON_PRIMARY, padding: 15, borderRadius: 10, marginLeft: 10, justifyContent: "center", alignItems: "center" },
  buttonText: { color: COLORS.TEXT_LIGHT, fontWeight: "bold", fontSize: 16 },
  rentPopup: { ...StyleSheet.absoluteFillObject, backgroundColor: COLORS.POPUP_BG, justifyContent: "center", alignItems: "center", zIndex: 20, flex: 1 },
  popupCardEnhanced: { width: "90%", backgroundColor: "#1C1C1C", borderRadius: 20, padding: 25, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 10 },
  inputEnhanced: { backgroundColor: "rgba(255,255,255,0.1)", padding: 14, borderRadius: 15, color: "#fff", marginBottom: 15, fontSize: 16 },
  confirmRentButtonEnhanced: { backgroundColor: COLORS.BUTTON_PRIMARY, padding: 16, borderRadius: 15, alignItems: "center", marginBottom: 10 },
  cancelButton: { backgroundColor: "#FF6347", padding: 12, borderRadius: 10, alignItems: "center" },
  chatOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.95)", zIndex: 20, paddingTop: Platform.OS === "ios" ? 50 : 30, flex: 1 },
  chatHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#444" },
  chatHeaderText: { fontSize: 20, fontWeight: "bold", color: COLORS.SECONDARY },
  chatClose: { fontSize: 24, color: "#fff" },
  chatList: { paddingHorizontal: 15, paddingBottom: 10 },
  quickQueryBar: { maxHeight: 50, backgroundColor: "rgba(255,255,255,0.05)", paddingVertical: 8 },
  quickQueryButton: { backgroundColor: "rgba(255,255,255,0.15)", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" },
  quickQueryText: { color: "#fff", fontSize: 14 },
  messageBubble: { maxWidth: "75%", padding: 12, borderRadius: 20, marginVertical: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, elevation: 2 },
  sent: { alignSelf: "flex-end", backgroundColor: COLORS.BUTTON_PRIMARY, borderTopRightRadius: 0 },
  received: { alignSelf: "flex-start", backgroundColor: "#f5f2f2d5", borderTopLeftRadius: 0 },
  messageText: { fontSize: 16, lineHeight: 20 },
  messageTime: { fontSize: 10, marginTop: 3, alignSelf: "flex-end" },
  systemMessage: { alignSelf: "center", backgroundColor: "rgba(112, 110, 110, 0.2)", padding: 10, borderRadius: 15, marginVertical: 5 },
  systemText: { color: "#f8f8f8ff", fontStyle: "italic", fontSize: 16 },
  systemTime: { fontSize: 10, color: "#ccc", marginTop: 3, textAlign: "center" },
  chatInputRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 15, paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#444", backgroundColor: "rgba(0,0,0,0.9)" },
  chatInput: { flex: 1, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 25, paddingHorizontal: 15, height: 45, color: "#fff", fontSize: 16 },
  chatSendButton: { marginLeft: 10, backgroundColor: COLORS.BUTTON_PRIMARY, padding: 10, borderRadius: 25 },
  typingIndicator: { paddingHorizontal: 15, paddingVertical: 5 },
  premiumBanner: {
  backgroundColor: "#FFD700",
  borderRadius: 15,
  padding: 15,
  margin: 15,
  alignItems: "center",
},
premiumTitle: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#1d1d82",
  marginBottom: 5,
},
premiumSubtitle: {
  fontSize: 14,
  color: "#1d1d82",
  textAlign: "center",
  marginBottom: 10,
},
premiumButton: {
  backgroundColor: "#1d1d82",
  paddingVertical: 10,
  paddingHorizontal: 25,
  borderRadius: 12,
},
premiumButtonText: {
  color: "#FFD700",
  fontWeight: "bold",
  fontSize: 16,
},

});
