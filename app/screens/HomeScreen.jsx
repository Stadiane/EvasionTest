import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { fetchHotels, fetchHotelDetails } from "../services/api";
import * as Location from "expo-location"; // Importer Expo Location
import HotelItem from "../components/HotelItem"; // Import du composant HotelItem
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import TypeLogement from "../components/TypeLogement";
import { DeviceEventEmitter } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // Import pour mise à jour en temps réel
import { Dimensions } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Liste filtrée des hôtels
  const [search, setSearch] = useState(""); // Valeur de la recherche
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [city, setCity] = useState("Chargement...");

  const { width } = Dimensions.get("window");
  const [favoritesKey, setFavoritesKey] = useState(0);

  // Fonction pour récupérer la ville et le département
  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setCity("Permission refusée");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Appel à l'API OpenStreetMap pour récupérer la ville et le département
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();

      const ville =
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        "Ville inconnue";
      const codeDept = data.address?.postcode
        ? data.address.postcode.slice(0, 2)
        : "XX"; // Extrait les 2 premiers chiffres du code postal
      const pays = data.address?.country || "Pays inconnu";

      setCity(`${ville} (${codeDept}), ${pays}`);
    } catch (error) {
      console.error("Erreur lors de la récupération de la ville :", error);
      setCity("Impossible de récupérer la ville");
    }
  };

  // Charger les hôtels, favoris et la localisation au démarrage
  useEffect(() => {
    loadHotels();
    loadFavorites();
    getLocation();
    const reloadFavorites = () => {
      console.log("Mise à jour des favoris détectée !");
      loadFavorites();
    };

    // Écouter l'événement au montage du composant
    const subscription = DeviceEventEmitter.addListener(
      "favoritesUpdated",
      reloadFavorites
    );
    return () => {
      subscription.remove(); // Nettoyer l'écouteur pour éviter les fuites mémoire
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadHotels = async () => {
    try {
      const hotels = await fetchHotels(); // Récupérer la liste des hôtels
      const hotelsWithDetails = await Promise.all(
        hotels.map(async (hotel) => {
          const details = await fetchHotelDetails(hotel.id); // Récupérer les détails de chaque hôtel
          return { ...hotel, ...details }; // Fusionner les informations de base et les détails
        })
      );

      setData(hotelsWithDetails); // Mettre à jour la liste des hôtels avec les détails
      setFilteredData(hotelsWithDetails); // Mettre à jour la liste filtrée
    } catch (err) {
      setError("Impossible de récupérer les hôtels");
    } finally {
      setLoading(false);
    }
  };

  // Charger les favoris depuis AsyncStorage
  const loadFavorites = async () => {
    const storedFavorites = await AsyncStorage.getItem("favorites");
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    // Vérification pour s'assurer que tous les objets dans les favoris ont une propriété id valide
    const validFavorites = favorites.filter((fav) => fav && fav.id);
    setFavorites(validFavorites);

    setFavoritesKey((prev) => prev + 1); // Change la clé pour forcer le re-render
  };

  // Ajouter ou retirer un favori
  const toggleFavorite = async (hotel) => {
    let updatedFavorites = [...favorites];

    const index = updatedFavorites.findIndex((fav) => fav.id === hotel.id);
    if (index === -1) {
      updatedFavorites.push(hotel); // Si l'hôtel n'est pas encore un favori, on l'ajoute
    } else {
      updatedFavorites.splice(index, 1); // Si l'hôtel est déjà un favori, on le supprime
    }

    setFavorites(updatedFavorites); // Mettre à jour les favoris dans l'état local
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Sauvegarder les favoris dans AsyncStorage
  };

  //Fonction de recherche
  const handleSearch = (text) => {
    setSearch(text);

    // Filtrer les hôtels par nom ou ville
    const filtered = data.filter((hotel) => {
      const name = hotel.name?.fr ? hotel.name.fr.toLowerCase() : "";
      const address1 = hotel.address?.address1
        ? hotel.address.address1.toLowerCase()
        : "";
      const city = hotel.address?.city ? hotel.address.city.toLowerCase() : "";

      return (
        name.includes(text.toLowerCase()) ||
        city.includes(text.toLowerCase()) ||
        address1.includes(text.toLowerCase())
      );
    });

    // Mettre à jour la liste filtrée
    setFilteredData(filtered);
  };

  if (loading) return <Text>Chargement...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      {/* Affichage de la ville avec icône */}
      <View style={styles.locationContainer}>
        <Icon
          name="location-outline"
          size={20}
          color="white"
          style={styles.locationIcon}
        />
        <Text style={styles.locationText}>{city}</Text>

        {/* Barre de recherche avec icône à droite */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Où souhaitez-vous aller ?"
            placeholderTextColor="#498279"
            value={search}
            onChangeText={handleSearch}
          />
          <Icon
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
        </View>
      </View>
      {/* Section des types de logements */}
      <TypeLogement />
      {/* Liste filtrée des hôtels */}
      <FlatList
        key={favoritesKey} // clé pour forcer le re-render
        data={filteredData}
        keyExtractor={(item) => (item.id ? item.id.toString() : "default")} // Utiliser `id` comme clé unique
        renderItem={({ item }) => (
          <HotelItem
            hotel={item} // Passer l'hôtel au composant HotelItem
            onPress={() =>
              // Naviguer vers la page de détails de l'hôtel
              navigation.navigate("HotelDetail", { hotelId: item.id })
            }
            onToggleFavorite={() => toggleFavorite(item)} // Mise à jour des favoris
            isFavorite={
              item && item.id && favorites.some((fav) => fav.id === item.id)
            } // Vérifier si l'hôtel est en favoris
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun résultat</Text>
          </View>
        }
      />
      {/* Bouton pour aller à la carte */}
      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => navigation.navigate("Carte", { hotels: data })} // Envoi de `hotels`
      >
        <Text style={styles.mapButtonText}>Voir la carte</Text>
      </TouchableOpacity>
    </View>
  );
};
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  Titre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    flexDirection: "row",
    width: "135%",
    justifyContent: "center",
    marginTop: 10,
    position: "absolute", // Positionner la barre de recherche en bas de la localisation
    bottom: 30,
    left: 10,
    right: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    elevation: 3, // Ombre pour un effet moderne
    width: width * 0.8, // 80% de la largeur de l'écran
    maxWidth: 400, // Limiter la largeur maximale à 400 px pour les grands écrans
    fontSize: 16,
    color: "#333",
    paddingLeft: 40,
  },
  searchIcon: {
    position: "absolute",
    left: 20,
    top: "30%",
    zIndex: 1,
    color: "#498279",
    transform: [{ translateY: -10 }],
  },
  locationContainer: {
    flexDirection: "row",
    height: "25%",
    justifyContent: "left",
    backgroundColor: "#498279", // Fond vert
    position: "relative",
    padding: 60,
  },
  locationIcon: {
    marginRight: 5, // Espacement entre l'icône et le texte
  },
  locationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  mapButton: {
    backgroundColor: "#498279",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  mapButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  typeButton: {
    backgroundColor: "#ddd",
    margin: 5,
    padding: 10,
    width: "100",
    height: "50",
    borderRadius: 20,
  },
  typeText: {
    fontSize: 16,
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
});

export default HomeScreen;
