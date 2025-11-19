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
  BUTTON_PRIMARY: "#1E90FF",
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

  // Chat states
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const flatListRef = useRef(null);

  // Default reviews
  const reviews = place.reviews || [
    { id: "1", tenant: "Juan Dela Cruz", rating: 5, text: "Very clean and cozy place!" },
    { id: "2", tenant: "Maria Santos", rating: 4.5, text: "Good location, friendly landlord." },
    { id: "3", tenant: "Pedro Reyes", rating: 4, text: "Affordable and safe." },
  ];

  // Render stars helper
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

  // Handle rent confirm
  const handleRentNow = () => {
    if (!renterName || !duration) {
      alert("Please fill all fields");
      return;
    }
    alert(`Rent confirmed for ${renterName} for ${duration}`);
    setRenterName("");
    setDuration("");
    setShowRentPopup(false);
  };

  // Handle chat open
  const handleChat = () => {
    setShowChat(true);
    setMessages([{ id: "0", sender: "You", text: `Hi ${place.landlordName}, I'm interested in renting ${place.name}.` }]);
  };

  // Send chat message
  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { id: Date.now().toString(), sender: "You", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Auto-reply simulation
    setTimeout(() => {
      const replies = [
        "Hello! Thank you for your interest.",
        "Please provide your move-in date.",
        "Currently unavailable, will reply soon.",
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), sender: place.landlordName, text: reply }]);
    }, 1000);

    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderMessage = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        if (item.sender === "You") return; // Don't remove tenant's own message
        setMessages((prev) => prev.filter((m) => m.id !== item.id)); // Remove landlord's message on click
      }}
      style={[
        styles.messageBubble,
        item.sender === "You" ? styles.sent : styles.received,
      ]}
    >
      <Text style={[styles.messageText, { color: item.sender === "You" ? "#fff" : "#000" }]}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={BG_IMAGE} style={styles.background}>
      <View style={styles.overlay} />
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <Image source={place.images[0]} style={styles.image} />

        {/* Place Details */}
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

        {/* Reviews */}
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

      {/* Bottom Buttons */}
      {!showChat && (
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
            <FontAwesome name="comments" size={18} color="#fff" style={{ marginRight: 5 }} />
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rentButton} onPress={() => setShowRentPopup(true)}>
            <FontAwesome name="money" size={18} color="#fff" style={{ marginRight: 5 }} />
            <Text style={styles.buttonText}>Rent Now</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Rent Popup */}
      {showRentPopup && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.rentPopup}
        >
          <ScrollView contentContainerStyle={styles.popupScrollContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.popupCard}>
              <Text style={[styles.subTitle, { marginBottom: 10 }]}>Rent This Place</Text>
              <TextInput placeholder="Your Name" placeholderTextColor="#ccc" style={styles.input} value={renterName} onChangeText={setRenterName} />
              <TextInput placeholder="Duration (e.g., 3 months)" placeholderTextColor="#ccc" style={styles.input} value={duration} onChangeText={setDuration} />
              <TouchableOpacity style={styles.confirmRentButton} onPress={handleRentNow}>
                <Text style={styles.buttonText}>Confirm Rent</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowRentPopup(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}

      {/* Chat Overlay */}
      {showChat && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.chatOverlay}
        >
          {/* Chat Header */}
          <View style={styles.chatHeader}>
            <Text style={styles.chatHeaderText}>{place.landlordName}</Text>
            <TouchableOpacity onPress={() => setShowChat(false)}>
              <Text style={styles.chatClose}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Messages */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.chatList}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />

          {/* Input */}
          <View style={styles.chatInputRow}>
            <TextInput
              style={styles.chatInput}
              placeholder="Type a message..."
              placeholderTextColor="#aaa"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity style={styles.chatSendButton} onPress={sendMessage}>
              <FontAwesome name="paper-plane" size={20} color="#fff" />
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
  popupScrollContainer: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  popupCard: { width: "85%", backgroundColor: COLORS.CARD_BG, borderRadius: 15, padding: 20 },
  input: { backgroundColor: COLORS.INPUT_BG, padding: 12, borderRadius: 10, color: COLORS.TEXT_LIGHT, marginBottom: 12 },
  confirmRentButton: { backgroundColor: COLORS.BUTTON_PRIMARY, padding: 15, borderRadius: 10, alignItems: "center", marginBottom: 10 },
  cancelButton: { backgroundColor: "#FF6347", padding: 12, borderRadius: 10, alignItems: "center" },

  // Chat styles
  chatOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.95)",
    zIndex: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  chatHeaderText: { fontSize: 20, fontWeight: "bold", color: COLORS.SECONDARY },
  chatClose: { fontSize: 24, color: "#fff" },
  chatList: { paddingHorizontal: 15, paddingBottom: 10 },
  messageBubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 20,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  sent: { alignSelf: "flex-end", backgroundColor: COLORS.BUTTON_PRIMARY, borderTopRightRadius: 0 },
  received: { alignSelf: "flex-start", backgroundColor: "#E6E6E6", borderTopLeftRadius: 0 },
  messageText: { fontSize: 16, lineHeight: 20 },
  chatInputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#444",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  chatInput: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    color: "#fff",
  },
  chatSendButton: {
    backgroundColor: COLORS.BUTTON_CHAT,
    borderRadius: 25,
    padding: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
});
