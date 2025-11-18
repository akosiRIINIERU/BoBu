import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function LandlordChat() {
  const navigation = useNavigation();
  const route = useRoute();

  // Safe tenant object
  const { tenant } = route.params || {
    tenant: { name: "Tenant", phone: "", room: "", rent: "" },
  };

  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: tenant.name,
      text: "Hello Landlord, I hope you are doing well. I just wanted to confirm my rent payment status.",
    },
  ]);
  const [input, setInput] = useState("");
  const flatListRef = useRef(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: "You",
      text: input.trim(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Optional: Auto-reply for demo
    setTimeout(() => {
      const autoReplies = [
        `Thank you so much landlord.`,
      ];
      const reply =
        autoReplies[Math.floor(Math.random() * autoReplies.length)];
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: tenant.name, text: reply },
      ]);
    }, 900);
  };

  return (
    <ImageBackground
      source={require("../../assets/bg2.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.header}>Chat with {tenant.name}</Text>
        </TouchableOpacity>

        {/* Tenant Info */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>🏠 {tenant.room}</Text>
          <Text style={styles.infoText}>📞 {tenant.phone}</Text>
          <Text style={styles.infoText}>💰 Rent: {tenant.rent}</Text>
        </View>

        {/* Chat Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.sender === "You" ? styles.sent : styles.received,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  item.sender === "You" ? { color: "#fff" } : { color: "#000" },
                ]}
              >
                {item.text}
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#aaa"
            value={input}
            onChangeText={setInput}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, padding: 20, backgroundColor: "rgba(0,0,0,0.2)" },
  header: { fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 10 },

  infoBox: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  infoText: { fontSize: 16, marginBottom: 4, color: "#000" },

  messageBubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
  },
  sent: { alignSelf: "flex-end", backgroundColor: "#1d1d82" },
  received: { alignSelf: "flex-start", backgroundColor: "#E6E6E6" },
  messageText: { fontSize: 16 },

  inputRow: { flexDirection: "row", alignItems: "center", marginTop: "auto" },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    color: "#333",
  },
  sendButton: {
    backgroundColor: "#1d1d82",
    borderRadius: 25,
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
