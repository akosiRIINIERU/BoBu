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
  // Enhanced color palette
  TEXT_LIGHT: "#FFFFFF",
  SECONDARY: "#FFD700", // Gold/Neon accent
  CARD_BG: "rgba(0,0,0,0.85)", // Darker, less transparent card background
  BUTTON_PRIMARY: "#1d1d82",
  BUTTON_CHAT: "#32CD32", // Lime Green
  INPUT_BG: "rgba(255,255,255,0.1)", // More subtle input background
  POPUP_BG: "rgba(0,0,0,0.95)", // Almost opaque for modals
  ACCENT_DARK: "#0F0F0F",
  ACCENT_LIGHT: "#E0E0E0",
  CHAT_SENT: "#007AFF", // iOS blue for sent messages
  CHAT_RECEIVED: "#E5E5EA", // Light gray for received messages
};

export default function PlaceDetails({ route }) {
  const { place } = route.params;
  const navigation = useNavigation();

  const [showRentPopup, setShowRentPopup] = useState(false);
  const [renterName, setRenterName] = useState("");
  const [duration, setDuration] = useState("");
  const [rentStatus, setRentStatus] = useState("Rent Now");

  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const flatListRef = useRef(null);

  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Set to true to test premium features
  const [isPremium, setIsPremium] = useState(false);

  const quickQueries = [
    "Is this still available?",
    "Can I schedule a visit?",
    "What are the requirements?",
    "Is the price negotiable?",
    "When is the earliest move-in date?",
  ];

  // Placeholder for missing place properties
  const defaultPlace = {
    rating: 4.5,
    landlordName: "The Landlord",
    type: "Apartment",
    location: "City Center",
    details: "This is a brief description of the place. It's newly renovated and perfect for young professionals. High-speed internet included.",
    amenities: ["WiFi", "AC", "Laundry", "Parking"],
    rules: "No smoking indoors. Quiet hours after 10 PM. Pets upon approval.",
    reviews: [
      { id: "1", tenant: "Juan Dela Cruz", rating: 5, text: "Very clean and cozy place!" },
      { id: "2", tenant: "Maria Santos", rating: 4.5, text: "Good location, friendly landlord." },
      { id: "3", tenant: "Pedro Reyes", rating: 4, text: "Affordable and safe." },
    ],
    // Assuming place.images is passed, using a placeholder if not.
    images: [{ uri: 'https://via.placeholder.com/600x400' }],
    rent: 15000,
    ...place
  };

  const reviews = defaultPlace.reviews;

  const renderStars = (rating, size = 14) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++)
      stars.push(<FontAwesome key={`star-${i}`} name="star" size={size} color={COLORS.SECONDARY} />);
    if (halfStar)
      stars.push(<FontAwesome key="star-half-full" name="star-half" size={size} color={COLORS.SECONDARY} />);
    while (stars.length < 5)
      stars.push(<FontAwesome key={`star-empty-${stars.length}`} name="star-o" size={size} color={COLORS.SECONDARY} />);
    return <View style={styles.starRating}>{stars}</View>;
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
    setRentStatus("Request Sent"); // Changed to 'Request Sent' for brevity

    const systemMessage = {
      id: Date.now().toString(),
      sender: "System",
      text: `Rent request for ${defaultPlace.name} has been sent!`,
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
        "Hello! Thank you for your interest. The place is still available for viewing.",
        "Please provide your ideal move-in date so I can check my schedule.",
        "I'm currently busy, I'll check my messages soon.",
        "Sure! The minimum rental period is 6 months.",
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: defaultPlace.landlordName, text: reply, time: getCurrentTime() },
      ]);
      setTyping(false);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1200);
  };

  const sendMessage = () => {
    if (!input.trim() && isPremium) return;

    if (!isPremium && !input.trim()) {
      setShowPremiumModal(true);
      return;
    }
    
    // If not premium, and input is present, alert/modal for premium before sending
    if (!isPremium && input.trim()) {
        setShowPremiumModal(true);
        return;
    }

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

    const isSent = item.sender === "You";
    return (
      <TouchableOpacity
        // Functionality to delete messages on long press (optional)
        // onLongPress={() => item.sender !== "You" && setMessages((prev) => prev.filter((m) => m.id !== item.id))} 
        style={[styles.messageBubble, isSent ? styles.sent : styles.received]}
        activeOpacity={0.8}
      >
        <Text style={[styles.messageText, { color: isSent ? "#fff" : COLORS.ACCENT_DARK }]}>{item.text}</Text>
        {item.time && (
          <Text style={[styles.messageTime, { color: isSent ? "#fffcc0" : "#555" }]}>{item.time}</Text>
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
    setCardName("");
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setIsPremium(true);
  };

  return (
    <ImageBackground source={BG_IMAGE} style={styles.background}>
      <View style={styles.overlay} />

      {/* Close button with back/close logic */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => {
          if (showChat) {
            setShowChat(false);
          } else {
            navigation.goBack();
          }
        }}
      >
        <FontAwesome name={showChat ? "close" : "chevron-left"} size={20} color={COLORS.TEXT_LIGHT} />
      </TouchableOpacity>
      
      {/* Scrollable Main Content */}
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={defaultPlace.images[0]} style={styles.image} />
        
        {/* Details Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.name}>{defaultPlace.name}</Text>
          {renderStars(defaultPlace.rating, 18)}
          <Text style={styles.rent}>₱{defaultPlace.rent.toLocaleString()} / mo</Text>
          {defaultPlace.type && <Text style={styles.subInfo}>{defaultPlace.type} • {defaultPlace.location}</Text>}
          
          <View style={styles.separator} />
          
          <Text style={styles.subTitle}>Description</Text>
          <Text style={styles.details}>{defaultPlace.details}</Text>
          
          <Text style={styles.subTitle}>Amenities</Text>
          <Text style={styles.amenities}>{defaultPlace.amenities.join(" | ")}</Text>
          
          <Text style={styles.subTitle}>Rules</Text>
          <Text style={styles.details}>{defaultPlace.rules}</Text>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewContainer}>
          <Text style={styles.subTitle}>Recent Reviews</Text>
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

      {/* Bottom buttons (Hidden when chat is open) */}
      {!showChat && (
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
            <FontAwesome name="comments" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Chat Landlord</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.rentButton, rentStatus === "Request Sent" && { backgroundColor: "gray" }]}
            onPress={() => {
              if (rentStatus === "Rent Now") {
                setShowRentPopup(true);
              } else {
                // Navigate to a mock Notifications screen or show an alert
                alert(`Your rent request for ${defaultPlace.name} is being processed.`);
              }
            }}
          >
            <FontAwesome name="money" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>{rentStatus}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Rent Popup */}
      {showRentPopup && (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.rentPopup}>
          <View style={styles.popupCardEnhanced}>
            <Text style={[styles.name, { fontSize: 22, marginBottom: 15 }]}>Submit Rent Request</Text>
            <TextInput
              placeholder="Your Full Name"
              placeholderTextColor="#ccc"
              style={styles.inputEnhanced}
              value={renterName}
              onChangeText={setRenterName}
            />
            <TextInput
              placeholder="Duration (e.g., 6 months minimum)"
              placeholderTextColor="#ccc"
              style={styles.inputEnhanced}
              value={duration}
              onChangeText={setDuration}
            />
            <TouchableOpacity style={styles.confirmRentButtonEnhanced} onPress={handleRentRequest}>
              <Text style={styles.buttonText}>Confirm Request</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowRentPopup(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}

      {/* Chat Overlay */}
      {showChat && (
        <ImageBackground source={BG_IMAGE} style={styles.chatImageBackground}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.chatInnerOverlay}
          >
            <View style={styles.chatHeader}>
              <Text style={styles.chatHeaderText}>{defaultPlace.landlordName}</Text>
              <Text style={styles.chatStatus}>{isPremium ? "Premium Chat" : "Free Chat Enabled"}</Text>
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
                <Text style={{ color: "#fff", fontStyle: "italic" }}>{defaultPlace.landlordName} is typing...</Text>
              </View>
            )}

            {/* Quick Queries / Premium Banner Logic */}
            {!isPremium ? (
              <>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false} 
                  style={styles.quickQueryBar} 
                  contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
                >
                  {quickQueries.map((query, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={styles.quickQueryButton} 
                      onPress={() => sendQuickMessage(query)}
                    >
                      <Text style={styles.quickQueryText}>{query}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.premiumChatBanner}>
                    <Text style={styles.premiumBannerTitle}>
                        <FontAwesome name="lock" size={16} color={COLORS.SECONDARY} /> Unlock Unlimited Chat
                    </Text>
                    <Text style={styles.premiumBannerSubtitle}>
                        Upgrade to Premium to type custom messages!
                    </Text>
                    <TouchableOpacity style={styles.premiumButton} onPress={() => setShowPremiumModal(true)}>
                        <Text style={styles.premiumButtonText}>Upgrade Now</Text>
                    </TouchableOpacity>
                </View>
              </>
            ) : (
                <View style={styles.chatInputRow}>
                    <TextInput
                        placeholder="Type a message..."
                        placeholderTextColor="#ccc"
                        style={styles.chatInput}
                        value={input}
                        onChangeText={setInput}
                        onSubmitEditing={sendMessage}
                        returnKeyType="send"
                    />
                </View>
            )}

            {/* Send button (always visible, handles logic) */}
            <TouchableOpacity 
                style={styles.chatSendButton} 
                onPress={sendMessage}
                disabled={!isPremium && input.length === 0} // Disable send if not premium and no text
            >
                <FontAwesome name="paper-plane" size={20} color="#fff" />
            </TouchableOpacity>

          </KeyboardAvoidingView>
        </ImageBackground>
      )}

      {/* Premium Payment Modal */}
      {showPremiumModal && (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.rentPopup}>
          <View style={styles.popupCardEnhanced}>
            <Text style={[styles.name, { fontSize: 22, color: COLORS.SECONDARY, marginBottom: 15 }]}>Unlock Premium Chat</Text>
            <Text style={styles.details}>Pay a one-time fee of ₱99 to unlock unlimited, custom chat messages with all landlords.</Text>
            <View style={styles.separator} />
            
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
              maxLength={16}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                    placeholder="Expiry (MM/YY)"
                    placeholderTextColor="#ccc"
                    style={[styles.inputEnhanced, { flex: 0.6, marginRight: 10 }]}
                    value={expiry}
                    onChangeText={setExpiry}
                    maxLength={5}
                />
                <TextInput
                    placeholder="CVV"
                    placeholderTextColor="#ccc"
                    style={[styles.inputEnhanced, { flex: 0.4 }]}
                    keyboardType="numeric"
                    secureTextEntry
                    value={cvv}
                    onChangeText={setCvv}
                    maxLength={4}
                />
            </View>

            <TouchableOpacity style={styles.confirmRentButtonEnhanced} onPress={handlePremiumPayment}>
              <Text style={styles.buttonText}>Pay ₱99 & Unlock</Text>
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
  // --- General ---
  background: { flex: 1, width: "100%", height: "100%", resizeMode: "cover" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0, 0, 0, 0.5)" },
  container: { paddingBottom: 120, flexGrow: 1 },
  separator: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 15 },

  // --- Header/Image ---
  image: { width: "100%", height: 300, borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden' },
  closeButton: { 
    position: "absolute", top: Platform.OS === 'ios' ? 60 : 40, left: 20, zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 25,
    width: 45, height: 45, justifyContent: "center", alignItems: "center",
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.8, shadowRadius: 4, elevation: 6
  },

  // --- Details Card ---
  detailsCard: { 
    padding: 25, backgroundColor: COLORS.CARD_BG, margin: 15, borderRadius: 25,
    shadowColor: "#000", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 10
  },
  name: { color: COLORS.TEXT_LIGHT, fontSize: 32, fontWeight: "700", marginBottom: 8 },
  starRating: { flexDirection: "row", marginVertical: 8 },
  rent: { color: COLORS.SECONDARY, fontSize: 26, fontWeight: "700", marginBottom: 6 },
  subInfo: { color: COLORS.ACCENT_LIGHT, fontSize: 14, marginBottom: 12 },
  details: { color: COLORS.TEXT_LIGHT, fontSize: 16, lineHeight: 24, marginBottom: 6 },
  subTitle: { color: COLORS.TEXT_LIGHT, fontSize: 20, fontWeight: "700", marginTop: 15, borderLeftWidth: 3, borderLeftColor: COLORS.SECONDARY, paddingLeft: 12 },
  amenities: { color: COLORS.SECONDARY, fontSize: 16, marginBottom: 10, marginTop: 5 },

  // --- Reviews ---
  reviewContainer: { padding: 25, backgroundColor: COLORS.CARD_BG, marginHorizontal: 15, marginBottom: 20, borderRadius: 25 },
  reviewCard: { backgroundColor: "rgba(255,255,255,0.08)", padding: 15, borderRadius: 18, marginVertical: 8, borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1 },
  reviewHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 },
  tenantName: { color: COLORS.SECONDARY, fontWeight: "600", fontSize: 16 },
  reviewText: { color: COLORS.ACCENT_LIGHT, fontSize: 14, marginTop: 5 },

  // --- Bottom Buttons ---
  bottomButtons: { 
    position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", justifyContent: "space-around", 
    paddingVertical: 15, paddingHorizontal: 10, backgroundColor: COLORS.ACCENT_DARK, borderTopLeftRadius: 25, borderTopRightRadius: 25,
    shadowColor: COLORS.SECONDARY, shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.5, shadowRadius: 12, elevation: 12
  },
  chatButton: { flexDirection: "row", backgroundColor: COLORS.BUTTON_CHAT, padding: 15, borderRadius: 30, alignItems: "center", flex: 1, marginHorizontal: 5, justifyContent: 'center' },
  rentButton: { flexDirection: "row", backgroundColor: COLORS.BUTTON_PRIMARY, padding: 15, borderRadius: 30, alignItems: "center", flex: 1, marginHorizontal: 5, justifyContent: 'center' },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  // --- Popups/Modals ---
  rentPopup: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.85)", justifyContent: "center", alignItems: "center", zIndex: 20 },
  popupCardEnhanced: { width: "90%", backgroundColor: COLORS.POPUP_BG, borderRadius: 25, padding: 30, borderWidth: 2, borderColor: COLORS.SECONDARY },
  inputEnhanced: { backgroundColor: COLORS.INPUT_BG, color: "#fff", padding: 15, borderRadius: 18, marginBottom: 15, fontSize: 16, borderColor: 'rgba(255,255,255,0.3)', borderWidth: 1 },
  confirmRentButtonEnhanced: { backgroundColor: COLORS.BUTTON_PRIMARY, padding: 15, borderRadius: 25, alignItems: "center", marginBottom: 10 },
  cancelButton: { backgroundColor: "#555", padding: 15, borderRadius: 25, alignItems: "center" },

  // --- Chat ---
  chatImageBackground: { ...StyleSheet.absoluteFillObject, zIndex: 15 },
  chatInnerOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", paddingTop: Platform.OS === 'android' ? 0 : 40 },
  chatHeader: { flexDirection: "column", padding: 15, borderBottomWidth: 1, borderBottomColor: COLORS.INPUT_BG, backgroundColor: COLORS.ACCENT_DARK },
  chatHeaderText: { color: COLORS.TEXT_LIGHT, fontSize: 20, fontWeight: "700" },
  chatStatus: { color: COLORS.SECONDARY, fontSize: 12, marginTop: 2 },
  chatList: { paddingHorizontal: 15, paddingBottom: 20, paddingTop: 10 },
  messageBubble: { padding: 12, borderRadius: 18, marginVertical: 5, maxWidth: "85%", minWidth: '20%' },
  sent: { backgroundColor: COLORS.CHAT_SENT, alignSelf: "flex-end", borderBottomRightRadius: 5 },
  received: { backgroundColor: COLORS.CHAT_RECEIVED, alignSelf: "flex-start", borderBottomLeftRadius: 5 },
  messageText: { fontSize: 15 },
  messageTime: { fontSize: 10, marginTop: 3, alignSelf: "flex-end" },
  systemMessage: { alignSelf: "center", backgroundColor: "rgba(255,255,255,0.2)", padding: 8, borderRadius: 12, marginVertical: 10, maxWidth: '70%' },
  systemText: { color: COLORS.ACCENT_LIGHT, fontSize: 12, textAlign: 'center' },
  systemTime: { color: "#ccc", fontSize: 10, textAlign: "right" },
  typingIndicator: { padding: 10, alignSelf: 'flex-start' },
  chatInputRow: { flex: 1 },
  chatInput: { flex: 1, backgroundColor: COLORS.INPUT_BG, color: "#fff", paddingHorizontal: 15, borderRadius: 25, marginRight: 10, height: 45, fontSize: 16 },
  chatSendButton: { padding: 12, backgroundColor: COLORS.BUTTON_PRIMARY, borderRadius: 25, position: 'absolute', right: 10, bottom: 10, zIndex: 1 },
  quickQueryBar: { maxHeight: 60, marginBottom: 5, borderTopWidth: 1, borderTopColor: COLORS.INPUT_BG },
  quickQueryButton: { backgroundColor: COLORS.BUTTON_CHAT, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, marginHorizontal: 5, justifyContent: "center", alignItems: "center", minHeight: 40 },
  quickQueryText: { color: "#fff", fontWeight: "700", fontSize: 13 },

  // --- Premium Banner ---
  premiumChatBanner: { 
    padding: 15, backgroundColor: 'rgba(30, 136, 229, 0.15)', borderTopWidth: 1, borderTopColor: COLORS.SECONDARY, alignItems: 'center',
    marginHorizontal: 10, borderRadius: 18, marginBottom: 10,
  },
  premiumBannerTitle: { color: COLORS.SECONDARY, fontWeight: "700", fontSize: 16, marginBottom: 5 },
  premiumBannerSubtitle: { color: COLORS.TEXT_LIGHT, fontSize: 14, marginVertical: 5, textAlign: 'center' },
  premiumButton: { backgroundColor: "#1E88E5", padding: 12, borderRadius: 25, alignItems: "center", marginTop: 8, width: '65%' },
  premiumButtonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
