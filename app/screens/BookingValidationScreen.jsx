import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const BookingValidationScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form.fullName || !form.address || !form.email || !form.phone) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://api.staging.cloudspire.io/partners/bookings/action/check/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Succès", "Réservation validée, passez au paiement !");
        navigation.navigate("PaymentScreen", { amount: data.trip_amount }); // Redirection vers le paiement
      } else {
        Alert.alert("Erreur", data.message);
      }
    } catch (error) {
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
