import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";

import LandlordDashboard from "../screens/Landlord";
import Listings from "../screens/Listings";
import Tenants from "../screens/Tenants";
import Payments from "../screens/Payments";
import Notifications from "../screens/Notifications";

const Tab = createBottomTabNavigator();

export default function LandlordTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1D1D82",
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarActiveTintColor: "#FFD700",
        tabBarInactiveTintColor: "#E6E6E6",
      }}
    >
     <Tab.Screen name="Landlord" component={Landlord}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>🏠</Text>,
        }}
      />

      <Tab.Screen
        name="Listings"
        component={Listings}
        options={{
          tabBarLabel: "Listings",
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>📋</Text>,
        }}
      />

      <Tab.Screen
        name="Tenants"
        component={Tenants}
        options={{
          tabBarLabel: "Tenants",
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>👥</Text>,
        }}
      />

      <Tab.Screen
        name="Payments"
        component={Payments}
        options={{
          tabBarLabel: "Payments",
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>💰</Text>,
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: "Alerts",
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>🔔</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
