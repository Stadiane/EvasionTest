import axios from "axios";

const API_URL = "https://api.staging.cloudspire.io/partners/hotels";
const DETAIL_API_URL = "https://api.staging.cloudspire.io/partners/hotels/";

const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjMWMxYTQ3ZTJiNWQ0ZWYzOGIxNzAwMjg5N2NkY2ZjOSIsInVzZXJDbGFzcyI6IlBhcnRuZXIiLCJ1c2VyUmVmIjoiUDI1MDAwMTM0NyIsIm5iZiI6IjE3MzkyNzAxODIiLCJpYXQiOiIxNzM5MjcwMTgyIiwiZXhwIjoiMTczOTI3NzM4MiJ9.OYVvEOazGmP_N-wvCDk-QiMdO3odyfDtifVFbyMC3Bg"; // Remplace par ton token

export const fetchHotels = async () => {
  try {
    console.log("Tentative de récupération des hôtels...");
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    console.log("Réponse de l'API:", response.data);
    if (response.status !== 200) {
      throw new Error("Erreur HTTP: " + response.status);
    }
    return response.data.data;
  } catch (error) {
    if (error.response) {
      // Si la réponse de l'API contient un message d'erreur, affiche le contenu
      console.error("Détails de l'erreur API:", error.response.data);
      console.error("Code HTTP:", error.response.status);
    } else if (error.request) {
      // Si la requête a été envoyée mais il n'y a pas de réponse
      console.error(
        "La requête a été envoyée mais aucune réponse reçue:",
        error.request
      );
    } else {
      // Si l'erreur est autre (par exemple erreur de configuration axios)
      console.error("Erreur inconnue:", error.message);
    }
    throw new Error("Impossible de récupérer les hôtels");
  }
};

export const fetchHotelDetails = async (hotelId) => {
  try {
    const response = await axios.get(DETAIL_API_URL + hotelId, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data.data;
  } catch (error) {
    throw new Error("Impossible de récupérer les détails de l'hôtel");
  }
};
const api = {
  fetchHotels,
  fetchHotelDetails,
};
export default api;
