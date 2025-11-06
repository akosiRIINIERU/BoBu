import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  Alert,
} from "react-native";

function AboutUs({ navigation }) {
  const openLink = (url) => {
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "Failed to open link")
    );
  };

  const members = [
    {
      id: 1,
      name: "Marhean Buhisan",
      role: "Jungler",
      quote: "unsaon ni??",
      image: require("../assets/marhean.png"),
      facebook: "https://www.facebook.com/marheanb",
      github: "https://github.com/marheanb",
    },
    {
      id: 2,
      name: "Renhiel Maghanoy",
      role: "Pancit Canton / Gold Laner",
      quote: "wana kabakod sa ratrat ni Janna ug stuck iron sa Valorant",
      image: require("../assets/ako.jpg"),
      facebook: "https://www.facebook.com/akosi.ulan23",
      github: "https://github.com/akosiRIINIERU",
    },
    {
      id: 3,
      name: "John Rosmar Suico",
      role: "Top Laner",
      quote: "nibalos ug ratrat ug mga trashtalk kang Janna",
      image: require("../assets/Suico.png"),
      facebook: "https://www.facebook.com/johndoe",
      github: "https://github.com/johndoe",
    },
    {
      id: 4,
      name: "Kyle Jumilla",
      role: "Support / Tank",
      quote: "papasara mi sir plssss :(",
      image: require("../assets/kyle.jpg"),
      facebook: "https://www.facebook.com/mariel",
      github: "https://github.com/kakaylx",
    },
    {
      id: 5,
      name: "Janna Sumalpong",
      role: "Mage",
      quote: "giratratan ug trashtalk si Suico ug Renhiel",
      image: require("../assets/Jana.jpg"),
      facebook: "https://www.facebook.com/kevinp",
      github: "https://github.com/kakaylx",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>About Us</Text>
      <Text style={styles.subtitle}>Meet the BoardBuddy Team 💙 </Text>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {members.map((member) => (
          <View key={member.id} style={styles.card}>
            <Image source={member.image} style={styles.avatar} />
            <Text style={styles.name}>{member.name}</Text>
            <Text style={styles.role}>{member.role}</Text>
            <Text style={styles.quote}>"{member.quote}"</Text>

            <View style={styles.socialRow}>
              <TouchableOpacity
                onPress={() => openLink(member.facebook)}
                style={styles.socialButton}
                activeOpacity={0.7}
              >
                <Image
                  source={require("../assets/Facebook.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => openLink(member.github)}
                style={styles.socialButton}
                activeOpacity={0.7}
              >
                <Image
                  source={require("../assets/github.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Login")}
          activeOpacity={0.8}
        >
          <Text style={styles.backText}>← Back to Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Container layout
  container: {
    flex: 1,
    backgroundColor: "#8D9DF6",
    alignItems: "center",
    paddingTop: 60,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 60,
  },

  // Header
  header: {
    fontSize: 42,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    color: "#f9f9f9",
    fontSize: 18,
    marginBottom: 30,
    fontStyle: "italic",
    lineHeight: 24,
    opacity: 0.9,
    textAlign: "center",
  },

  // Member card
  card: {
    width: 310,
    backgroundColor: "#1D1D82",
    borderRadius: 25,
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginBottom: 22,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
    backgroundColor: "#E6E6E6",
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  role: {
    color: "#d6d6ff",
    fontSize: 15,
    marginTop: 4,
    textAlign: "center",
  },
  quote: {
    color: "#b3b3ff",
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 10,
  },

  // Social buttons
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    gap: 20, // consistent spacing
  },
  socialButton: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: "#E6E6E6",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    width: 25,
    height: 25,
    
  },

  // Back button
  backButton: {
    marginTop: 25,
    backgroundColor: "#E6E6E6",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  backText: {
    color: "#1D1D82",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AboutUs;
