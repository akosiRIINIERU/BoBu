import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
  Keyboard,
  Linking,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
  Modal,
} from "react-native";
import api from "./http.js";


function Login({ navigation }) {
  // Moved here ✔ FIXED
  const [data, setData] = useState({
    id_number: "",
    password: ""
  })

  const [profile, setProfile] = useState({
    'first_name' : '',
    'last_name' : ''
  })

  const[Token, setToken] = useState("")

  const onPressLogin = () => {
    api.post('auth/token/login/', data).then(response => {
      setToken(response.data?.auth_token)
    }).catch(error => {
      console.error(error);
    })
  }

  const onGetProfile = () => {
    api.get('auth/users/me/', {
      headers: {
        'Authorization': 'Token ' + Token
      }
    }).then(response => {
      let datum = response.data
      setProfile({
        first_name: datum.first_name,
        last_name: datum.last_name
      })
    })
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordInputRef = useRef(null);

  // ✨ Animation states
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, []);

  // Show modal function
  const showAlert = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  // Login handler
  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      showAlert(
        "Login Failed",
        "Both username and password are required. Please fill in all fields and try again."
      );
      return;
    }

    const user = username.toLowerCase();
    const pass = password.trim();

    if (pass !== "admin") {
      showAlert(
        "Authentication Error",
        "The password you entered is incorrect. Please verify and try again."
      );
      return;
    }

    // Role-based navigation
    switch (user) {
      case "landlord":
        navigation.navigate("Landlord");
        break;
      case "admin":
      case "tenant":
        navigation.navigate("Dashboard");
        break;
      default:
        showAlert(
          "User Not Found",
          "The username entered does not match any account in our system. Please check your username and try again."
        );
        break;
    }
  };

  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
      else showAlert("Error", "Cannot open the provided link.");
    } catch (err) {
      console.error("Failed to open link:", err);
      showAlert("Error", "An unexpected error occurred while opening the link.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.avoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/logo.png")}
              resizeMode="contain"
              style={styles.image}
            />
          </View>

          {/* Your custom ID + Password Fields */}
          <View>
            <TextInput
              value={data.id_number}
              onChangeText={(val) => setData({ ...data, id_number: val })}
              placeholder="ID Number"
              style={styles.input}
            />

            <TextInput
              value={data.password}
              onChangeText={(val) => setData({ ...data, password: val })}
              placeholder="Password"
              secureTextEntry={true}
              style={styles.input}
            />

            <Button title="Login" onPress={onPressLogin} />
            <Button title="Get Profile" onPress={console.log(data)} />
          </View>
          
          <View>
            <Text>{ profile.first_name } { profile.last_name }</Text>
          </View>
          {/* Animated Card */}
          <Animated.View
            style={[
              styles.card,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.title}>HELLO!</Text>
            <Text style={styles.subtitle}>Log in to get started</Text>

            {/* Username Input */}
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
              autoCapitalize="none"
            />

            {/* Password Input */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                returnKeyType="done"
                ref={passwordInputRef}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                  handleLogin();
                }}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                activeOpacity={0.6}
              >
                <Image
                  source={
                    showPassword
                      ? require("../assets/eye-open.png")
                      : require("../assets/eye-closed.png")
                  }
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.or}>or</Text>

            {/* Social Icons */}
            <View style={styles.socialRow}>
              {[
                {
                  src: require("../assets/Facebook.png"),
                  url: "https://www.facebook.com/marheanb",
                },
                {
                  src: require("../assets/Insta.png"),
                  url: "https://www.instagram.com/oompa.lumpia69",
                },
                {
                  src: require("../assets/github.png"),
                  url: "https://github.com/akosiRIINIERU",
                },
                {
                  src: require("../assets/reddit.png"),
                  url: "https://www.reddit.com/user/shinjikisushi",
                },
              ].map((icon, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => openLink(icon.url)}
                  style={styles.socialButton}
                  activeOpacity={0.7}
                >
                  <Image source={icon.src} style={styles.socialIcon} />
                </TouchableOpacity>
              ))}
            </View>

            {/* Footer Buttons */}
            <View style={styles.footerRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate("AboutUs")}
                style={styles.smallButton}
                activeOpacity={0.7}
              >
                <Text style={styles.btnTextSmall}>About Us</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("SignUp")}
                style={styles.smallButton}
                activeOpacity={0.7}
              >
                <Text style={styles.btnTextSmall}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  avoidingView: {
    flex: 1,
    backgroundColor: "#8D9DF6",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  logoContainer: {
    width: 300,
    height: 200,
  },
  image: {
    width: "100%",
    height: "110%",
  },
  card: {
    width: "100%",
    backgroundColor: "#1D1D82",
    borderRadius: 40,
    paddingHorizontal: 36,
    paddingVertical: 40,
    alignItems: "center",
    elevation: 6,
  },
  title: {
    color: "#fff",
    fontSize: 46,
    fontWeight: "800",
    fontStyle: "italic",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#f9f9f9",
    fontSize: 22,
    fontStyle: "italic",
    marginBottom: 28,
    textAlign: "center",
    opacity: 0.9,
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#E6E6E6",
    borderRadius: 25,
    paddingHorizontal: 18,
    fontSize: 16,
    color: "#1D1D82",
    marginBottom: 15,
  },
  passwordContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 15,
  },
  passwordInput: {
    width: "100%",
    height: 48,
    backgroundColor: "#E6E6E6",
    borderRadius: 25,
    paddingHorizontal: 18,
    fontSize: 16,
    color: "#1D1D82",
    paddingRight: 35,
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    top: "40%",
    transform: [{ translateY: -12 }],
    padding: 4,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
  button: {
    width: 120,
    height: 45,
    backgroundColor: "#E6E6E6",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  btnText: {
    fontWeight: "bold",
    color: "#1D1D82",
    fontSize: 16,
  },
  or: {
    color: "#fff",
    fontSize: 20,
    marginTop: 28,
    opacity: 0.7,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginTop: 25,
    gap: 5,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E6E6E6",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    width: 28,
    height: 28,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 70,
  },
  smallButton: {
    width: 90,
    height: 36,
    backgroundColor: "#E6E6E6",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  btnTextSmall: {
    color: "#1D1D82",
    fontWeight: "bold",
    fontSize: 14,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#1D1D82",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 16,
    color: "#f9f9f9",
    marginBottom: 25,
    textAlign: "center",
  },
  modalButton: {
    width: 100,
    height: 40,
    backgroundColor: "#E6E6E6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#1D1D82",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Login;
