import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useContext,
  useMemo,
} from "react";
import { ActivityIndicator, Text, View, TouchableOpacity } from "react-native";
import { fetchHotelDetails } from "../services/api";
import { Ionicons } from "@expo/vector-icons";
import HotelDetail from "../components/HotelDetail";
import { FavoritesContext } from "../context/FavoritesContext";
import styles from "../styles/HotelDetailStyles";

const HotelDetailScreen = ({ route, navigation }) => {
  const { hotelId } = route.params || {};
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

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

  const isFavorite = useMemo(
    () => favorites.some((fav) => fav.id === hotelId),
    [favorites, hotelId]
  );

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

  if (!hotelId) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>Erreur : ID d'hôtel invalide</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#498279" />
      </View>
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

export default HotelDetailScreen;
