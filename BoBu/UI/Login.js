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

function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const passwordInputRef = useRef(null);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error", "Username and password cannot be empty!");
      return;
    }

    if (password !== "admin") {
      Alert.alert("Error", "Invalid password.");
      return;
    }

    if (username === "admin" || username === "tenant") {
      navigation.navigate("Dashboard");
    } else if (username === "landlord") {
      navigation.navigate("Landlord");
    } else {
      Alert.alert("Error", "Invalid username or password.");
    }
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
        <Text style={styles.hello}>HELLO!</Text>
        <Text style={styles.hello1}>Log in to get started!</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          returnKeyType="next"
          onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
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
          returnKeyType="done"
          ref={passwordInputRef}
          onSubmitEditing={() => {
            Keyboard.dismiss();
            handleLogin();
          }}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.or}>or</Text>

        <View style={styles.button1Row}>
          <TouchableOpacity
            onPress={() => openLink("https://www.facebook.com/marheanb")}
            style={styles.socialButton}
          >
            <Image
              source={require("../assets/Facebook.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => openLink("https://www.instagram.com/oompa.lumpia69")}
            style={styles.socialButton}
          >
            <Image
              source={require("../assets/Insta.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => openLink("https://github.com/akosiRIINIERU")}
            style={styles.socialButton}
          >
            <Image
              source={require("../assets/github.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => openLink("https://https://www.reddit.com/user/shinjikisushi")}
            style={styles.socialButton}
          >
            <Image
              source={require("../assets/reddit.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.button5Row}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AboutUs")}
            style={styles.button5}
          >
            <Text style={styles.btnTextSmall}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={styles.button6}
          >
            <Text style={styles.btnTextSmall}>Sign Up</Text>
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
    width: 100,
    height: 40,
    backgroundColor: "#E6E6E6",
    borderRadius: 21,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontWeight: "bold",
    color: "#1d1d82",
  },
  or: {
    color: "rgba(251,248,248,1)",
    fontSize: 24,
    opacity: 0.6,
    marginTop: 33,
    textAlign: "center",
  },
  button1Row: {
    height: 60,
    flexDirection: "row",
    marginTop: 34,
    justifyContent: "space-around",
    width: "80%",
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
    width: 30,
    height: 30,
  },
  button5: {
    width: 80,
    height: 35,
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  button6: {
    width: 80,
    height: 35,
    backgroundColor: "#E6E6E6",
    marginLeft: 120,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  button5Row: {
    height: 28,
    flexDirection: "row",
    marginTop: 88,
    marginLeft: 53,
    marginRight: 50,
  },
  btnTextSmall: {
    color: "#1d1d82",
    fontWeight: "bold",
  },
});

export default Login;
