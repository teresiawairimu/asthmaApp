import React, {useState, useEffect} from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, Pressable, StyleSheet } from "react-native";
import { useRoute, useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useAuth } from "../../context/AuthContext";
//import { logSymptoms, getSymptoms, retrieveSymptomsByDate, updateSymptoms } from "../../services/symptomServices";
import { retrieveMoodByDate, logMood, updateMood } from "../../services/moodServices";
import { SafeAreaView } from "react-native-safe-area-context";
import SymptomsScreen from "./SymptomsScreen";
import TodayScreen from "./TodayScreen";
import MoodScreen from "./MoodScreen";
import { useEntries } from "../../context/EntriesContext";


const EntryScreen = ({route}) => {
  //const [mood, setMood] = useState(null);
  //const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {user} = useAuth();

  //const route = useRoute();
  const navigation = useNavigation();
  const {routeSelectedDate} = route.params;

  const {
    setSelectedDate,
    selectedDate,
    symptoms,
    mood,
    loading: EntriesLoading
  } = useEntries();

  useEffect(() => {
    setSelectedDate(routeSelectedDate);
  }, [routeSelectedDate, setSelectedDate]);

  /*useEffect(() => {
    const fetchMoodData = async () => {
      if (!user) return;
      try {
        setLoading(true);
        setError(null);
        const idToken = await user.getIdToken();
        //const symptomsData = await retrieveSymptomsByDate(selectedDate, idToken);
        const moodData = await retrieveMoodByDate(routeSelectedDate, idToken);
        //console.log("symptoms data from selected date in entry screen", symptomsData);
        console.log("mood data from selected date", moodData);
        //setSymptoms(symptomsData);
        setMood(moodData);
      } catch (error) {
        console.error(error);
        setError("Failed to retrieve mood entries. Please try again later");
      } finally {
        setLoading(false);
      }
    }
    fetchMoodData();
  }, [routeSelectedDate, user]);

  
  const handleSymptomsUpdate = async (newSymptomData) => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      const idToken = await user.getIdToken(true);
      if (symptoms && symptoms.id) {
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
  };*/

  if (loading || EntriesLoading) {
      return <Text>Loading...</Text>;
  }
  if (error) {
      return <Text>{error}</Text>
  }

  

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <View>
        <Text>Entry for { routeSelectedDate}</Text>
        <View>
          {mood && Object.keys(mood).length > 0 ? (
          <MoodScreen
            existingData={mood || null}
            key={selectedDate || "new-entry"}
            //routeSelectedDate={routeSelectedDate}
            editFromDateClick={true}
          />
        ) : (
          <Text>No Moods logged</Text>
        )}
        </View>


      <View>
       {symptoms ? (
        <>
        <Pressable
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.show}>
            <Icon name="clipboard" size={30} color="#4A90E2" />
            <Text style={{ padding: 10, fontSize: 16, fontWeight: "bold"}}>
              View Symptoms
            </Text>
          </View>
        </Pressable>
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
              
                <SymptomsScreen
                  existingData={symptoms}
                  //selectedDate={selectedDate}
                  editFromDateClick={true}
                  //onSubmit={handleSymptomsUpdate}
                />
              
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.closeButton}
              >
                <Text style={styles.closeText}>Close</Text>
                      
              </Pressable>
            </ScrollView>
          </SafeAreaView>
        </Modal>
        </> 
        ) : (
        <Text>No symptoms logged</Text>
      )}
      </View>
      </View>
    </SafeAreaView>
  )
};


export default EntryScreen;

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1
  },
  modalContainer: {
    //flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 30,
    paddingBottom: 30
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
  },
  show: {
    flexDirection: "row",
    //alignSelf: "center"
    padding: 10

  }
})