import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Afficher l'écran vert après 3 secondes
    const timer1 = setTimeout(() => {
      setStep(2);
    }, 2000);

    // Aller à la page "Home" après 5 secondes
    const timer2 = setTimeout(() => {
      navigation.replace("Accueil");
    }, 3000);

    // Nettoyage des timers au démontage du composant
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [navigation]);

  return (
    <View style={[styles.container, step === 2 && styles.greenScreen]}>
      <Text style={styles.text}>Chargement...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Fond blanc initialement
  },
  greenScreen: {
    backgroundColor: "#498279", // Fond vert après 3 secondes
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SplashScreen;
