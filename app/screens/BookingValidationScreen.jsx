import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { TOKEN } from "../services/api";

const BookingValidationScreen = ({ navigation, route }) => {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    email: "",
    phone: "",
  });

  const {
    hotel,
    selectedServices,
    adults,
    children,
    babies,
    animals,
    arrivalDate,
    departureDate,
    totalAmount,
  } = route.params;

  const arrival = new Date(arrivalDate);
  const departure = new Date(departureDate);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form.fullName || !form.address || !form.email || !form.phone) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
      return;
    }
    // Vérification du supplément animaux
    if (
      animals > 0 &&
      !selectedServices.find((s) => s.type === "pets" || s.type === "")
    ) {
      Alert.alert(
        "Supplément requis",
        "Vous devez ajouter le service 'Supplément animaux' pour continuer."
      );
      return;
    }

    setLoading(true);

    const formattedArrival = arrival.toISOString().slice(0, 10);
    const formattedDeparture = departure.toISOString().slice(0, 10);
    const periodTo = new Date(departure.getTime() - 86400000)
      .toISOString()
      .slice(0, 10);

    const reservationPayload = {
      data: {
        reservations: [
          {
            hotel_id: hotel.id,
            room_id: hotel.id,
            nature: "pa",
            periods: [
              {
                from: formattedArrival,
                to: periodTo,
                amount: totalAmount,
              },
            ],
            checkin: formattedArrival,
            checkout: formattedDeparture,
            adults,
            children,
            babies,
            pets: animals,
            trip_amount: totalAmount,
            partner_commission_amount: 100.0,
            partner_tva_rate: 20.0,
          },
        ],
      },
      meta: {},
    };

    console.log(
      "➡️ Payload envoyé :",
      JSON.stringify(reservationPayload, null, 2)
    );
    console.log(" Token utilisé :", TOKEN);

    try {
      const response = await fetch(
        "https://api.staging.cloudspire.io/partners/bookings/action/check/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify(reservationPayload),
        }
      );

      const data = await response.json();
      console.log("📩 Réponse API :", data);

      if (data.data?.available === false) {
        Alert.alert(
          "Indisponible",
          "Ce logement n’est pas disponible à ces dates."
        );
        setLoading(false);
        return;
      }

      const total =
        (data.data?.amounts?.periods || 0) +
        (data.data?.amounts?.additional_services || 0);

      if (!total || total === 0) {
        Alert.alert(
          "Montant manquant",
          "L'API n’a pas retourné le montant total. Vérifie les dates ou les services."
        );
        setLoading(false);
        return;
      }

      Alert.alert("Succès", "Réservation validée, passez au paiement !");
      navigation.navigate("PaymentScreen", { amount: total });
    } catch (error) {
      console.error("❌ Erreur lors de la requête :", error);
      Alert.alert("Erreur", "Impossible de contacter le serveur.");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmation de réservation</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom et Prénom"
        placeholderTextColor="#ccc"
        value={form.fullName}
        onChangeText={(text) => handleChange("fullName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse postale"
        placeholderTextColor="#ccc"
        value={form.address}
        onChangeText={(text) => handleChange("address", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse e-mail"
        placeholderTextColor="#ccc"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Numéro de téléphone"
        placeholderTextColor="#ccc"
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={(text) => handleChange("phone", text)}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Envoi..." : "Valider la réservation"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#498279",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default BookingValidationScreen;
