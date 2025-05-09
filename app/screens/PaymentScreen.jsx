import React from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PaymentScreen = ({ navigation, route }) => {
  const { amount = 0 } = route.params || {};

  const handlePayment = (method) => {
    Alert.alert(
      "Paiement réussi",
      `Merci pour votre réservation via ${method} !`,
      [
        {
          text: "Retour à l'accueil",
          onPress: () => navigation.replace("Accueil"),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Ionicons name="lock-closed-outline" size={48} color="#498279" />
      <Text style={styles.title}>Paiement sécurisé</Text>
      <Text style={styles.subtitle}>Montant à payer</Text>
      <Text style={styles.amount}>{amount.toFixed(2)} €</Text>

      <TouchableOpacity
        style={styles.payButton}
        onPress={() => handlePayment("Apple Pay")}
      >
        <Ionicons name="logo-apple" size={24} color="#fff" />
        <Text style={styles.payText}>Payer avec Apple Pay</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.payButton, { backgroundColor: "#FFC439" }]}
        onPress={() => handlePayment("PayPal")}
      >
        <Ionicons name="logo-paypal" size={24} color="#000" />
        <Text style={[styles.payText, { color: "#000" }]}>
          Payer avec PayPal
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#498279",
    marginTop: 10,
  },
  subtitle: {
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
  amount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  payButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#498279",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: "90%",
    justifyContent: "center",
  },
  payText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 16,
  },
});

export default PaymentScreen;
