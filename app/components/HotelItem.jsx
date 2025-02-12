import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Icônes

const HotelItem = ({ hotel, onPress, onToggleFavorite, isFavorite }) => {
  // Vérifier si une image existe
  const imageUrl =
    hotel.pictures && hotel.pictures.length > 0
      ? hotel.pictures[0].url
      : "https://via.placeholder.com/150"; // Image par défaut si vide

  // Vérifier et formater les prix
  const tripPrice = hotel.pricings?.min_trip_amount || "N/A"; // Valeur par défaut
  const nightPrice = hotel.pricings?.min_trip_amount_per_night || "N/A";

  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(hotel.id)}>
      {/* Conteneur principal en ligne */}
      <View style={styles.itemContainer}>
        {/* Image du logement */}
        <Image
          source={{ uri: imageUrl }}
          style={styles.itemImage}
          resizeMode="cover"
        />

        {/* Informations de l'hôtel à droite de l'image */}
        <View style={styles.infoContainer}>
          {/* Nom de l'hôtel */}
          <Text style={styles.itemTitle}>
            {hotel.name?.fr || "Nom indisponible"}
          </Text>

          {/* Adresse du logement */}
          <Text style={styles.address}>
            {hotel.address?.address1}, {hotel.address?.city}
            {hotel.address?.zipcode}
          </Text>

          {/* Tarifs */}
          <Text style={styles.price}>
            À partir de <Text style={{ fontWeight: "bold" }}>{tripPrice}€</Text>{" "}
            le séjour
          </Text>
          <Text style={styles.price}>
            <Text style={{ fontWeight: "bold" }}>{nightPrice}€</Text> / nuit
          </Text>

          <Text>Capacité maximale : {hotel.max_capacity || "N/A"}</Text>
          <Text>ID : {hotel.id}</Text>
        </View>
        {/* Icône pour favoris */}
        <TouchableOpacity onPress={onToggleFavorite}>
          <Icon
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color="#498279"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 5,
    marginVertical: 5,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemContainer: {
    flexDirection: "row", // Disposition en ligne
  },
  itemImage: {
    width: "50%",
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  infoContainer: {
    flex: 1, // Permet à la section des infos de prendre tout l'espace restant
    paddingLeft: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: { fontWeight: "bold", fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  address: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
  },
});

export default HotelItem;
