import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import styles from "../styles/HotelDetailStyles";
import { iconByAmenityId } from "../constants/icons";
import Ionicons from "@expo/vector-icons/Ionicons";

const HotelDetail = ({ hotel, navigation }) => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>{hotel.title?.fr || "Titre indisponible"}</Text>
    <Text style={styles.subtitle}>{hotel.name?.fr || "Nom indisponible"}</Text>

    <View style={styles.infoRow}>
      <Text style={styles.infoText}>
        Capacité : {hotel.min_capacity} - {hotel.max_capacity} pers.
      </Text>
      <Text style={styles.infoText}>Surface : {hotel.surface} m²</Text>
    </View>

    {/* Spécificités (amenities) */}
    {hotel.amenities?.length > 0 && hotel.amenitiesList && (
      <>
        <Text style={styles.sectionTitle}>Spécificités</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 10 }}
        >
          <View style={styles.amenitiesContainer}>
            {hotel.amenities.map(({ amenity_id }) => {
              const match = hotel.amenitiesList.find(
                (a) => a.id === Number(amenity_id)
              );
              const iconName = iconByAmenityId[Number(amenity_id)];

              return match && iconName ? (
                <View key={amenity_id} style={styles.amenityItem}>
                  <Ionicons
                    name={iconName}
                    size={18}
                    color="#333"
                    style={styles.amenityIcon}
                  />
                  <Text style={styles.amenityText}>{match.name?.fr}</Text>
                </View>
              ) : null;
            })}
          </View>
        </ScrollView>
      </>
    )}

    <Text style={styles.sectionTitle}>Description</Text>
    <Text style={styles.paragraph}>
      {hotel.descriptions?.about?.fr || "Pas de description disponible"}
    </Text>

    <Text style={styles.sectionTitle}>Adresse</Text>
    <Text style={styles.paragraph}>
      {hotel.address?.address1}, {hotel.address?.city}, {hotel.address?.zipcode}
    </Text>

    <TouchableOpacity
      style={styles.mapButton}
      onPress={() => navigation.navigate("Carte", { selectedHotel: hotel })}
    >
      <Text style={styles.mapButtonText}>Voir sur la carte</Text>
    </TouchableOpacity>

    <ScrollView horizontal style={styles.imageScroll}>
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
    <Text style={styles.paragraph}>
      À partir de {hotel.pricings?.min_trip_amount}€ le séjour
    </Text>
    <Text style={styles.paragraph}>
      À partir de {hotel.pricings?.min_trip_amount_per_night}€ / nuit
    </Text>

    <Text style={styles.sectionTitle}>Contact</Text>
    <Text style={styles.paragraph}>Email : {hotel.channel?.email}</Text>
    <Text style={styles.paragraph}>Téléphone : {hotel.channel?.phone}</Text>

    <TouchableOpacity
      style={styles.reserveButton}
      onPress={() => navigation.navigate("BookingScreen", { hotel })}
    >
      <Text style={styles.reserveButtonText}>Réserver</Text>
    </TouchableOpacity>
  </ScrollView>
);

export default HotelDetail;
