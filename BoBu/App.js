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

// New landlord sub-screens
import Listings from "./UI/navi/Listings";
import Tenants from "./UI/navi/Tenants";
import Payments from "./UI/navi/Payments";
import Notificationll from "./UI/navi/notificationll";
import TenantProfile from "./UI/TenantProfile";
import LandlordChat from "./UI/navi/LandlordChat";
import LandlordProfile from "./UI/navi/LandlordProfile";



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Auth Screens */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />

        {/* Tenant Screens */}
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="Notifications" component={Notifications} />

        {/* Landlord Screens */}
        <Stack.Screen name="Landlord" component={Landlord} />
        <Stack.Screen name="Listings" component={Listings} />
        <Stack.Screen name="Tenants" component={Tenants} />
        <Stack.Screen name="Payments" component={Payments} />
        <Stack.Screen name="Notificationll" component={Notificationll} />
        <Stack.Screen name="TenantProfile" component={TenantProfile} />
        <Stack.Screen name="LandlordChat" component={LandlordChat} />
        <Stack.Screen name="LandlordProfile" component={LandlordProfile}/>

        

        {/* Navigation Screens */}
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Profile" component={Profile} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
