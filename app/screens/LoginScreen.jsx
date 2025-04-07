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

const LoginScreen = ({ navigation, route }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      if (route.params?.fromReservation) {
        navigation.replace("BookingValidationScreen"); // Redirection vers validation après connexion
      } else {
        navigation.replace("HomeScreen"); // Sinon, redirection vers la page d'accueil
      }
    } catch (error) {
      Alert.alert("Erreur", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/logo_Evasion_Location.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Déjà client ?</Text>
      <Text style={styles.subtitle}>Connexion à votre compte</Text>

      {/* Formulaire */}
      <TextInput
        placeholder="Adresse de courriel"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Mot de passe"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {/* Bouton de connexion */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Connexion à votre compte</Text>
      </TouchableOpacity>

      {/* Mot de passe oublié */}
      <TouchableOpacity
        onPress={() => navigation.navigate("ResetPasswordScreen")}
      >
        <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

      {/* Se connecter avec */}
      <Text style={styles.orText}>Se connecter avec</Text>

      {/* Icônes (Remplace avec des icônes réelles) */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialText}>F</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialText}>G</Text>
        </TouchableOpacity>
      </View>

      {/* Bouton Créer un compte */}
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.createAccountText}>Créer mon compte</Text>
          <Ionicons
            name="arrow-forward"
            size={20}
            color="#fff"
            style={styles.icon}
          />
        </View>
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
  loginButton: {
    width: "100%",
    backgroundColor: "#E34C26",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    color: "#555",
    marginBottom: 20,
    textDecorationLine: "underline", // Souligner le texte
  },
  orText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  socialText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  createAccountButton: {
    backgroundColor: "#2C6E49",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  createAccountText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginLeft: 10,
  },
});

export default LoginScreen;
