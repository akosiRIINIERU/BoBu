import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  Alert,
  Linking,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
} from "react-native";

function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef(null);

  // ✨ Animation states
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

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

 const handleLogin = () => {
  if (!username.trim() || !password.trim()) {
    Alert.alert("Login Error", "Please enter both username and password.");
    return;
  }

  const user = username.toLowerCase();
  const pass = password.trim();

  if (pass !== "admin") {
    Alert.alert("Invalid Password", "Please check your password and try again.");
    return;
  }

  // Role-based navigation
  switch (user) {
    case "landlord":
      navigation.navigate("Landlord");
      break;
    case "admin":
      navigation.navigate("Dashboard");
      break;
    case "tenant":
      navigation.navigate("Dashboard");
      break;
    default:
      Alert.alert("Invalid Username", "Username not recognized.");
      break;
  }
};



  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
      else Alert.alert("Error", "Cannot open the provided link.");
    } catch (err) {
      console.error("Failed to open link:", err);
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
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
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
    flexDirection: "row",
    alignItems: "center",
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
  paddingRight: 35, // space for the eye icon
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
  resizeMode: "contain",
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
});

export default Login;
