import React from "react";
import { View, Text, Button, Alert } from "react-native";

const PaymentScreen = ({ navigation }) => {
  const handlePayment = () => {
    Alert.alert("Paiement réussi", "Merci pour votre réservation !");
    navigation.replace("Home"); // Retour à l'accueil après paiement
  };

  return (
    <View>
      <Text> Paiement sécurisé </Text>
      <Button title="Payer avec Apple Pay" onPress={handlePayment} />
      <Button title="Payer avec PayPal" onPress={handlePayment} />
    </View>
  );
};

export default PaymentScreen;
