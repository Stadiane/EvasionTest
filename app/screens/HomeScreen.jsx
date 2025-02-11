import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fetchHotels } from "../services/api";
import HotelItem from "../components/HotelItem"; // Import du composant HotelItem
import Icon from "react-native-vector-icons/Ionicons";

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const hotels = await fetchHotels();
        console.log("Données reçues :", hotels); // Debug
        setData(hotels || []); // Évite `undefined`
      } catch (err) {
        setError("Impossible de récupérer les hôtels");
      } finally {
        setLoading(false);
      }
    };
    loadHotels();
  }, []);

  if (loading) return <Text>Chargement...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      {/* Barre de recherche avec icône à droite */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Rechercher ..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          onPress={() => console.log("Recherche lancée")}
          style={styles.searchIcon}
        >
          <Icon name="search" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()} // Utiliser `id` comme clé unique
        renderItem={({ item }) => (
          <HotelItem
            hotel={item} // Passer l'hôtel au composant HotelItem
            onPress={(hotelId) =>
              navigation.navigate("HotelDetail", { hotelId })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // Aligne la barre de recherche à droite
    alignItems: "center", // Aligne l'icône verticalement avec la barre de recherche
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    width: "30%", // Ne pas laisser la barre trop longue
    marginRight: 10, // Espacement entre la barre et l'icône
  },
  searchIcon: {
    padding: 5,
    borderRadius: 25,
    backgroundColor: "#eee", // Ajoute un fond à l'icône pour la rendre visible
  },
});

export default HomeScreen;
