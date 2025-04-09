import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Image,
  StatusBar,
  Text,
} from "react-native";

const SplashScreen = ({ navigation }) => {
  const [phase, setPhase] = useState(0); // 0: vert, 1: blanc avec logo
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Étape 1 : fond vert
    const timer1 = setTimeout(() => {
      setPhase(1);
    }, 600);

    // Étape 2 : logo grandit + texte fade-in
    const timer2 = setTimeout(() => {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 2000,
          delay: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1100);

    // Étape 3 : navigation
    const timer3 = setTimeout(() => {
      setPhase(2);
      navigation.replace("Accueil");
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <View
      style={[
        styles.container,
        phase === 0 ? styles.greenBackground : styles.whiteBackground,
      ]}
    >
      <StatusBar hidden />
      {phase > 0 && (
        <>
          <Animated.Image
            source={require("../assets/logo_Evasion_Location.png")}
            style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
            resizeMode="contain"
          />
          <Animated.Text style={[styles.welcomeText, { opacity: textOpacity }]}>
            Bienvenue sur Evasion Locations
          </Animated.Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  greenBackground: {
    backgroundColor: "#498279",
  },
  whiteBackground: {
    backgroundColor: "#fff",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 18,
    color: "#498279",
    fontWeight: "600",
  },
});

export default SplashScreen;
