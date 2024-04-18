import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import GoogleMapHomeView from "../../../components/home/googleMapHomeView";
import { Redirect, Tabs, Stack, router } from "expo-router";
import { useState, useEffect, useContext } from "react";
import globalApi from "../../../services/globalApi";
import { UserLocationContext } from "../../../context/userLocationContext";
import colors from "../../../shared/colors";
import Back from "../../../../assets/home/search/back";

export default function MapView() {
  const { location, setLocation } = useContext(UserLocationContext);
  const [searchText, setSearchText] = useState(""); // State to hold the search text
  const [searchResults, setSearchResults] = useState(null); // State to hold the search results
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    getNearbyPlaces();
  }, []); // Add location as a dependency to useEffect

  const placeType = ["restaurant", "liquor_store", "convenience_store"];

  const getSearchPlaces = async (requestData) => {
    try {
      await globalApi.searchPlace(requestData).then((response) => {
        console.log("res", response);
        setSearchResults(response);
      });
      console.log("Test;", searchResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  const getNearbyPlaces = async () => {
    const res = await globalApi.nearByPlace({
      includedTypes: placeType,
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          radius: 500.0,
        },
      },
    });
  };

  const handleSearchFocus = () => {
    console.log("Search box focused");
    setSearching(true);
  };

  const reversehandleSearchFocus = () => {
    console.log("Search box focused");
    setSearching(false);
  };

  const handleSearchChange = (newText) => {
    getSearchPlaces({ textQuery: newText });
  };

  if (searching) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.headerContainer}>
          <TextInput
            placeholder="Search here"
            placeholderTextColor={colors.gray}
            style={styles.searchBar}
            onChangeText={(newText) => {
              setSearchText(newText);
              handleSearchChange(newText);
            }} // Call handleSearch on text change
            value={searchText} // Pass the current search text value
          />

          <TouchableOpacity onPress={reversehandleSearchFocus}>
            <Back width={30} height={30} name="back" />
          </TouchableOpacity>
          {/* {searchResults && (
            <FlatList
              data={searchResults}
              renderItem={(place) => place.displayName.text}
            />
          )} */}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.headerContainer}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor={colors.gray}
          style={styles.searchBar}
          onFocus={handleSearchFocus}
          value={searchText}
        />
      </View>

      <View style={styles.mapContainer}>
        <GoogleMapHomeView />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 16,
  },
  mapContainer: {
    flex: 1,
  },
  searchBar: {
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: colors.white,
    shadowColor: colors.black, // This is required for iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // This property adds shadow on Android
  },
});
