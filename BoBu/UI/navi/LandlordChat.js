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
  const { tenantName } = route.params || { tenantName: "Tenant" };

  const [messages, setMessages] = useState([
    { id: "1", sender: tenantName, text: "hEllowww lAndlurdzz 😚✨ gUd aFtirnUn pohh 🥺🙏 btw lodss pwede pa ba mahimz nga next next yeAr nalang ko mubayad sa abAng 😭👉👈 plsss po 😩 kay murag ga lowbatt pa akong wallet rn 🥺💸 HAHAHA pero swear lods, dli ko manglimbong 😭 if makadaog ko sa raffle sa tindahan, ikaw una nako bayran 😭🤣 promise on pinky toes 😤💅 charrr HAHAHA. ayaw lng ko pa-layas ha 😭 kay naa pa koy utang sa cr nga wala nako na-flush 😭😭" },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { id: Date.now().toString(), sender: "You", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulated tenant auto-reply
    setTimeout(() => {
      const tenantReplies = [
        "Bayad na lagi ko samoka",
        "Pwede nextyear te. sige na te, pleaze UwU",
        "I love you",
        "gUd eVe poh lAndLurDzz 😚✌️ uhhhmm pAsEnxa na poh ha, lahi2 najud ang vibes sa kwrto rn 😭 mura mang naay multo gahapon, nagTiktok mn gud ko, kalit lng nig-off ang ilawz 😭😭 nAhadlok ko so ako g-yakapan ang electric fan 😩❄️ bwahahah. btw lAndlurdzz, kanus-a btaw nimu ma-ayo ang cr? ky murag g-emo2x na ang flush 😭😭 dli na kasabot sa life 😭. ehehe char lang lods 😚, ayaw lng ko pa-layas ha ky ma-miss tika charrr 🤭",
        "hEy lAndlUrdzz 🥺👉👈 gUd eVe poHzz 😚✨ ahhh btw poh, naa lang koy gamayng prOblemaH 🥺😩 ang gripo sa kusina murag naay rabies 😭 kay pirmi magwanta ug tagaktak 😭💦 HAHAHA pero ayaw kabalaka lodss ky ako rang gi-tapalan ug bubblegum 😎✌️ innovat!ve tenant ni 😎🔥 charrr HAHAHA. btw basin naa ka’y extra wifi password 🥺 ky akong ML gahapon nag lag ug kalit 😭 gipatay kos Franco 😭😭. ayaw lng ko bayri og penalty ha lAndlurdzz ky wa koy kwarta rn 😩 pero naa koy love 😚 (jk charrrr) 🤣🤣",
      ];
      const reply =
        tenantReplies[Math.floor(Math.random() * tenantReplies.length)];
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: tenantName, text: reply },
      ]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.header}>Chat with {tenantName}</Text>
      </TouchableOpacity>

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
