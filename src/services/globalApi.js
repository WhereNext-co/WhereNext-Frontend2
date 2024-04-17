import axios from "axios";
import { Platform } from "react-native";

// Define your API keys
const IOS_API_KEY = "AIzaSyAFn7D3VcmDtWXNJXoHyz44MVNMEj1sLZs";
const ANDROID_API_KEY = "AIzaSyDxrDAmzSoIWHZZyvwAHGA9qK2a7Z18FII";

// Determine which API key to use based on the platform
const API_KEY = Platform.OS === "ios" ? IOS_API_KEY : ANDROID_API_KEY;
const NEARBY_URL = "https://places.googleapis.com/v1/places:searchNearby";
const SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";

const headers = {
  "Content-Type": "application/json",
  "X-Goog-Api-Key": API_KEY,
  "X-Goog-FieldMask":
    "places.displayName,places.formattedAddress,places.types,places.googleMapsUri,places.location,places.photos,places.primaryType,places.primaryTypeDisplayName,places.currentOpeningHours,places.currentSecondaryOpeningHours,places.rating,places.regularOpeningHours,places.regularSecondaryOpeningHours,places.userRatingCount",
};

const nearByPlace = async (requestData) => {
  console.log("API_KEY", API_KEY);
  return (res = await axios
    .post(NEARBY_URL, requestData, {
      headers,
    })
    .then((response) => {
      console.log("Nearby places:", response.data.places);
      return response.data.places;
    })
    .catch((error) => {
      console.error("Error fetching nearby places:", error);
    }));
};

const searchPlace = async (requestData) => {
  return (res = await axios
    .post(SEARCH_URL, requestData, {
      headers,
    })
    .then((response) => {
      console.log("Search results:", response.data.places);
      return response.data.places;
    })
    .catch((error) => {
      console.error("Error fetching search results:", error);
    }));
};

export default {
  nearByPlace,
  searchPlace,
};
