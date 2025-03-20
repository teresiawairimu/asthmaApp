import React, { useState, useEffect} from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { useAuth } from "../../context/AuthContext";
import { getSymptoms} from "../../services/symptomServices";
import SymptomsScreen from "./SymptomsScreen";

const CalendarScreen = () => {
  const [selectedDay, setSelectedDay] = useState('');
  console.log(selectedDay);
  const { user} = useAuth();
  const [symptoms, setSymptoms] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDateSymptoms, setSelectedDateSymptoms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [symptomData, setSymptomData] = useState(null);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);

    const filteredSymptoms = symptoms.filter(symptom => {
      const symptomDate = symptom.createdAt
      console.log("Raw createdAt", symptom.createdAt);
      console.log("symptomdate", symptomDate);
      return (
        symptomDate.getFullYear() === selectedDate.getFullYear() &&
        symptomDate.getMonth() === selectedDate.getMonth() &&
        symptomDate.getDate() === selectedDate.getDate()
      )
    })
    console.log("filteredSymptoms", filteredSymptoms);
    setSelectedDateSymptoms(filteredSymptoms);
    if (filteredSymptoms.length > 0) {
      setIsEditMode(true);
      setSymptomData(filteredSymptoms[0]);     
    } else {
      setIsEditMode(false);
      setSymptomData(null);
    }
    setModalVisible(true);
  };

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
  }, [user]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>{error}</Text>
  }
  
  return (
    <View>
    <Calendar
    onDayPress={day => {
      setSelectedDay(day.dateString);
      handleDateChange(new Date(day.dateString));
    }}
    markedDates={{
      [selectedDay]: {selected: true, disableTouchEvent: true, selectedDotColor: "orange"}
    }}
    />
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View>
        <View>
          <Text style={StyleSheet.modalTitle}>
            {isEditMode ? "Edit Symptoms" : "Log New Symptom"}
          </Text>
          <SymptomsScreen
            existingData={symptomData}
            isEditMode={isEditMode}
            selectedDate={date}
            onComplete={() => {
              setModalVisible(false);
              fetchSymptoms();
            }}
          />
          <TouchableOpacity
            style={StyleSheet.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={StyleSheet.closeButtonText}>Cancel</Text>

          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </View>
  );
};

export default CalendarScreen;