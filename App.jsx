import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./app/screens/HomeScreen";
import SplashScreen from "./app/screens/SplashScreen";
import { FavoritesProvider } from "./app/context/FavoritesContext";
import HotelDetailScreen from "./app/screens/HotelDetailScreen";
import FavorisScreen from "./app/screens/FavorisScreen";
import MessagesScreen from "./app/screens/MessagesScreen";
import BookingScreen from "./app/screens/BookingScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import MapScreen from "./app/screens/MapScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Splash"
      component={SplashScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Acceuil"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="HotelDetail" component={HotelDetailScreen} />
    <Stack.Screen name="FavorisScreen" component={FavorisScreen} />
    <Stack.Screen
      name="BookingScreen"
      component={BookingScreen}
      options={{ title: "Réserver" }}
    />
    <Stack.Screen name="Carte" component={MapScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <FavoritesProvider>
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
              } else if (route.name === "Carte") {
                iconName = "map";
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
    </FavoritesProvider>
  );
}
