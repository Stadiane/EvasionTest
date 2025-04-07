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
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import ResetPasswordScreen from "./app/screens/ResetPasswordScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import MapScreen from "./app/screens/MapScreen";
import { AuthProvider } from "./app/context/AuthContext";
import PaymentScreen from "./app/screens/PaymentScreen";
import { Ionicons } from "@expo/vector-icons";
import BookingValidationScreen from "./app/screens/BookingValidationScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="ProfileScreen"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Splash"
      component={SplashScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Accueil"
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
    <Stack.Screen name="Payment" component={PaymentScreen} />
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ResetPasswordScreen"
      component={ResetPasswordScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="BookingValidationScreen"
      component={BookingValidationScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === "Accueil") {
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
              name="Accueil"
              component={HomeStack}
              options={{ headerShown: false }}
            />
            <Tab.Screen name="Favoris" component={FavorisScreen} />
            <Tab.Screen name="Messages" component={MessagesScreen} />
            <Tab.Screen
              name="Compte"
              component={AuthStack}
              options={{ headerShown: false }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </AuthProvider>
  );
}
