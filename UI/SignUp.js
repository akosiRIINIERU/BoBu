import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";

function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleSignUp = () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !mobile.trim() ||
      !username.trim() ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Missing Info", "Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (!/^[0-9]{7,15}$/.test(mobile)) {
      Alert.alert("Invalid Number", "Enter a valid mobile number.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    Alert.alert("Success 🎉", "Account created successfully!");
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo.png")}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>Create your account 💙 </Text>

          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#999"
            value={firstName}
            onChangeText={setFirstName}
            returnKeyType="next"
            onSubmitEditing={() => lastNameRef.current?.focus()}
            blurOnSubmit={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#999"
            value={lastName}
            onChangeText={setLastName}
            ref={lastNameRef}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            blurOnSubmit={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => mobileRef.current?.focus()}
            blurOnSubmit={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            placeholderTextColor="#999"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            ref={mobileRef}
            returnKeyType="next"
            onSubmitEditing={() => usernameRef.current?.focus()}
            blurOnSubmit={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            ref={usernameRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
            autoCapitalize="none"
          />

          {/* Password field with toggle */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { flex: 1, marginBottom: 0 }]}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              ref={passwordRef}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              blurOnSubmit={false}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
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

          {/* Confirm password field with toggle */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { flex: 1, marginBottom: 0 }]}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              ref={confirmPasswordRef}
              returnKeyType="done"
              onSubmitEditing={handleSignUp}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Image
                source={
                  showConfirmPassword
                    ? require("../assets/eye-open.png")
                    : require("../assets/eye-closed.png")
                }
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={[styles.bottomText, styles.linkText]}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(141,157,246,1)",
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 60,
    paddingTop: 50,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 300,
    height: 200,
  },
  card: {
    width: "90%",
    backgroundColor: "rgba(29,29,130,1)",
    borderRadius: 40,
    paddingVertical: 35,
    paddingHorizontal: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "700",
    fontStyle: "italic",
    textAlign: "center",
  },
  subtitle: {
    color: "#f9f9f9",
    fontSize: 18,
    marginBottom: 25,
    fontStyle: "italic",
    opacity: 0.9,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 45,
    backgroundColor: "#E6E6E6",
    borderRadius: 27,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 15,
    color: "#1d1d82",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  eyeButton: {
    position: "absolute",
    right: 15,
    padding: 5,
  },
  eyeIcon: {
    width: 22,
    height: 22,

  },
  button: {
    width: 130,
    height: 45,
    backgroundColor: "#E6E6E6",
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#1d1d82",
    fontWeight: "bold",
    fontSize: 18,
  },
  bottomRow: {
    flexDirection: "row",
    marginTop: 25,
  },
  bottomText: {
    color: "#fbf8f8",
    fontSize: 16,
  },
  linkText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default SignUp;
