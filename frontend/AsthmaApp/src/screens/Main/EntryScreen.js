import React, {useState, useEffect} from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, Pressable, StyleSheet } from "react-native";
import { useRoute, useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useAuth } from "../../context/AuthContext";
import { logSymptoms, retrieveSymptomsByDate, updateSymptoms } from "../../services/symptomServices";
import { retrieveMoodByDate, logMood, updateMood } from "../../services/moodServices";
import { SafeAreaView } from "react-native-safe-area-context";
import SymptomsScreen from "./SymptomsScreen";
import TodayScreen from "./TodayScreen";


const EntryScreen = () => {
  const [mood, setMood] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {user} = useAuth();

  const route = useRoute();
  const navigation = useNavigation();
  const {selectedDate} = route.params;

  useEffect(() => {
    const fetchEntries = async () => {
      if (!user) return;
      try {
        setLoading(true);
        setError(null);
        const idToken = await user.getIdToken();
        const symptomsData = await retrieveSymptomsByDate(selectedDate, idToken);
        const moodData = await retrieveMoodByDate(selectedDate, idToken);
        console.log("symptoms data from selected date in entry screen", symptomsData);
        console.log("mood data from selected date", moodData);
        setSymptoms(symptomsData);
        setMood(moodData);
      } catch (error) {
        console.error(error);
        setError("Failed to retrieve entries. Please try again later");
      } finally {
        setLoading(false);
      }
    }
    fetchEntries();
  }, [selectedDate, user]);


  const handleSymptomsUpdate = async (newSymptomData) => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      const idToken = await user.getIdToken(true);
      if (symptoms) {
        await updateSymptoms(symptoms.id, newSymptomData, idToken);
        setSymptoms({...newSymptomData, id: symptoms.id})
      } else {
        const result = await logSymptoms(newSymptomData, idToken);
        setSymptoms({...newSymptomData, id: result.id});
        navigation.navigate("Today")
      }
    } catch (error) {
      setError("Failed to update symptom info");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMoodUpdate = async (newMoodData) => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      const idToken = await user.getIdToken(true);
      if (mood) {
        await updateMood(mood.id, newMoodData, idToken);
        setMood({...newMoodData, id: mood.id})
      } else {
        const result = await logMood(newMoodData, idToken);
        setMood({...newMoodData, id: result.id});
        navigation.navigate("Today")
      }
    } catch (error) {
      setError("Failed to update mood info");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  

  if (loading) {
      return <Text>Loading...</Text>;
  }
  if (error) {
      return <Text>{error}</Text>
  }

  console.log("Mood data type:", typeof mood);
  console.log("Mood data:", mood);
  console.log("handleMoodUpdate type:", typeof handleMoodUpdate);

  return (
    <SafeAreaView>
      <View>
        <Text>Entry for { selectedDate}</Text>

          <TodayScreen
            existingData={mood || null}
            selectedDate={selectedDate}
            onSubmit={handleMoodUpdate}  
          />
       
          
        


        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <SafeAreaView style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalScrollContent}
              showsVerticalScrollIndicator={true}>
              {symptoms ? (
                <SymptomsScreen
                  existingData={symptoms}
                  selectedDate={selectedDate}
                  onSubmit={handleSymptomsUpdate}
                />
              ) : (
                <Text>No symptoms logged</Text>
              )}
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.closeButton}
              >
                <Text style={styles.closeText}>Close</Text>
                      
              </Pressable>
            </ScrollView>
          </SafeAreaView>
        </Modal>
        <Pressable
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.show}>
            <Icon name="clipboard" size={30} color="#4A90E2" />
            <Text>
              Symptoms
            </Text>
          </View>
        </Pressable>         

     

      </View>
    </SafeAreaView>
  )
};


export default EntryScreen;

const styles = StyleSheet.create({
  modalContainer: {
    //flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 30
  },
  modalScrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 50,
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
})