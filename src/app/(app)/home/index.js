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
import { SafeAreaView } from "react-native-safe-area-context";
import { set } from "firebase/database";

export default function Tab() {
  const { location, setLocation } = useContext(UserLocationContext);
  const [searchText, setSearchText] = useState(""); // State to hold the search text
  const [searchDetails, setSearchDetails] = useState(null); // State to hold the search details
  const [searchResults, setSearchResults] = useState(null); // State to hold the search results
  const [nearbyPlaces, setNearbyPlaces] = useState([]); // State to hold the nearby places
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    getNearbyPlaces();
  }, []); // Add location as a dependency to useEffect

  const placeType = ["restaurant", "liquor_store", "convenience_store"];

  const getSearchPlaces = async (requestData) => {
    if (!requestData.textQuery) {
      setSearchResults([]);
      return;
    }
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
    setNearbyPlaces(res);
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
      <View className="flex flex-col">
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={reversehandleSearchFocus}
          >
            <Back width={30} height={30} name="back" color="black" />
          </TouchableOpacity>
          <TextInput
            className="basis-11/12"
            placeholder="Search here"
            placeholderTextColor={colors.gray}
            style={styles.searchBar}
            onChangeText={(newText) => {
              setSearchText(newText);
              getSearchPlaces({ textQuery: newText });
            }} // Call handleSearch on text change
            value={searchText} // Pass the current search text value
          />
        </View>
        <View className="pt-36">
          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                  setSearchText(item.displayName.text);
                  setSearchDetails(item);
                  setSearching(false);
                }}
              >
                <Text style={styles.item} className="font-bold text-xl">
                  {item.displayName.text}
                </Text>
                <Text className="text-slate-500">{item.formattedAddress}</Text>
                {item.regularOpeningHours !== undefined &&
                item.regularOpeningHours.openNow !== undefined ? (
                  <Text
                    style={[
                      styles.item,
                      item.regularOpeningHours.openNow
                        ? styles.open
                        : styles.closed,
                    ]}
                    className="font-semibold text-lg"
                  >
                    {item.regularOpeningHours.openNow ? "Open" : "Closed"}
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

      <GoogleMapHomeView
        selectedPlace={searchDetails}
        nearbyPlaces={nearbyPlaces}
      />
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    flexGrow: 1,
  },
  itemContainer: {
    backgroundColor: "#fff", // white background
    padding: 10, // padding inside the box
    // marginVertical: 1, // margin at the top and bottom for each box
    borderWidth: 1, // border width
    borderColor: "#ddd", // grey border color
  },
  item: {
    fontSize: 16,
    color: "#333",
  },
  open: {
    color: "green",
  },
  closed: {
    color: "red",
  },
});
