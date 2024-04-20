import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  Pressable,
  Text,
  Image,
  ScrollView,
} from "react-native";
import GoogleMapHomeView from "../../../components/home/googleMapHomeView";
import { Redirect, Tabs, Stack, router } from "expo-router";
import {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useRef,
} from "react";
import globalApi from "../../../services/globalApi";
import { UserLocationContext } from "../../../context/userLocationContext";
import colors from "../../../shared/colors";
import Back from "../../../../assets/home/search/back";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
  NativeViewGestureHandler,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

export default function MapView() {
  const { location, setLocation } = useContext(UserLocationContext);
  const [searchText, setSearchText] = useState(""); // State to hold the search text
  const [searchDetails, setSearchDetails] = useState(null); // State to hold the search details
  const [searchResults, setSearchResults] = useState(null); // State to hold the search results
  const [nearbyPlaces, setNearbyPlaces] = useState([]); // State to hold the nearby places
  const [searching, setSearching] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const searchRef = useRef();
  const { dismiss, dismissAll } = useBottomSheetModal();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // variables
  // const snapPoints = useMemo(() => ["40%", "100%"], []);

  useEffect(() => {
    getNearbyPlaces();
  }, [location]); // Add location as a dependency to useEffect

  const placeType = ["restaurant", "convenience_store"];

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

  const handlePlaceSelection = (place) => {
    setSearchText(place.displayName.text);
    setSearchDetails(place);
    setSearching(false);
    setTimeout(() => {
      bottomSheetModalRef.current.present();
    }, 200);
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
    bottomSheetModalRef.current.dismiss();
    dismissAll();
    console.log("Search box focused");
    setSearching(true);
    setTimeout(() => {
      searchRef.current.focus();
    }, 200);
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
            ref={searchRef}
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
                  handlePlaceSelection(item);
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
        handlePlaceSelection={handlePlaceSelection}
      />

      <BottomSheetModal
        name="mymodal"
        ref={bottomSheetModalRef}
        enablePanDownToClose={true}
        enableDismissOnClose={true}
        snapPoints={["40%", "100%"]}
        onChange={(index) => setIsSheetOpen(index === 1)}
        handleIndicatorStyle={isSheetOpen ? styles.handleHidden : styles.handle}
      >
        <BottomSheetView
          style={
            isSheetOpen
              ? styles.drawerContainerWhenSheetOpen
              : styles.drawerContainer
          }
        >
          <Text className="font-semibold text-2xl">
            {searchDetails?.displayName.text}
          </Text>
          <Pressable>
            <LinearGradient
              colors={["#2acbf9", "#9aeeb0"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Create Rendezvous</Text>
            </LinearGradient>
          </Pressable>
          {searchDetails && searchDetails.photos && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {searchDetails.photos.map((photo) => (
                <Image
                  key={photo.name}
                  source={{
                    uri: `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyAFn7D3VcmDtWXNJXoHyz44MVNMEj1sLZs`,
                  }}
                  style={{
                    width: 200,
                    height: 200,
                    marginRight: 10,
                    borderRadius: 16,
                  }}
                />
              ))}
            </ScrollView>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  handle: {
    width: 50,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: colors.gray,
  },
  handleHidden: {
    width: 0,
    height: 0,
  },
  drawerContainer: {
    flex: 1,
    paddingLeft: 24,
    paddingTop: 12,
  },
  drawerContainerWhenSheetOpen: {
    flex: 1,
    paddingLeft: 24,
    paddingTop: 60,
  },
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

  button: {
    borderRadius: 25,
    paddingVertical: 10,
    marginVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    // textTransform: "uppercase",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
  },
});
