import React, { useState, useEffect} from "react";
import { View, Text, Modal, Pressable, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const CalendarScreen = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const navigation = useNavigation();
  console.log(selectedDay);
  const [date, setDate] = useState(new Date());



  const handleDateChange = (selectedDate) => {
    navigation.navigate("Entries", {
      routeSelectedDate: selectedDate.toISOString().split("T")[0]
    })
  }
    

  return (
    <SafeAreaView >
    <View >
    <Calendar
    onDayPress={day => {
      setSelectedDay(day.dateString);
      const [year, month, dayNum] = day.dateString.split("-")
      handleDateChange(new Date(year, month - 1, dayNum));
    }}
    markedDates={{
      [selectedDay]: {selected: true, disableTouchEvent: true, selectedDotColor: "orange"}
    }}
    />
    </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10
  },
  modalContainer: {
    //flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 30
  },
  modalScrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
  editButton: {
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold"
  },
  closeButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10
  },
  closeText: {
    color: "#ffffff",
    fontWeight: "bold"
  }
});
