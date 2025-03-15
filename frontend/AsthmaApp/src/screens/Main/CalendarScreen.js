import React, { useState, useEffect} from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import { useAuth } from "../../context/AuthContext";
import { getSymptoms} from "../../services/symptomServices";

const CalendarScreen = () => {
  const [selectedDay, setSelectedDay] = useState('');
  console.log(selectedDay);
  const { user} = useAuth();
  const [symptoms, setSymptoms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSymptoms = async () => {
      if (!user) return;
      try {
        setIsLoading(true);
        setError(null);
        const idToken = await user.getIdToken();
        const symptomsData = await getSymptoms(idToken);
        console.log("symptoms data", symptomsData);
        setSymptoms(symptomsData);
      } catch (error) {
        console.error("Failed to fetch symptoms:", error);
        setError("Failed to retrieve symptoms. Please try again later");
      } finally {
        setIsLoading(false);
      }
    }
    fetchSymptoms();
  }, [user])
  
  return (
    <Calendar
    onDayPress={day => {
      setSelectedDay(day.dateString);
    }}
    markedDates={{
      [selectedDay]: {selected: true, disableTouchEvent: true, selectedDotColor: "orange"}
    }}
    />
  );
};

export default CalendarScreen;