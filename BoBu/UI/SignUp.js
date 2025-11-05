import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
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

  // refs for inputs so "Next" focuses the next field nicely
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
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    const mobileRegex = /^[0-9]{7,15}$/;
    if (!mobileRegex.test(mobile)) {
      Alert.alert("Error", "Please enter a valid mobile number.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
   
    Alert.alert("Success", "Account created! Please log in.");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View style={styles.rect}>
        <Text style={styles.hello}>WELCOME!</Text>
        <Text style={styles.hello1}>Create your account</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#999"
          value={firstName}
          onChangeText={setFirstName}
          returnKeyType="next"
          onSubmitEditing={() => lastNameRef.current && lastNameRef.current.focus()}
          blurOnSubmit={false}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#999"
          value={lastName}
          onChangeText={setLastName}
          returnKeyType="next"
          ref={lastNameRef}
          onSubmitEditing={() => emailRef.current && emailRef.current.focus()}
          blurOnSubmit={false}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          returnKeyType="next"
          ref={emailRef}
          onSubmitEditing={() => mobileRef.current && mobileRef.current.focus()}
          blurOnSubmit={false}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="#999"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
          returnKeyType="next"
          ref={mobileRef}
          onSubmitEditing={() => usernameRef.current && usernameRef.current.focus()}
          blurOnSubmit={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          returnKeyType="next"
          ref={usernameRef}
          onSubmitEditing={() => passwordRef.current && passwordRef.current.focus()}
          blurOnSubmit={false}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          returnKeyType="next"
          ref={passwordRef}
          onSubmitEditing={() => confirmPasswordRef.current && confirmPasswordRef.current.focus()}
          blurOnSubmit={false}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          returnKeyType="done"
          ref={confirmPasswordRef}
          onSubmitEditing={() => {
            Keyboard.dismiss();
            handleSignUp();
          }}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.bottomText, styles.linkText]}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(141,157,246,1)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: 226,
    height: 236,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  rect: {
    width: "100%",
    backgroundColor: "rgba(29,29,130,1)",
    borderRadius: 50,
    paddingHorizontal: 36,
    paddingVertical: 40,
    alignItems: "center",
  },
  hello: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "700",
    fontStyle: "italic",
    marginBottom: 10,
    textAlign: "center",
  },
  hello1: {
    color: "#fbf8f8",
    fontSize: 24,
    fontStyle: "italic",
    marginBottom: 30,
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
  button: {
    width: 120,
    height: 45,
    backgroundColor: "#E6E6E6",
    borderRadius: 27,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontWeight: "bold",
    color: "#1d1d82",
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
