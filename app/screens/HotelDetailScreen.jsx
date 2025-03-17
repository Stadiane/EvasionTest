import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useContext,
  useMemo,
} from "react";
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { fetchHotelDetails } from "../services/api";
import { Ionicons } from "@expo/vector-icons";
import HotelDetail from "../components/HotelDetail";
import { FavoritesContext } from "../context/FavoritesContext";

const HotelDetailScreen = ({ route, navigation }) => {
  const { hotelId } = route.params || {};
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

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

  // Vérifier si l'hôtel est en favoris en temps réel
  const isFavorite = useMemo(
    () => favorites.some((fav) => fav.id === hotelId),
    [favorites, hotelId]
  );

  // Ajouter le bouton cœur en haut à droite de l'écran
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => toggleFavorite(hotel)}
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
  }, [navigation, isFavorite, hotel]);

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
      onToggleFavorite={() => toggleFavorite(hotel)}
      navigation={navigation}
    />
  );
};

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "red", textAlign: "center", marginTop: 10 },
});

export default HotelDetailScreen;
