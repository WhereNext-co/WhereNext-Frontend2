/*import { View } from "react-native"
import Dropdown from "../Dropdown/Dropdown"
import { useState } from "react"
let day=[{id:1,name:1},{id:2,name:2},{id:3,name:3}]
let month=[{id:1,name:'January'},{id:2,name:'February'},{id:3,name:'March'}]
let year=[{id:1,name:1950},{id:2,name:1951},{id:3,name:1952}]

let date=[{id:1, name:'asd'},{id:2, name:'dsf'},{id:3, name:'gsd'}]


const Birthdate =()=>{

    const [selectedDay, setSelectedDay] = useState(null)
    const [selectedMonth, setSelectedMonth] = useState(null)
    const [selectedYear, setSelectedYear] = useState(null)



    const onSelectDay =(item)=>{
        setSelectedDay(item)
    }
    const onSelectMonth =(item)=>{
        setSelectedMonth(item)
    }
    const onSelectYear =(item)=>{
        setSelectedYear(item)
    }
    return (
        
        <View style={{flexDirection:"row"}}>
            <Dropdown  data={day} value={selectedDay} onSelect={onSelectDay} label=' Day' ></Dropdown>
            <Dropdown  data={month} value={selectedMonth} onSelect={onSelectMonth} label='  Month' style={{ marginRight: 8 }}></Dropdown>
            <Dropdown  data={year} value={selectedYear} onSelect={onSelectYear} label='  Year'></Dropdown>
        </View>
        
    )
}
export default Birthdate*/
import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const MyDatePicker = ({date,onChange,showPicker}) => {
  
  return (
    <View>
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="spinner"
          maximumDate={new Date('2024-12-31')}
          onChange={onChange}
          textColor='white'
          style={{backgroundColor:'#14072b'}}
        />
      )}
    </View>
  );
};

export default MyDatePicker;
