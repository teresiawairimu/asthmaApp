import React, { useState, useCallback, useEffect } from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MoodScreen from "./MoodScreen";
import ConsentScreen from "./ConsentScreen";
import CurrentMoodDisplay from "../../components/DisplayTracker/CurrentMoodDisplay";
import CurrentWeatherDisplay from "../../components/DisplayTracker/CurrentWeatherDisplay";
import CurrentInsightsDisplay from "../../components/DisplayTracker/CurrentInsightsDisplay";
import { retrieveConsent } from "../../services/consentServices";
import { useEntries } from "../../context/EntriesContext";
import { useAuth } from "../../context/AuthContext";


const TodayScreen = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [consentData, setConsentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const { user } = useAuth();

  const {
    mood: contextMood,
    selectedDate,
    setSelectedDate
  } = useEntries()

  useEffect(() => {
    const fetchConsentData = async () => {
      if (!user) return;
      try {
        setLoading(true);
        setError(null);
        const idToken = await user.getIdToken();
        const consentData = await retrieveConsent(idToken);
        setConsentData(consentData); 
        if (!consentData?.signed) {
          navigation.navigate("Consent");
        }
      } catch(error) {
        console.error("Failed to retrieve consent information", error);
        setError("Failed to retrieve consent information");
      } finally {
        setLoading(false);
      }
    } 
    fetchConsentData();
  }, [user, navigation])


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