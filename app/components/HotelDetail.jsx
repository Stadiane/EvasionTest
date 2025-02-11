import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";

const HotelDetail = ({ hotel }) => (
  <ScrollView>
    <Text style={styles.title}>{hotel.title?.fr || "Titre indisponible"}</Text>
    <Text style={styles.subtitle}>{hotel.name?.fr || "Nom indisponible"}</Text>
    <Text>
      Capacité : {hotel.min_capacity} - {hotel.max_capacity} pers.
    </Text>
    <Text>Surface : {hotel.surface} m²</Text>

    <Text style={styles.sectionTitle}>Description</Text>
    <Text>
      {hotel.descriptions?.about?.fr || "Pas de description disponible"}
    </Text>

    <Text style={styles.sectionTitle}>Adresse</Text>
    <Text>
      {hotel.address?.address1}, {hotel.address?.city}, {hotel.address?.zipcode}
    </Text>

    <ScrollView horizontal>
      {hotel.pictures?.map((pic, index) => (
        <Image
          key={index}
          source={{ uri: pic.url }}
          style={styles.detailImage}
          resizeMode="cover"
        />
      ))}
    </ScrollView>

    <Text style={styles.sectionTitle}>Tarifs</Text>
    <Text>À partir de {hotel.pricings?.min_trip_amount}€ le séjour</Text>
    <Text>À partir de {hotel.pricings?.min_trip_amount_per_night}€ / nuit</Text>

    <Text style={styles.sectionTitle}>Contact</Text>
    <Text>Email : {hotel.channel?.email}</Text>
    <Text>Téléphone : {hotel.channel?.phone}</Text>
  </ScrollView>
);

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 18, color: "gray", textAlign: "center" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  detailImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#fff",
    alignSelf: "center",
  },
});

export default HotelDetail;
