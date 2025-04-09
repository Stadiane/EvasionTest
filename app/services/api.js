import axios from "axios";

const API_URL = "https://api.staging.cloudspire.io/partners/hotels";
const DETAIL_API_URL = "https://api.staging.cloudspire.io/partners/hotels/";
const AMENITIES_API_URL =
  "https://api.staging.cloudspire.io/partners/hotels/amenities";
const CHECK_AVAILABILITY_URL =
  "https://api.staging.cloudspire.io/partners/bookings/action/check";

const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjMWMxYTQ3ZTJiNWQ0ZWYzOGIxNzAwMjg5N2NkY2ZjOSIsInVzZXJDbGFzcyI6IlBhcnRuZXIiLCJ1c2VyUmVmIjoiUDI1MDAwMTM0NyIsIm5iZiI6IjE3NDQxOTU3OTQiLCJpYXQiOiIxNzQ0MTk1Nzk0IiwiZXhwIjoiMTc0NDIwMjk5NCJ9.MuQwAt-1IK7prIBhvm6_ZrZeMPTOYox-LUM4hGrjk94";
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

export const fetchAmenities = async () => {
  try {
    const response = await axios.get(AMENITIES_API_URL, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des amenities :", error);
    throw new Error("Impossible de récupérer les spécificités");
  }
};

export const checkAvailability = async (reservationData) => {
  try {
    const response = await axios.post(
      CHECK_AVAILABILITY_URL,
      { data: { reservations: [reservationData] }, meta: {} },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la vérification de la disponibilité",
      error.response?.data || error.message
    );
    throw new Error("Impossible de vérifier la disponibilité");
  }
};

const api = {
  fetchHotels,
  fetchHotelDetails,
  checkAvailability,
};
export default api;
