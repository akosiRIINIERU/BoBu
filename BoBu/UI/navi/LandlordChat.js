import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function LandlordChat() {
  const navigation = useNavigation();
  const route = useRoute();

  // Receive whole tenant object
  const { tenant } = route.params || {
    tenant: { name: "Tenant", phone: "", room: "" },
  };

  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: tenant.name,
      text:
        "hEllowww lAndlurdzz 😚✨ gUd aFtirnUn pohh 🥺🙏 btw lodss pwede pa ba mahimz nga next next yeAr nalang ko mubayad sa abAng 😭👉👈",
    },
  ]);

  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: "You",
      text: input,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulated tenant auto-reply
    setTimeout(() => {
      const replies = [
        "Bayad na lagi ko samoka",
        "Pwede nextyear te. sige na te UwU",
        "I love you",
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: tenant.name, text: reply },
      ]);
    }, 900);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* CHAT HEADER */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.header}>Chat with {tenant.name}</Text>
      </TouchableOpacity>

      {/* TENANT INFO BOX */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>🏠 {tenant.room}</Text>
        <Text style={styles.infoText}>📞 {tenant.phone}</Text>
        <Text style={styles.infoText}>💰 Rent: {tenant.rent}</Text>
      </View>

      <FlatList
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#8D9DF6", padding: 20 },
  header: { fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 10 },

  infoBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 4,
    color: "#000",
  },

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
