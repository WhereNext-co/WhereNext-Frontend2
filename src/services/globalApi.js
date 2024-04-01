import axios from "axios";
import { Platform } from "react-native";

// Define your API keys
const IOS_API_KEY = "AIzaSyAFn7D3VcmDtWXNJXoHyz44MVNMEj1sLZs";
const ANDROID_API_KEY = "AIzaSyDxrDAmzSoIWHZZyvwAHGA9qK2a7Z18FII";

// Determine which API key to use based on the platform
const API_KEY = Platform.OS === "ios" ? IOS_API_KEY : ANDROID_API_KEY;
const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby";

const requestData = {
  includedTypes: ["restaurant"],
  maxResultCount: 10,
  locationRestriction: {
    circle: {
      center: {
        latitude: 37.7937,
        longitude: -122.3965,
      },
      radius: 500.0,
    },
  },
};

const headers = {
  "Content-Type": "application/json",
  "X-Goog-Api-Key": API_KEY,
  "X-Goog-FieldMask":
    "places.displayName,places.formattedAddress,places.types,places.websiteUri",
};

const nearByPlace = () => {
  console.log("API_KEY", API_KEY);
  return axios
    .post(BASE_URL, requestData, {
      headers,
    })
    .then((response) => {
      console.log("Nearby places:", response.data.places);
      return response.data.places;
    })
    .catch((error) => {
      console.error("Error fetching nearby places:", error);
    });
};
export default {
  nearByPlace,
};
