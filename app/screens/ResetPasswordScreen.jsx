import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour gérer la réinitialisation du mot de passe
  const handleResetPassword = () => {
    if (email === "") {
      alert("Veuillez entrer votre adresse e-mail.");
      return;
    }

    setIsLoading(true);

    // Simuler la requête pour réinitialiser le mot de passe (tu devras intégrer cela avec un service backend pour l'envoi réel)
    setTimeout(() => {
      setIsLoading(false);
      alert("Un email de réinitialisation a été envoyé à " + email);
      navigation.navigate("Login"); // Redirige vers la page de connexion après la réinitialisation
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Réinitialiser votre mot de passe</Text>
      <Text style={styles.subtitle}>
        Entrez votre adresse e-mail et nous vous enverrons un lien pour
        réinitialiser votre mot de passe.
      </Text>

      {/* Champ pour l'adresse e-mail */}
      <TextInput
        placeholder="Adresse e-mail"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#ccc"
        style={styles.input}
      />

      {/* Bouton pour réinitialiser le mot de passe */}
      <TouchableOpacity
        onPress={handleResetPassword}
        style={styles.resetButton}
      >
        <Text style={styles.resetButtonText}>
          {isLoading ? "Chargement..." : "Réinitialiser le mot de passe"}
        </Text>
      </TouchableOpacity>

      {/* Retour vers la page de connexion */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Retour à la connexion</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FAF2",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C6E49",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  resetButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#2C6E49",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: "#E34C26",
    textDecorationLine: "underline",
  },
});

export default ResetPasswordScreen;
