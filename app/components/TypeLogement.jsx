import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import des icônes
import { fetchHotels } from "../services/api"; // Assure-toi que cette fonction est correctement définie et exportée

// Mapping des types de logement avec des icônes valides
const typeMapping = {
  G: { label: "Gîte", icon: "home" }, // Gîte
  H: { label: "Maison d'hôtes", icon: "bed" }, // Maison d'hôtes
  C: { label: "Camping", icon: "leaf" }, // Camping
  E: { label: "Gîte d'étape", icon: "bicycle" }, // Gîte d'étape
  P: { label: "Gîte de groupe", icon: "people" }, // Gîte de groupe
};

const TypeLogement = () => {
  const [housingTypes, setHousingTypes] = useState([]);

  useEffect(() => {
    const fetchHousingTypes = async () => {
      try {
        const hotels = await fetchHotels(); // Récupérer la liste des hôtels
        const typesSet = new Set(hotels.map((hotel) => hotel.type)); // Extraire les types uniques
        const typesList = [...typesSet]
          .map((type) => typeMapping[type])
          .filter((type) => type !== undefined);

        setHousingTypes(typesList); // Mettre à jour les types de logements
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des types de logements :",
          error
        );
      }
    };

    fetchHousingTypes();
  }, []);

  return (
    <View>
      <Text style={styles.title}>Type de logements</Text>
      <FlatList
        horizontal
        data={housingTypes}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.typeButton}>
            {/* Affichage de l'icône */}
            <Icon name={item.icon} size={30} color="#498279" />
            {/* Affichage du texte du type de logement */}
            <Text style={styles.typeText}>{item.label}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  typeButton: {
    margin: 5,
    padding: 10,
    borderRadius: 20,
    alignItems: "center", // Aligne l'icône et le texte au centre
  },
  typeText: {
    fontSize: 16,
    color: "#333",
    marginTop: 5, // Espacement entre l'icône et le texte
  },
});

export default TypeLogement;
