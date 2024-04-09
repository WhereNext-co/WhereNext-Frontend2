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
import AddFriendCard from './AddFriendCard';


export default function AddFriendModal() {
  const [contacts, setContacts] = useState([ //default friends
    {
      img: '',
      name: 'Guy Chelsea',
      id:'0xfjri3995',
      status:'Friend'
    },

    {
      img: '',
      name: 'Mearz Wong',
      id:'03djccnjfj',
      status:'Pending'
    },

    {
      img: '',
      name: 'Mearz Wong',
      id:'03djccnjfj',
      status:'NotFriend'
    },
  ]);
  const [search, setSearch] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    setFilteredContacts(
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.id.toLowerCase().includes(search.toLowerCase())
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
        {filteredContacts.map((contact) => (
          <AddFriendCard
            key={contact.id}
            img={contact.img}
            name={contact.name}
            onPress={() => console.log(`Friend at index pressed`)}
            status={contact.status}
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