import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, StyleSheet, View } from "react-native";
import { fetchHotelDetails } from "../services/api";
import HotelDetail from "../components/HotelDetail";

const HotelDetailScreen = ({ route, navigation }) => {
  const { hotelId } = route.params || {};
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return <HotelDetail hotel={hotel} />;
};

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "red", textAlign: "center", marginTop: 10 },
});

export default HotelDetailScreen;
