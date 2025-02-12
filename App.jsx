import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./app/screens/HomeScreen";
import HotelDetailScreen from "./app/screens/HotelDetailScreen";
import FavorisScreen from "./app/screens/FavorisScreen";
import MessagesScreen from "./app/screens/MessagesScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    {/* Masquer le titre "Accueil" dans le stack */}
    <Stack.Screen
      name="Acceuil"
      component={HomeScreen}
      options={{ headerShown: false }} // Masque le header
    />
    <Stack.Screen name="HotelDetail" component={HotelDetailScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Acceuil") {
              iconName = "home";
            } else if (route.name === "Favoris") {
              iconName = "heart";
            } else if (route.name === "Messages") {
              iconName = "chatbubble";
            } else if (route.name === "Compte") {
              iconName = "person";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#2C3E50",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { backgroundColor: "#fff", paddingBottom: 5 },
        })}
      >
        <Tab.Screen
          name="Acceuil"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Favoris" component={FavorisScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Compte" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
