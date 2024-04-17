import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  Button,
  Text,
} from "react-native";
import GoogleMapHomeView from "../../../components/home/googleMapHomeView";
import { Redirect, Tabs, Stack, router } from "expo-router";
import { useState, useEffect, useContext } from "react";
import globalApi from "../../../services/globalApi";
import { UserLocationContext } from "../../../context/userLocationContext";
import colors from "../../../shared/colors";
import Back from "../../../../assets/home/search/back";
import SlidingUpPanel from "rn-sliding-up-panel";

export default function Tab() {
  const { location, setLocation } = useContext(UserLocationContext);
  const [searchText, setSearchText] = useState(""); // State to hold the search text
  const [searchResults, setSearchResults] = useState(null); // State to hold the search results
  const [searching, setSearching] = useState(false);

  const demo = [
    {
      id: "1",
      name: "Earnest Green",
    },
    {
      id: "2",
      name: "Winston Orn",
    },
  ];

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
              getSearchPlaces({ textQuery: newText });
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
          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Text style={styles.item}>{item.displayName.text}</Text>
                <Text style={styles.item}>{item.formattedAddress}</Text>
                {item.regularOpeningHours !== undefined &&
                item.regularOpeningHours.openNow !== undefined ? (
                  <Text style={styles.item}>
                    {item.regularOpeningHours.openNow ? "Opened" : "Closed"}
                  </Text>
                ) : null}
              </TouchableOpacity>
            )}
          />
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

      <GoogleMapHomeView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
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
  place: {},
});
