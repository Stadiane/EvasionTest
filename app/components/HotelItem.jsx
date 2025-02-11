import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const HotelItem = ({ hotel, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={() => onPress(hotel.id)}>
    {/*{hotel.pictures && hotel.pictures.length > 0 && (
      <Image
        source={{ uri: hotel.pictures[0].url }}
        style={styles.itemImage}
        resizeMode="cover"
      />
    )}*/}
    <Text style={styles.itemTitle}>{hotel.name?.fr || "Nom indisponible"}</Text>
    <Text>Capacité maximale : {hotel.max_capacity || "N/A"}</Text>
    <Text>ID : {hotel.id}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
    width: "60%",
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignSelf: "center",
  },
  itemTitle: { fontWeight: "bold", fontSize: 16 },
});

export default HotelItem;
