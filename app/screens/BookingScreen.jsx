import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/BookingScreenStyles";

const BookingScreen = ({ route, navigation }) => {
  const { hotel } = route.params || {};
  const { user } = useContext(AuthContext);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [showPicker, setShowPicker] = useState({
    arrival: false,
    departure: false,
  });
  const [guestType, setGuestType] = useState("Particulier");
  const [modalVisible, setModalVisible] = useState(false);
  const [additionalService, setAdditionalService] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [animals, setAnimals] = useState(0);
  const [comment, setComment] = useState("");

  // Ouvrir et fermer la liste déroulante
  const toggleModal = () => setModalVisible(!modalVisible);

  const handleDateChange = (event, selectedDate, type) => {
    if (type === "arrival") {
      setArrivalDate(selectedDate);
      setShowPicker({ arrival: false, departure: true }); // Ouvre automatiquement le départ
    } else if (type === "departure") {
      setDepartureDate(selectedDate);
      setShowPicker({ arrival: false, departure: false });
    }
  };

  const handleReservation = () => {
    if (!user) {
      // Si l'utilisateur n'est pas connecté, on l'envoie vers Login
      navigation.navigate("LoginScreen", { fromReservation: true });
    } else {
      // Sinon, il peut aller valider et payer ensuite
      navigation.navigate("BookingValidationScreen");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Réservation pour :</Text>
      <Text style={styles.hotelName}>
        {hotel?.title?.fr || "Hôtel inconnu"}
      </Text>

      {/* Dates d'arrivée et de départ */}
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => setShowPicker({ arrival: true, departure: false })}
          style={styles.datePicker}
        >
          <Text>
            {arrivalDate ? arrivalDate.toLocaleDateString() : "Arrivée"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            arrivalDate && setShowPicker({ arrival: false, departure: true })
          }
          style={[styles.datePicker, !arrivalDate && styles.disabled]}
          disabled={!arrivalDate}
        >
          <Text>
            {departureDate ? departureDate.toLocaleDateString() : "Départ"}
          </Text>
        </TouchableOpacity>
      </View>
      {showPicker.arrival && (
        <DateTimePicker
          value={arrivalDate || new Date()}
          mode="date"
          display="default"
          minimumDate={new Date()} // Empêcher les dates passées
          onChange={(event, selectedDate) =>
            handleDateChange(event, selectedDate, "arrival")
          }
        />
      )}

      {showPicker.departure && (
        <DateTimePicker
          value={departureDate || arrivalDate || new Date()}
          mode="date"
          display="default"
          minimumDate={arrivalDate || new Date()} // Empêcher un départ avant l’arrivée
          onChange={(event, selectedDate) =>
            handleDateChange(event, selectedDate, "departure")
          }
        />
      )}

      {/* Particulier / Professionnel */}
      <View style={styles.pickerContainer}>
        <Text>Type de client :</Text>
        {/* TouchableOpacity pour afficher un rectangle avec une flèche */}
        <TouchableOpacity
          style={styles.picker}
          onPress={toggleModal} // Ouvrir la liste déroulante
        >
          <Text style={styles.pickerText}>{guestType}</Text>
          <Ionicons
            name="caret-down-outline"
            size={20}
            color="#000"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Liste déroulante */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={toggleModal} // Fermer la modal si on clique à l'extérieur
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => {
                setGuestType("Particulier");
                toggleModal(); // Fermer la modal après sélection
              }}
            >
              <Text style={styles.modalText}>Particulier</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => {
                setGuestType("Professionnel");
                toggleModal(); // Fermer la modal après sélection
              }}
            >
              <Text style={styles.modalText}>Professionnel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Services additionnels */}
      <TextInput
        style={styles.input}
        placeholder="Services additionnels"
        placeholderTextColor="#ccc"
        value={additionalService}
        onChangeText={setAdditionalService}
      />

      {/* Nombre de personnes */}
      <View style={styles.row}>
        <View style={styles.counterContainer}>
          <Text>Adultes</Text>
          <View style={styles.counter}>
            <TouchableOpacity
              onPress={() => setAdults(Math.max(0, adults - 1))}
              style={styles.counterButton}
            >
              <Text style={styles.counterButtonText}>-</Text>
            </TouchableOpacity>

            <Text>{adults}</Text>
            <TouchableOpacity
              onPress={() => setAdults(adults + 1)}
              style={styles.counterButton}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.counterContainer}>
          <Text>Enfants</Text>
          <View style={styles.counter}>
            <TouchableOpacity
              onPress={() => setChildren(Math.max(0, children - 1))}
              style={styles.counterButton}
            >
              <Text style={styles.counterButtonText}>-</Text>
            </TouchableOpacity>

            <Text>{adults}</Text>
            <TouchableOpacity
              onPress={() => setChildren(children + 1)}
              style={styles.counterButton}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.counterContainer}>
          <Text>Bébés</Text>
          <View style={styles.counter}>
            <TouchableOpacity
              onPress={() => setBabies(Math.max(0, babies - 1))}
              style={styles.counterButton}
            >
              <Text style={styles.counterButtonText}>-</Text>
            </TouchableOpacity>

            <Text>{adults}</Text>
            <TouchableOpacity
              onPress={() => setBabies(babies + 1)}
              style={styles.counterButton}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.counterContainer}>
          <Text>Animaux</Text>
          <View style={styles.counter}>
            <TouchableOpacity
              onPress={() => setAnimals(Math.max(0, animals - 1))}
              style={styles.counterButton}
            >
              <Text style={styles.counterButtonText}>-</Text>
            </TouchableOpacity>

            <Text>{adults}</Text>
            <TouchableOpacity
              onPress={() => setAnimals(animals + 1)}
              style={styles.counterButton}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Commentaire */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Commentaire"
        placeholderTextColor="#ccc"
        multiline
        numberOfLines={4}
        value={comment}
        onChangeText={setComment}
      />
      {/* Calcul du montant basé sur le prix de l'API */}
      {arrivalDate &&
        departureDate &&
        hotel?.pricings?.min_trip_amount_per_night && (
          <Text style={styles.montant}>
            Montant :{" "}
            {(
              ((departureDate - arrivalDate) / (1000 * 60 * 60 * 24)) *
              hotel.pricings.min_trip_amount_per_night
            ).toFixed(2)}{" "}
            €
          </Text>
        )}

      {/* Bouton de confirmation */}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleReservation}
      >
        <Text style={styles.confirmButtonText}>Confirmer la réservation</Text>
      </TouchableOpacity>
    </View>
  );
};
export default BookingScreen;
