import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet,} from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { getSymptomsByCurrentMonth } from "../../services/symptomServices";
import { getMoodByCurrentMonth } from "../../services/moodServices";
import { useAuth } from "../../context/AuthContext";

const CalendarScreen = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const navigation = useNavigation();
  console.log(selectedDay);
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [symptomsData, setSymptomsData] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        setIsLoading(true);
        setError(null);
        const idToken = await user.getIdToken();
        console.log("idToken THIS IS THE INVALID", idToken);
        const symptomsInfo = await getSymptomsByCurrentMonth(idToken);
        console.log("symptomsInfo is here", symptomsInfo);
        const moodInfo = await getMoodByCurrentMonth(idToken);
        console.log("moodInfo is here", moodInfo);
        setSymptomsData(symptomsInfo);
        setMoodData(moodInfo);
      } catch (error) {
        setError("Failed to load data");
        console.error(error)
      } finally {
        setIsLoading(false);
      }
    }
      fetchData();
    }, [user]);


  const symptomList = symptomsData || [];
  const moodList = moodData || [];

  const handleDateChange = (selectedDate) => {
    navigation.navigate("Entries", {
      routeSelectedDate: selectedDate.toISOString().split("T")[0]
    })
  }

  const markedDates = {};
  symptomList.forEach(entry => {
  const date = entry.symptom_date.split("T")[0];
    markedDates[date] = {
      ...(markedDates[date] || {}),
      dots: [
        ...(markedDates[date]?.dots || []),
        { key: "symptom", color: "orange" }
      ],
      marked: true,
    };
  });

  {/*moodList.forEach(entry => {
    const date = entry.mood_date.split("T")[0];
    markedDates[date] = {
      ...(markedDates[date] || {}),
      dots: [
        ...(markedDates[date]?.dots || []),
        { key: "mood", color: "blue" }
      ],
      marked: true,
    };
  });*/}

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: "#f5f5f5", margin: 10}}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Select a Date</Text>
        <Calendar
          onDayPress={day => {
            setSelectedDay(day.dateString);
            const [year, month, dayNum] = day.dateString.split("-")
            handleDateChange(new Date(year, month - 1, dayNum));
          }}
          markingType="multidot"
          markedDates={markedDates}
          //markedDates={{
            //[selectedDay]: {
              //selected: true, 
              //disableTouchEvent: true, 
              //marked: true, 
              //selectedDotColor: "#cd5c5c"
              //}
          //}}
        />
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;

