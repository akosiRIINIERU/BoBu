import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Login from "./UI/Login";
import SignUp from "./UI/SignUp";
import Dashboard from "./UI/Dashboard";
import Landlord from "./UI/Landlord";
import AboutUs from "./UI/AboutUs";

// Navi screens
import Chat from "./UI/navi/chat";
import Notifications from "./UI/navi/notification";
import Profile from "./UI/navi/Profile";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // hides top header bar for cleaner UI
        }}
      >
        {/* Auth Screens */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />

        {/* Main Screens */}
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Landlord" component={Landlord} />
        <Stack.Screen name="AboutUs" component={AboutUs} />

        {/* Navigation Screens */}
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
