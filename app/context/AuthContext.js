import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null); // S'assurer que user est null s'il n'y a rien en mémoire
      }
    };
    loadUser();
  }, []);

  const register = async (nom, email, password) => {
    const userData = { nom, email, token: "fake-jwt-token" }; // Simule un token
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const login = async (email, password) => {
    if (email === "test@exemple.com" && password === "password123") {
      const userData = { nom: "Test", email, token: "fake-jwt-token" };
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } else {
      throw new Error("Email ou mot de passe incorrect");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null); // Mettre à jour l'état après suppression des données
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
