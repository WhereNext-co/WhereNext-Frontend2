import React, { useState } from 'react';
import { Calendar } from 'react-native-big-calendar';
import { View, Text } from 'react-native';
import Backbutton from '../../components/componentspung/Button/turnbackbutton/Backbutton';
import { router } from 'expo-router';
const allDayEvents = [
  {
    title: 'Meeting',
    start: new Date(2024, 4, 6, 10, 0),
    end: new Date(2024, 4, 6, 10, 30),
  },
  {
    title: 'Coffee break',
    start: new Date(2024, 4, 6, 15, 45),
    end: new Date(2024, 4, 7, 16, 30),
  },{
    title: 'Coffee break',
    start: new Date(2024, 4, 7, 15, 45),
    end: new Date(2024, 4, 8, 16, 30),
  },{
    title: 'Coffee break',
    start: new Date(2024, 4, 8, 15, 45),
    end: new Date(2024, 4, 8, 16, 30),
  },
  // Add more all-day events as needed
];

const MyCalendar = () => {
  const initialDate = new Date();
  const initialNextMonth = new Date(initialDate.getFullYear(), initialDate.getMonth() -1, 1);
  const [currentMonth, setCurrentMonth] = useState(new Date(initialNextMonth));
  console.log('Current month:',currentMonth.getMonth());
  const handlePress2 = () => {
    router.push('../(app)/profile')
  };
  const handleSwipeEnd = (direction) => {
    const initialDate2 = new Date(direction);
    const initialNextMonth2 = new Date(initialDate2.getFullYear(), initialDate2.getMonth() -1, 1);
    setCurrentMonth(new Date(initialNextMonth2));
    console.log('direction:',direction,direction.getMonth());
  };
  return (
    <View>
      <View style={{padding:20,flexDirection:'row',justifyContent:'flex-start'}}>
        <Backbutton style={{}} onPress={handlePress2}/>
        <Text style={{ textAlign: 'center', fontSize: 20, marginLeft:110}}>
          {currentMonth.toLocaleString('default', { month: 'long' })}{' '}
          {currentMonth.getFullYear()}
        </Text>
        
      </View>
      <View style={{height:"80%"}}>
        <Calendar
          events={allDayEvents}
          height={300}
          mode='month'
          onSwipeEnd={handleSwipeEnd}
          dayHeaderStyle={{ backgroundColor: 'lightgrey' }}
        />
      </View>
    </View>
  );
};

export default MyCalendar;
