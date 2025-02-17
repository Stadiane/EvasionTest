import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fetchHotels } from "../services/api"; // Assure-toi que cette fonction est correcte

const typeMapping = {
  G: "Gîte",
  H: "Maison d'hôtes",
  C: "Camping",
  E: "Gîte d'étape",
  P: "Gîte de groupe",
};

const TypeLogement = () => {
  const [housingTypes, setHousingTypes] = useState([]);

  useEffect(() => {
    const fetchHousingTypes = async () => {
      try {
        const hotels = await fetchHotels(); // Récupérer la liste des hôtels

        // Extraire les types uniques et les mapper avec leurs descriptions
        const typesSet = new Set(hotels.map((hotel) => hotel.type));
        const typesList = [...typesSet]
          .map((type) => typeMapping[type])
          .filter((type) => type !== undefined);

        setHousingTypes(typesList);
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
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.typeButton}>
            <Text style={styles.typeText}>{item}</Text>
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
    backgroundColor: "#ddd",
    margin: 5,
    padding: 10,
    borderRadius: 20,
  },
  typeText: {
    fontSize: 16,
    color: "#333",
  },
});

export default TypeLogement;
