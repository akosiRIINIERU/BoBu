import React, { useRef, useEffect, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";

export default function ChatScreen() {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([
    { id: "1", sender: "Landlord Farquad", text: "Bayri Imong Utang" },
  ]);
  const [input, setInput] = useState("");
  const flatListRef = useRef(null);
  const inputRef = useRef(null);

  // Predefined messages tenants can quickly send
  const [readyMessages, setReadyMessages] = useState([
    "Hello, I have a question about my rent.",
    "Is my room available for inspection?",
    "I need to report an issue in my room.",
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => inputRef.current?.focus(), 200);
    return () => clearTimeout(timeout);
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { id: Date.now().toString(), sender: "You", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Auto-reply simulation
    setTimeout(() => {
      const replies = [
        "Badiya.",
        "pagtarong diha, ipablater tika ron waa ka.",
        "You can't reply this Conversation.",
        "Hello, sorry but the landlord is currently unavailable. Please leave a message and they will get back to you.",
        "k.",
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: "Landlord Farquad", text: reply },
      ]);
    }, 1000);

    // Scroll to bottom
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderItem = ({ item }) => (
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
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={require("../../assets/bg2.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.header}>Chat with Landlord 💬</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Predefined Ready-to-Send Messages */}
        <View style={styles.readyMessageRow}>
          {readyMessages.map((msg, index) => (
            <TouchableOpacity
              key={index}
              style={styles.readyMessageBtn}
              onPress={() => {
                setInput(msg); // set message in input
                // remove clicked message
                setReadyMessages(prev => prev.filter((_, i) => i !== index));
              }}
            >
              <Text style={styles.readyMessageText}>{msg}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.inputRow}>
          <TextInput
            ref={inputRef}
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
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, padding: 15 },
  headerRow: { marginTop: 30, marginBottom: 10 },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    justifyContent: "center",
    color: "#fff",
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
  },
  sent: {
    alignSelf: "flex-end",
    backgroundColor: "#1d1d82",
  },
  received: {
    alignSelf: "flex-start",
    backgroundColor: "#E6E6E6",
  },
  messageText: {
    fontSize: 16,
  },
  readyMessageRow: {
    marginBottom: 10,
  },
  readyMessageBtn: {
    backgroundColor: "#1d1d82",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginVertical: 3,
  },
  readyMessageText: {
    color: "#fff",
    fontSize: 14,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
  },
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
