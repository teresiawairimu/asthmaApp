import React, { useState, useEffect, useCallback} from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import MoodScreen from "./MoodScreen";
import CurrentMoodDisplay from "../../components/DisplayTracker/CurrentMoodDisplay";
import CurrentWeatherDisplay from "../../components/DisplayTracker/CurrentWeatherDisplay";
import CurrentInsightsDisplay from "../../components/DisplayTracker/CurrentInsightsDisplay";
import { useEntries } from "../../context/EntriesContext";


const TodayScreen = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);


  const {
    mood: contextMood,
    selectedDate,
    setSelectedDate
  } = useEntries()

  //useEffect(() => {
    //const todayDate = new Date().toLocaleDateString("en-CA");
    //setSelectedDate(todayDate);
    //console.log("today's screen selected date", selectedDate);
    //console.log("Today screen focused - setting date to:", todayDate);
  //}, [])

  useFocusEffect(
    useCallback(() => {
      const todayDate = new Date().toLocaleDateString("en-CA");
      setSelectedDate(todayDate);
      console.log("Today screen focused - setting date to:", todayDate); 
      return () => {
      };
    }, [])
  );

  {/*useFocusEffect(
   useCallback(() => {
      const todayDate = new Date().toLocaleDateString("en-CA");
      
      // Only open modal or update if date has changed
      if (selectedDate !== todayDate) {
        setSelectedDate(todayDate);
        console.log("Today screen focused - setting date to:", todayDate);
        
        // Force a delay before allowing interactions
        setIsReady(false);
        setTimeout(() => {
          setIsReady(true);
        }, 300); // Small delay to allow context to update
      } else {
        setIsReady(true);
      }
      
      return () => {};
    }, [selectedDate])
  );*/}

  {/*useFocusEffect(
    useCallback(() => {
      // This function both updates the selected date and fetches today's data
      resetToToday();
      return () => {};
    }, [resetToToday])
  );*/}
  


  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <View style={styles.container}>
        <ScrollView>
          <CurrentWeatherDisplay />
        
          <TouchableOpacity style={styles.modalOpenButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.modalOpenButtonText}>{contextMood ? "Update Mood" : "Log Mood"}</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.moodView}>
              <MoodScreen />
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(!modalVisible)}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <View>
            <CurrentMoodDisplay />
          </View>
          <View>
            <CurrentInsightsDisplay />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    //paddingTop: 0
  },
  container: {
    //flex: 1,
    //padding: 10,
    margin: 10,
    color: "#F3A87E"
    //"#F5B895"
    //"#FAD7C1"
    //"#FAF7F0" 
    //"#FDF9F3"
 
    //"#F5F7FA"
  },
  modalOpenButton: {
    alignItems: "center", 
    backgroundColor: "#87cefa", 
    marginTop: 30, 
    padding: 30, 
    borderRadius: 10
  },
  modalOpenButtonText: {
    color: "#ffffff", 
    fontSize: 20, 
    fontWeight: "bold"
  },
  moodView: {
    //paddingBottom: 20
    flex: 1, 
    marginTop: 200, 
    padding: 10
  },
  modalCloseButton: {
    alignItems:"center", 
    backgroundColor: "#ccc", 
    margin: 10, 
    padding: 10
  }
});

export default TodayScreen;