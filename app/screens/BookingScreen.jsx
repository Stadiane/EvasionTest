import React, { useState } from "react";
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

const BookingScreen = ({ route, navigation }) => {
  const { hotel } = route.params || {};
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
              <Text>-</Text>
            </TouchableOpacity>
            <Text>{adults}</Text>
            <TouchableOpacity
              onPress={() => setAdults(adults + 1)}
              style={styles.counterButton}
            >
              <Text>+</Text>
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
              <Text>-</Text>
            </TouchableOpacity>
            <Text>{children}</Text>
            <TouchableOpacity
              onPress={() => setChildren(children + 1)}
              style={styles.counterButton}
            >
              <Text>+</Text>
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
              <Text>-</Text>
            </TouchableOpacity>
            <Text>{babies}</Text>
            <TouchableOpacity
              onPress={() => setBabies(babies + 1)}
              style={styles.counterButton}
            >
              <Text>+</Text>
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
              <Text>-</Text>
            </TouchableOpacity>
            <Text>{animals}</Text>
            <TouchableOpacity
              onPress={() => setAnimals(animals + 1)}
              style={styles.counterButton}
            >
              <Text>+</Text>
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
        onPress={() => alert("Réservation confirmée !")}
      >
        <Text style={styles.confirmButtonText}>Confirmer la réservation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F8F8F8" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  hotelName: { fontSize: 18, marginVertical: 10, textAlign: "center" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  datePicker: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  disabled: { backgroundColor: "#ccc" },
  pickerContainer: {
    marginVertical: 15,
    width: "100%", // Le conteneur prend toute la largeur disponible
  },
  picker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    justifyContent: "space-between",
  },
  pickerText: {
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fond transparent pour la modal
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalText: {
    fontSize: 18,
    color: "#333",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  textArea: { height: 100, textAlignVertical: "top" },
  counterContainer: { alignItems: "center", flex: 1 },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  counterButton: {
    backgroundColor: "#DDD",
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  montant: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#333",
  },
  confirmButton: {
    backgroundColor: "#498279",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  confirmButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default BookingScreen;
