import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./UI/Login";
import Dashboard from "./UI/Dashboard";
import SignUp from "./UI/SignUp";
import AboutUs from "./UI/AboutUs";
import Landlord from "./UI/Landlord";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // hides the default header for a cleaner UI
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="Landlord" component={Landlord} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
