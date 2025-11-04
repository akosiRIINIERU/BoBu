import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.rectStack}>
        <View style={styles.rect}>
          <Text style={styles.hello}>HELLO!</Text>
          <Text style={styles.hello1}>Log in to get started!</Text>

          <View style={styles.rect2}></View>
          <View style={styles.rect3}></View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Dashboard")}
            style={styles.button}
          >
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.or}>or</Text>

          <View style={styles.button1Row}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Dashboard")}
              style={styles.button1}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("Dashboard")}
              style={styles.button2}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("Dashboard")}
              style={styles.button3}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("Dashboard")}
              style={styles.button4}
            />
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

        <Image
          source={require("../assets/logo.png")} // ✅ FIXED PATH
          resizeMode="contain"
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(141,157,246,1)",
  },
  rect: {
    top: 193,
    width: "100%",
    height: 638,
    position: "absolute",
    backgroundColor: "rgba(29,29,130,1)",
    borderRadius: 50,
  },
  hello: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "700",
    fontStyle: "italic",
    marginTop: 43,
    marginLeft: 111,
  },
  hello1: {
    color: "#fbf8f8",
    fontSize: 24,
    fontStyle: "italic",
    marginLeft: 80,
  },
  rect2: {
    width: 304,
    height: 37,
    backgroundColor: "#E6E6E6",
    borderRadius: 27,
    marginTop: 53,
    marginLeft: 36,
  },
  rect3: {
    width: 304,
    height: 37,
    backgroundColor: "#E6E6E6",
    borderRadius: 27,
    marginTop: 10,
    marginLeft: 36,
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: "#E6E6E6",
    borderRadius: 21,
    marginTop: 20,
    alignSelf: "center",
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
  button1: {
    width: 49,
    height: 45,
    backgroundColor: "#E6E6E6",
  },
  button2: {
    width: 49,
    height: 45,
    backgroundColor: "#E6E6E6",
    marginLeft: 26,
  },
  button3: {
    width: 49,
    height: 45,
    backgroundColor: "#E6E6E6",
    marginLeft: 21,
  },
  button4: {
    width: 49,
    height: 45,
    backgroundColor: "#E6E6E6",
    marginLeft: 26,
  },
  button1Row: {
    height: 45,
    flexDirection: "row",
    marginTop: 34,
    marginLeft: 53,
    marginRight: 53,
    justifyContent: "center",
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
  image: {
    top: 0,
    left: 74,
    width: 226,
    height: 236,
    position: "absolute",
  },
  rectStack: {
    width: "100%",
    height: 831,
  },
});

export default Login;
