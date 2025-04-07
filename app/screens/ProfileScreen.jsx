import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import FavorisScreen from "../screens/FavorisScreen";

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    alert("Déconnexion réussie !");
  };

  return (
    <View style={styles.container}>
      {user && user.nom ? (
        <>
          {/* En-tête avec Avatar et Déconnexion */}
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {user?.nom?.charAt(0)?.toUpperCase() || "?"}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.welcomeText}>Bienvenue, {user.nom} !</Text>
          {/* Infos Utilisateur */}
          <View style={styles.profileInfo}>
            <Text style={styles.infoLabel}>Nom :</Text>
            <Text style={styles.infoValue}>{user.nom}</Text>

            <Text style={styles.infoLabel}>Email :</Text>
            <Text style={styles.infoValue}>
              {user.email || "Non renseigné"}
            </Text>
          </View>

          {/* Bouton Mes Logements */}
          <TouchableOpacity
            style={styles.myHomesButton}
            onPress={() => navigation.navigate("Favoris")}
          >
            <Text style={styles.myHomesButtonText}>Mes logements</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.authContainer}>
          <Image
            source={require("../assets/logo_Evasion_Location.png")}
            style={styles.logo}
          />
          <Text style={styles.welcomeText}>Bienvenue sur Evasion Location</Text>
          <TouchableOpacity
            style={styles.authButton}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={styles.authButtonText}>Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.authButton}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.authButtonText}>Créer un compte</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FAF2",
    padding: 20,
    paddingTop: "20%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "right",
    marginBottom: 20,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#2C6E49",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#E34C26",
    padding: 10,
    borderRadius: 10,
  },
  profileInfo: {
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  infoValue: {
    fontSize: 16,
    color: "#555",
  },
  myHomesButton: {
    backgroundColor: "#2C6E49",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  myHomesButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: "25%",
    paddingBottom: "20%",
  },
  authContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  authButton: {
    backgroundColor: "#2C6E49",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    marginBottom: 10,
  },
  authButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
