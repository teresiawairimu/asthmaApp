import React, { useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MoodScreen from "./MoodScreen";
import CurrentMoodDisplay from "../../components/DisplayTracker/CurrentMoodDisplay";
import CurrentWeatherDisplay from "../../components/DisplayTracker/CurrentWeatherDisplay";
import CurrentInsightsDisplay from "../../components/DisplayTracker/CurrentInsightsDisplay";
import { useEntries } from "../../context/EntriesContext";


const TodayScreen = () => {

  const [modalVisible, setModalVisible] = useState(false);

  const {
    mood: contextMood
  } = useEntries()

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
              <MoodScreen existingData={contextMood}/>
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