import React, { useContext, useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { UserLocationContext } from "../../context/userLocationContext";
import { Image } from "react-native";

export default function GoogleMapHomeView({ selectedPlace, nearbyPlaces }) {
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
        { duration: 10000 } // Adjust duration as needed
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
      {selectedPlace !== null && (
        <Marker
          title={selectedPlace.displayName.text}
          coordinate={selectedPlace.location}
        />
      )}
      {nearbyPlaces !== null &&
        nearbyPlaces.map((place) => (
          <Marker
            key={place.id}
            title={place.displayName.text}
            coordinate={place.location}
          />
        ))}
    </MapView>
  );
}
