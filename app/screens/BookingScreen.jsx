import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

const BookingScreen = ({ route, navigation }) => {
  const { hotel } = route.params || {};
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [guestType, setGuestType] = useState("Particulier");
  const [additionalService, setAdditionalService] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [animals, setAnimals] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Réservation pour :</Text>
      <Text style={styles.hotelName}>
        {hotel?.title?.fr || "Hôtel inconnu"}
      </Text>

      {/* Dates d'arrivée et de départ */}
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => setShowArrivalPicker(true)}
          style={styles.datePicker}
        >
          <Text>{arrivalDate ? arrivalDate.toDateString() : "Arrivée"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowDeparturePicker(true)}
          style={styles.datePicker}
        >
          <Text>{departureDate ? departureDate.toDateString() : "Départ"}</Text>
        </TouchableOpacity>
      </View>

      {/* Particulier / Professionnel */}
      <View style={styles.pickerContainer}>
        <Text>Type de client :</Text>
        <Picker
          selectedValue={guestType}
          onValueChange={(itemValue) => setGuestType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Particulier" value="Particulier" />
          <Picker.Item label="Professionnel" value="Professionnel" />
        </Picker>
      </View>

      {/* Services additionnels */}
      <TextInput
        style={styles.input}
        placeholder="Services additionnels"
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
        multiline
        numberOfLines={4}
        value={comment}
        onChangeText={setComment}
      />
      {/* DateTimePicker pour la date d'arrivée */}
      {showArrivalPicker && (
        <DateTimePicker
          value={arrivalDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowArrivalPicker(false);
            if (selectedDate) {
              setArrivalDate(selectedDate);
            }
          }}
        />
      )}

      {/* DateTimePicker pour la date de départ */}
      {showDeparturePicker && (
        <DateTimePicker
          value={departureDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDeparturePicker(false);
            if (selectedDate) {
              setDepartureDate(selectedDate);
            }
          }}
        />
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
  pickerContainer: { marginVertical: 10 },
  picker: { height: 50, backgroundColor: "#FFF" },
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
