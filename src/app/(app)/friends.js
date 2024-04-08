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
import FriendCard from '../../components/friends/FriendCard';


export default function Friends() {
  const [contacts, setContacts] = useState([ //default friends
    {
      img: '',
      name: 'Guy Chelsea'
    },
    {
      img: '',
      name: 'Mearz Wong'
    },
  ]);
  const [search, setSearch] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    setFilteredContacts(
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, contacts]);

  /*
  useEffect(() => {
    fetch('https://your-backend-url/contacts')
      .then(response => response.json())
      .then(data => setContacts(data))
      .catch(error => console.error(error));
  }, []);
  */

  return (
    <SafeAreaView>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search"
          style={styles.searchInput}
        />
      <ScrollView>
        {filteredContacts.map((contact, index) => (
          <FriendCard
            key={index}
            img={contact.img}
            name={contact.name}
            onPress={() => console.log(`Friend at index ${index} pressed`)}
          />
        ))}
      </ScrollView>
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
