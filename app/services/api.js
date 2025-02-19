import axios from "axios";

const API_URL = "https://api.staging.cloudspire.io/partners/hotels";
const DETAIL_API_URL = "https://api.staging.cloudspire.io/partners/hotels/";

const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjMWMxYTQ3ZTJiNWQ0ZWYzOGIxNzAwMjg5N2NkY2ZjOSIsInVzZXJDbGFzcyI6IlBhcnRuZXIiLCJ1c2VyUmVmIjoiUDI1MDAwMTM0NyIsIm5iZiI6IjE3Mzk5NjYxMjkiLCJpYXQiOiIxNzM5OTY2MTI5IiwiZXhwIjoiMTczOTk3MzMyOSJ9.oiY9kUYCDuDkodBCT2YrTR3FYVjDc2GuaWj7dxfkpM4"; // Remplace par ton token

export const fetchHotels = async () => {
  try {
    console.log("Tentative de récupération des hôtels...");
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    if (response.status !== 200) {
      throw new Error("Erreur HTTP: " + response.status);
    }
    console.log("Réponse de l'API:", response.data);
    return response.data.data; // Retourner la liste des hôtels sans détails
  } catch (error) {
    console.error("Erreur lors de la récupération des hôtels", error);
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
