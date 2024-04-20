import React, { useContext, useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { UserLocationContext } from "../../context/userLocationContext";
import { View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Arrow from "../../../assets/home/map/arrow";

export default function GoogleMapHomeView({
  selectedPlace,
  nearbyPlaces,
  handlePlaceSelection,
}) {
  const [region, setRegion] = useState();
  const { location, setLocation } = useContext(UserLocationContext);
  const mapRef = useRef(null);

  useEffect(() => {
    if (location) {
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005, // Adjusted delta values for less zoom
        longitudeDelta: 0.005,
      });
    }
  }, [location]); // Watch for changes in location
  useEffect(() => {
    if (selectedPlace && selectedPlace.location) {
      const newRegion = {
        latitude: selectedPlace.location.latitude,
        longitude: selectedPlace.location.longitude,
        latitudeDelta: 0.005, // Adjusted delta values for less zoom
        longitudeDelta: 0.005,
      };
      setRegion(newRegion);
      animateMap(newRegion);
    }
  }, [selectedPlace]);

  const animateMap = (newRegion) => {
    if (mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: newRegion,
          zoom: 16, // Adjust zoom level as needed
        },
        { duration: 200 } // Adjust duration as needed
      );
    }
  };

  return (
    <MapView
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
      }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      region={region}
      initialRegion={region}
      showsMyLocationButton={true}
      followsUserLocation={true}
    >
      {selectedPlace !== null &&
        selectedPlace.photos &&
        selectedPlace.photos[0] &&
        selectedPlace.photos[0].name && (
          <Marker
            title={selectedPlace.displayName.text}
            coordinate={selectedPlace.location}
          >
            <View style={styles.markerContainer}>
              <Image
                source={{
                  uri: `https://places.googleapis.com/v1/${selectedPlace.photos[0].name}/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyAFn7D3VcmDtWXNJXoHyz44MVNMEj1sLZs`,
                }}
                style={styles.picMarker}
              />
              <Arrow width="25" height="25" />
            </View>
          </Marker>
        )}
      {nearbyPlaces !== null &&
        nearbyPlaces.map(
          (place) =>
            place.photos &&
            place.photos[0] &&
            place.photos[0].name && (
              <Marker
                key={place.id}
                title={place.displayName.text}
                coordinate={place.location}
                onPress={() => handlePlaceSelection(place)}
              >
                <View style={styles.markerContainer}>
                  <Image
                    source={{
                      uri: `https://places.googleapis.com/v1/${place.photos[0].name}/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyAFn7D3VcmDtWXNJXoHyz44MVNMEj1sLZs`,
                    }}
                    style={styles.picMarker}
                  />
                  <Arrow width="25" height="25" />
                </View>
              </Marker>
            )
        )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: "center",
    gap: 2,
  },
  picMarker: {
    borderRadius: 10,
    padding: 5,
    width: 60,
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
