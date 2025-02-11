import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";

// URLs pour la lise et les details des structures
const API_URL = "https://api.staging.cloudspire.io/partners/hotels";
const DETAIL_API_URL = "https://api.staging.cloudspire.io/partners/hotels/";

// Token d'authentification
const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjMWMxYTQ3ZTJiNWQ0ZWYzOGIxNzAwMjg5N2NkY2ZjOSIsInVzZXJDbGFzcyI6IlBhcnRuZXIiLCJ1c2VyUmVmIjoiUDI1MDAwMTM0NyIsIm5iZiI6IjE3Mzg3NTI4ODgiLCJpYXQiOiIxNzM4NzUyODg4IiwiZXhwIjoiMTczODc2MDA4OCJ9.CNwAygE01JX-oprxSSK5CxUD-uoTsAhhly2juMjWKB8";

const HomeScreen = () => {
  // États pour stocker les données, erreurs et état de chargement
  const [data, setData] = useState([]); // Liste des hôtels
  const [loading, setLoading] = useState(true); // chargement
  const [error, setError] = useState(null); // erreurs
  const [selectedHotel, setSelectedHotel] = useState(null); // Hôtel sélectionné

  // useEffect pour récupérer la liste des hôtels au chargement
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });
        setData(response.data.data); // Stocke la liste des hôtels
      } catch (err) {
        setError("Impossible de récupérer les hôtels.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Récupère les détails d'un hôtel spécifique
  const fetchHotelDetails = async (hotelId) => {
    setLoading(true);
    setError(null);
    setSelectedHotel(null); // Réinitialise l'hôtel sélectionné avant de charger

    try {
      const response = await axios.get(DETAIL_API_URL + hotelId, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      setSelectedHotel(response.data.data); // Stocke les détails de l'hôtel
    } catch (err) {
      setError("Impossible de récupérer les détails de l'hôtel.");
    } finally {
      setLoading(false);
    }
  };

  //  Loadder si les données sont en train de charger
  if (loading && !selectedHotel) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }

  // Message d'erreur si problème
  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {selectedHotel ? (
        // Affichage des détails de l'hôtel sélectionné
        <ScrollView>
          {/* Nom et Titre */}
          <Text style={styles.title}>
            {selectedHotel.title?.fr || "Titre indisponible"}
          </Text>
          <Text style={styles.subtitle}>
            {selectedHotel.name?.fr || "Nom indisponible"}
          </Text>

          {/* Capacité et Surface */}
          <Text>
            Capacité : {selectedHotel.min_capacity} -{" "}
            {selectedHotel.max_capacity} pers.
          </Text>
          <Text>Surface : {selectedHotel.surface} m²</Text>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text>
            {selectedHotel.descriptions?.about?.fr ||
              "Pas de description disponible"}
          </Text>

          {/* Adresse */}
          <Text style={styles.sectionTitle}>Adresse</Text>
          <Text>
            {selectedHotel.address?.address1}, {selectedHotel.address?.city},{" "}
            {selectedHotel.address?.zipcode}
          </Text>

          {/* Photos */}
          <ScrollView horizontal>
            {selectedHotel.pictures?.map((pic, index) => (
              <Image
                key={index}
                source={{ uri: pic.url }}
                style={styles.detailImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          {/* Tarifs */}
          <Text style={styles.sectionTitle}>Tarifs</Text>
          <Text>
            À partir de {selectedHotel.pricings?.min_trip_amount}€ le séjour
          </Text>
          <Text>
            À partir de {selectedHotel.pricings?.min_trip_amount_per_night}€ /
            nuit
          </Text>

          {/* Contact */}
          <Text style={styles.sectionTitle}>Contact</Text>
          <Text>Email : {selectedHotel.channel?.email}</Text>
          <Text>Téléphone : {selectedHotel.channel?.phone}</Text>
        </ScrollView>
      ) : (
        // Affichage de la liste des hôtels
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString}
          renderItem={({ item }) => {
            console.log(item);
            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() => fetchHotelDetails(item.id)}
              >
                {/* Vérification si des images sont disponibles */}
                {item.pictures && item.pictures.length > 0 ? (
                  <Image
                    source={{ uri: item.pictures[0].url }} // Afficher la première image
                    style={styles.itemImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Text>Aucune image disponible</Text> // Message alternatif si pas d'image
                )}
                <Text style={styles.itemTitle}>
                  {item.name?.fr || "Nom indisponible"}
                </Text>
                <Text>Capacité maximale : {item.max_capacity || "N/A"}</Text>
                <Text>ID : {item.id}</Text>
                <Text>État : {item.state || "Non spécifié"}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

// Styles pour les composants
const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "red", textAlign: "center", marginTop: 10 },
  item: {
    padding: 5,
    marginVertical: 5,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  itemImage: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#fff",
    alignSelf: "center",
  },
  detailImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#fff",
    alignSelf: "center",
  },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 18, color: "gray", textAlign: "center" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  itemTitle: { fontWeight: "bold", fontSize: 16 },
});

export default HomeScreen;
