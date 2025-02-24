import React, { useEffect, useState, useLayoutEffect } from "react";
import { ActivityIndicator, Text, StyleSheet, View } from "react-native";
import { fetchHotelDetails } from "../services/api";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HotelDetail from "../components/HotelDetail";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { DeviceEventEmitter } from "react-native";

const HotelDetailScreen = ({ route, navigation, onToggleFavorite }) => {
  const { hotelId } = route.params || {};
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!hotelId) {
    console.error("hotelId est invalide :", hotelId);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>Erreur : ID d'hôtel invalide</Text>
      </View>
    );
  }

  // Charger les détails de l'hôtel
  useEffect(() => {
    const loadHotelDetails = async () => {
      try {
        const hotelDetails = await fetchHotelDetails(hotelId);
        setHotel(hotelDetails);
      } catch (err) {
        setError("Impossible de récupérer les détails de l'hôtel");
      } finally {
        setLoading(false);
      }
    };
    loadHotelDetails();
  }, [hotelId]);

  // Vérifier si l'hôtel est déjà en favoris
  useFocusEffect(
    useCallback(() => {
      const checkIfFavorite = async () => {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        setIsFavorite(favorites.some((fav) => fav.id === hotelId));
      };
      checkIfFavorite();
    }, [hotelId])
  );

  // Ajouter / retirer un hôtel des favoris
  const handleToggleFavorite = async () => {
    const storedFavorites = await AsyncStorage.getItem("favorites");
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (hotel) {
      if (isFavorite) {
        favorites = favorites.filter(
          (fav) => fav.id.toString() !== hotelId.toString()
        );
      } else {
        favorites.push(hotel);
      }
    }
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    // Mettre à jour immédiatement l'état `isFavorite`
    setIsFavorite(!isFavorite);

    await new Promise((resolve) => setTimeout(resolve, 100)); // Attendre 100ms
    // Notifier les autres écrans de la mise à jour
    DeviceEventEmitter.emit("favoritesUpdated");
  };

  // Ajouter le bouton cœur en haut à droite de l'écran
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={{ marginRight: 15 }}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={30}
            color="#498279"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isFavorite]);
  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <HotelDetail
      hotel={hotel}
      isFavorite={isFavorite}
      onToggleFavorite={handleToggleFavorite}
    />
  );
};

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "red", textAlign: "center", marginTop: 10 },
});

export default HotelDetailScreen;
