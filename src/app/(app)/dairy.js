import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import LocationCard from '../../components/dairy/LocationCard';
import { Tabs } from 'expo-router';

function Active({ locations }) {
  const activeLocations = locations.filter(location => location.mode === 'active');
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {activeLocations.map((location, index) => (
        <LocationCard
          key={index}
          img={location.img}
          locationName={location.locationName}
          locationDetail={location.locationDetail}
          onPress={() => {
            // Handle the press event here...
          }}
          mode={location.mode}
        />
      ))}
    </ScrollView>
  );
}

function Past({ locations }) {
  const pastLocations = locations.filter(location => location.mode === 'past');
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {pastLocations.map((location, index) => (
        <LocationCard
          key={index}
          img={location.img}
          locationName={location.locationName}
          locationDetail={location.locationDetail}
          onPress={() => {
            // Handle the press event here...
          }}
          mode={location.mode}
        />
      ))}
    </ScrollView>
  );
}

function Drafts({ locations }) {
  const draftLocations = locations.filter(location => location.mode === 'draft');
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {draftLocations.map((location, index) => (
        <LocationCard
          key={index}
          img={location.img}
          locationName={location.locationName}
          locationDetail={location.locationDetail}
          onPress={() => {
            // Handle the press event here...
          }}
          mode={location.mode}
        />
      ))}
    </ScrollView>
  );
}

function Pending({ locations }) {
  const pendingLocations = locations.filter(location => location.mode === 'pending');
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {pendingLocations.map((location, index) => (
        <LocationCard
          key={index}
          img={location.img}
          locationName={location.locationName}
          locationDetail={location.locationDetail}
          onPress={() => {
            // Handle the press event here...
          }}
          mode={location.mode}
        />
      ))}
    </ScrollView>
  );
}

export default function Dairy() {
  const [locations, setLocations] = useState([
    {
      locationName: 'The Complete',
      locationDetail: 'Rachaprarop, Ratchathewi, Bangkok 10400',
      img: '',
      users: ['Guy Chelsea'],
      mode: 'active', // This can be 'active', 'pending', 'past', or 'draft'
    },
    // More locations here...
  ]);
  const [search, setSearch] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    setFilteredLocations(
      locations.filter((location) =>
        location.locationName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, locations]);

  return (
    <SafeAreaView screenOptions={{ tabBarActiveTintColor: "blue" }}>
    <Tabs initialRouteName="Active">
      <Tabs.Screen name="Active" component={() => <Active locations={filteredLocations} />} />
      <Tabs.Screen name="Past" component={() => <Past locations={filteredLocations} />} />
      <Tabs.Screen name="Drafts" component={() => <Drafts locations={filteredLocations} />} />
      <Tabs.Screen name="Pending" component={() => <Pending locations={filteredLocations} />} />
    </Tabs>
    <TextInput
      value={search}
      onChangeText={setSearch}
      placeholder="Search"
      style={styles.searchInput}
    />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
});


  /*
  useEffect(() => {
    fetch('https://your-backend-url/locations')
      .then(response => response.json())
      .then(data => setLocations(data))
      .catch(error => console.error(error));
  }, []);
  */