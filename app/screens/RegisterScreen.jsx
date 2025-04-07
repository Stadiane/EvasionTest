import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

const RegisterScreen = ({ navigation }) => {
  const { register } = useContext(AuthContext);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [offersAccepted, setOffersAccepted] = useState(false); // Pour la case "offres"
  const [termsAccepted, setTermsAccepted] = useState(false); // Pour la case "conditions"

  const handleRegister = async () => {
    if (!nom || !email || !password || !confirmPassword) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }
    try {
      await register(nom, email, password); // Appel de register()
      navigation.navigate("Accueil"); // Redirection après inscription
    } catch (error) {
      Alert.alert("Erreur", error.message);
    }
  };

  // Fonction pour gérer le changement de l'état des cases
  const toggleCheckbox = (type) => {
    if (type === "offers") {
      setOffersAccepted(!offersAccepted);
    } else if (type === "terms") {
      setTermsAccepted(!termsAccepted);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/logo_Evasion_Location.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Nouveau client ?</Text>
      <Text style={styles.subtitle}>Créer votre compte</Text>

      {/* Formulaire */}
      <TextInput
        placeholder="Nom complet"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        placeholder="Adresse de courriel"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Mot de passe"
        placeholderTextColor="#ccc"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirmer le mot de passe"
        placeholderTextColor="#ccc"
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Cases à cocher */}
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => toggleCheckbox("offers")} // Changer l'état de la case
      >
        <View
          style={[
            styles.checkbox,
            offersAccepted && styles.checkboxChecked, // Si la case est cochée, on ajoute le style
          ]}
        >
          {offersAccepted && (
            <Ionicons name="checkmark" size={20} color="#fff" />
          )}
        </View>
        <Text style={styles.checkboxText}>
          J'accepte de recevoir les offres
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => toggleCheckbox("terms")} // Changer l'état de la case
      >
        <View
          style={[
            styles.checkbox,
            termsAccepted && styles.checkboxChecked, // Si la case est cochée, on ajoute le style
          ]}
        >
          {termsAccepted && (
            <Ionicons name="checkmark" size={20} color="#fff" />
          )}
        </View>
        <Text style={styles.checkboxText}>
          J'accepte les conditions générales
        </Text>
      </TouchableOpacity>

      {/* Bouton Créer un compte */}
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={handleRegister}
      >
        <Text style={styles.createAccountText}>Créer mon compte</Text>
      </TouchableOpacity>

      {/* Bouton "J’ai déjà un compte" avec une flèche */}
      <TouchableOpacity
        onPress={() => navigation.navigate("LoginScreen")}
        style={styles.loginButton}
      >
        <Ionicons
          name="arrow-back"
          size={20}
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.loginButtonText}>J’ai déjà un compte</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FAF2",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C6E49",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#2C6E49",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "#2C6E49", // Couleur de fond quand la case est cochée
  },
  checkboxText: {
    fontSize: 14,
    color: "#333",
  },
  createAccountButton: {
    backgroundColor: "#2C6E49",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 70,
  },
  createAccountText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginButton: {
    flexDirection: "row", // Pour aligner la flèche et le texte
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#E34C26",
    padding: 15,
    borderRadius: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8, // Espace entre la flèche et le texte
  },
  icon: {
    marginRight: 5,
  },
});

export default RegisterScreen;
