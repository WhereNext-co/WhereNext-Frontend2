import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { UserLocationContext } from "../../context/userLocationContext";

export default function GoogleMapHomeView() {
  const [region, setRegion] = useState();

  const { location, setLocation } = useContext(UserLocationContext);

  useEffect(() => {
    if (location) {
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, []);
  return (
    <MapView
      style={{
        width: "100%",
        height: "100%",
      }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      region={region}
    >
      <Marker title="My Location" coordinate={region} />
    </MapView>
  );
}
