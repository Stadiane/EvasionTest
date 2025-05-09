import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import HotelDetail from "../components/HotelDetail";
import MapView, { Marker, Callout } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

const MapScreen = ({ route, navigation }) => {
  const { hotels = [], focusHotelId } = route.params || {}; // Utilisation de 'hotels' directement
  const { hotelID } = route.params; // Récupère l'ID de l'hôtel
  const [loading, setLoading] = useState(true);
  const [hotelLocations, setHotelLocations] = useState([]);
  const [region, setRegion] = useState({
    latitude: 48.8566, // Valeur par défaut (Paris)
    longitude: 2.3522, // Valeur par défaut (Paris)
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const hotelsToDisplay = hotels;

  useEffect(() => {
    console.log("hotels", hotels); // Affiche tous les hôtels pour voir ce qui est chargé

    if (hotelsToDisplay.length > 0) {
      const fetchLocations = async () => {
        const locations = await Promise.all(
          hotelsToDisplay.map(async (hotel) => {
            // Vérification de l'existence de l'adresse avant de faire la requête
            if (
              !hotel.address?.address1 ||
              !hotel.address?.city ||
              !hotel.address?.zipcode
            ) {
              console.warn(
                ` Adresse manquante pour l'hôtel : ${
                  hotel.name?.fr || "Nom inconnu"
                }`
              );
              return null; // Si l'adresse est manquante, on ignore cet hôtel
            }

            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/search?street=${encodeURIComponent(
                  hotel.address?.address1
                )}&city=${encodeURIComponent(hotel.address?.city)}&postalcode=${
                  hotel.address?.zipcode
                }&format=json`
              );
              const data = await response.json();
              if (data.length > 0) {
                return {
                  ...hotel,
                  latitude: parseFloat(data[0].lat),
                  longitude: parseFloat(data[0].lon),
                };
              } else {
                console.warn(
                  `Coordonnées non trouvées pour l'hôtel : ${hotel.name?.fr}`
                );
              }
            } catch (error) {
              console.error(
                "Erreur lors de la récupération des coordonnées :",
                error
              );
            }
            return null; // Retourne null si aucune coordonnée n'est trouvée
          })
        );

        // Affichage des hôtels qui ont des coordonnées valides
        const validLocations = locations.filter((loc) => loc !== null);
        console.log("Les hôtels validés avec coordonnées :", validLocations); // Vérifie les hôtels validés

        // Affichage des hôtels qui n'ont pas de coordonnées
        const invalidLocations = locations.filter((loc) => loc === null);
        console.log("Les hôtels sans coordonnées :", invalidLocations); // Vérifie les hôtels sans coordonnées

        // Si vous avez des hôtels avec les mêmes coordonnées, les ajuster légèrement
        const addOffsetToDuplicates = (locations) => {
          const seen = new Map();

          return locations.map((hotel) => {
            const key = `${hotel.latitude},${hotel.longitude}`;
            if (seen.has(key)) {
              const count = seen.get(key);
              seen.set(key, count + 1);
              const adjustedHotel = {
                ...hotel,
                latitude: hotel.latitude + count * 0.0001, // Ajout d'un léger décalage
                longitude: hotel.longitude + count * 0.0001, // Ajout d'un léger décalage
              };
              console.log(`Ajustement de l'hôtel: ${hotel.name?.fr}`);
              return adjustedHotel;
            } else {
              seen.set(key, 1);
              return hotel;
            }
          });
        };

        const adjustedLocations = addOffsetToDuplicates(validLocations);

        // Calcul de la région pour englober tous les hôtels
        if (adjustedLocations.length > 0) {
          const latitudes = adjustedLocations.map((hotel) => hotel.latitude);
          const longitudes = adjustedLocations.map((hotel) => hotel.longitude);

          const minLatitude = Math.min(...latitudes);
          const maxLatitude = Math.max(...latitudes);
          const minLongitude = Math.min(...longitudes);
          const maxLongitude = Math.max(...longitudes);

          const latitudeDelta = maxLatitude - minLatitude;
          const longitudeDelta = maxLongitude - minLongitude;

          // Ajuste un peu plus d'espace autour des hôtels pour éviter que la carte soit trop serrée
          const zoomFactor = 1.5; // Ajustez ce facteur pour contrôler le niveau de zoom
          setRegion({
            latitude: (maxLatitude + minLatitude) / 2, // Centre de la carte
            longitude: (maxLongitude + minLongitude) / 2, // Centre de la carte
            latitudeDelta: latitudeDelta * zoomFactor,
            longitudeDelta: longitudeDelta * zoomFactor,
          });
        }

        setHotelLocations(adjustedLocations);
        // Pour centrer sur un hôtel spécifique
        if (focusHotelId) {
          const focusedHotel = adjustedLocations.find(
            (h) => h.id === focusHotelId
          );
          if (focusedHotel) {
            setRegion({
              latitude: focusedHotel.latitude,
              longitude: focusedHotel.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          }
        }
        setLoading(false);

        // Log du nombre d'hôtels affichés sur la carte
        console.log(
          "Nombre d'hôtels affichés sur la carte:",
          adjustedLocations.length
        );
      };

      fetchLocations();
    } else {
      setLoading(false);
    }
  }, [hotelsToDisplay]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#498279" />
        <Text>Chargement de la carte...</Text>
      </View>
    );
  }

  console.log("hotelLocations", hotelLocations); // Vérifie si hotelLocations contient bien des hôtels

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region} // Utilisation de la région calculée
        showsUserLocation={true} // Affichage de la position de l'utilisateur, facultatif
        loadingEnabled={true} // Permet d'afficher un écran de chargement si la carte est en attente de données
      >
        {hotelLocations.map((hotel, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: hotel.latitude,
              longitude: hotel.longitude,
            }}
          >
            {/* Numérotation des hôtels et Affiche une icône simple si un seul hôtel est visible */}
            {hotelLocations.length === 1 ? (
              <Ionicons
                name="location-sharp"
                size={60}
                color="rgb(189, 8, 8)"
              />
            ) : (
              <View style={styles.markerContainer}>
                <Text style={styles.markerText}>{index + 1}</Text>
              </View>
            )}
            <Callout
              onPress={() => {
                console.log("Navigation vers l'hôtel ID :", hotel.id);
                navigation.navigate("HotelDetail", { hotelId: hotel.id });
              }}
            >
              <View style={styles.calloutContainer}>
                {/* Image de l'hôtel */}
                {hotel.pictures?.length > 0 && (
                  <Image
                    source={{ uri: hotel.pictures[0].url }}
                    style={styles.calloutImage}
                    resizeMode="cover"
                  />
                )}
                {/* Nom de l'hôtel */}
                <Text style={styles.calloutTitle}>
                  {hotel.name?.fr || "Nom inconnu"}
                </Text>

                {/* Prix de l'hôtel */}
                {hotel.pricings?.min_trip_amount && (
                  <Text style={styles.calloutPrice}>
                    {hotel.pricings.min_trip_amount}€ / nuit
                  </Text>
                )}

                {/* Adresse de l'hôtel */}
                {hotel.address && (
                  <Text style={styles.calloutAddress}>
                    {hotel.address.address1}, {hotel.address.city},{" "}
                    {hotel.address.zipcode}
                  </Text>
                )}

                {/* Description de l'hôtel (si disponible) */}
                {hotel.description && (
                  <Text style={styles.calloutDescription}>
                    {hotel.description.length > 100
                      ? hotel.description.substring(0, 100) + "..." // Limiter la longueur de la description
                      : hotel.description}
                  </Text>
                )}
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  calloutContainer: {
    alignItems: "center",
    padding: 5,
    maxWidth: 200,
    maxHeight: 200,
  },
  calloutImage: { width: 150, height: 100, borderRadius: 10, marginBottom: 5 },
  calloutTitle: { fontSize: 14, fontWeight: "bold", textAlign: "center" },
  calloutPrice: { fontSize: 14, color: "#ff5722", textAlign: "center" },
  calloutAddress: { fontSize: 12, textAlign: "center", color: "#555" },
  calloutDescription: {
    fontSize: 12,
    textAlign: "center",
    color: "#777",
    marginTop: 5,
  },
  markerContainer: {
    backgroundColor: "#498279",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  markerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default MapScreen;
