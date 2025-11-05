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
    Linking.openURL(url).catch(() => Alert.alert("Error", "Failed to open link"));
  };

  const members = [
    {
      id: 1,
      name: "Marhean Buhisan",
      role: "Jungler",
      image: require("../assets/marhean.png"),
      facebook: "https://www.facebook.com/marheanb",
      github: "https://github.com/marheanb",
    },
    {
      id: 2,
      name: "Renhiel Maghanoy",
      role: "Pancit Canton and Gold Laner",
      image: require("../assets/ako.jpg"),
      facebook: "https://www.facebook.com/akosi.ulan23",
      github: "https://github.com/akosiRIINIERU",
    },
    {
      id: 3,
      name: "John Rosmar Suico",
      role: "Top Laner",
      image: require("../assets/Suico.png"),
      facebook: "https://www.facebook.com/johndoe",
      github: "https://github.com/johndoe",
    },
    {
      id: 4,
      name: "Kyle Jumilla",
      role: "Support and Tank",
      image: require("../assets/kyle.png"),
      facebook: "https://www.facebook.com/mariel",
      github: "https://github.com/kakaylx",
    },
    {
      id: 5,
      name: "Janna Sumalpon",
      role: "Mage",
      image: require("../assets/Jana.jpg"),
      facebook: "https://www.facebook.com/kevinp",
      github: "https://github.com/kakaylx",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>About Us</Text>
      <Text style={styles.subtitle}>Meet the BoardBuddy Team 💙</Text>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {members.map((member) => (
          <View key={member.id} style={styles.card}>
            <Image source={member.image} style={styles.avatar} />
            <Text style={styles.name}>{member.name}</Text>
            <Text style={styles.role}>{member.role}</Text>

            <View style={styles.socialRow}>
              <TouchableOpacity
                onPress={() => openLink(member.facebook)}
                style={styles.socialButton}
              >
                <Image
                  source={require("../assets/Facebook.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => openLink(member.github)}
                style={styles.socialButton}
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
        >
          <Text style={styles.backText}>Back to Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(141,157,246,1)",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  header: {
    fontSize: 42,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    color: "#f2f2f2",
    fontSize: 18,
    marginBottom: 30,
    fontStyle: "italic",
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 60,
  },
  card: {
    width: 300,
    backgroundColor: "rgba(29,29,130,1)",
    borderRadius: 25,
    paddingVertical: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: "#E6E6E6",
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  role: {
    color: "#ddd",
    fontSize: 16,
    marginTop: 5,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    gap: 20,
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
  backButton: {
    marginTop: 30,
    backgroundColor: "#E6E6E6",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  backText: {
    color: "#1d1d82",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AboutUs;
