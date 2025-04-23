import React, { useState, useCallback} from "react";
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

  const {
    mood: contextMood,
    selectedDate,
    setSelectedDate
  } = useEntries()


  useFocusEffect(
    useCallback(() => {
      const todayDate = new Date().toLocaleDateString("en-CA");
      setSelectedDate(todayDate);
      console.log("Today screen focused - setting date to:", todayDate); 
      return () => {
      };
    }, [])
  );


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
  },
  container: {
    margin: 10,
    color: "#F3A87E"
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