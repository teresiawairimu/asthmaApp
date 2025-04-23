import React, {useState, useEffect} from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, Pressable, StyleSheet } from "react-native";
import { useRoute, useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useAuth } from "../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import SymptomsScreen from "./SymptomsScreen";
import MoodScreen from "./MoodScreen";
import { useEntries } from "../../context/EntriesContext";


const EntryScreen = ({route}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const {user} = useAuth();

 
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


  if (loading || EntriesLoading) {
      return <Text>Loading...</Text>;
  }
  if (error) {
      return <Text>{error}</Text>
  }

  

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <View>
        <Text style={styles.entryHeading}>Entry for { routeSelectedDate}</Text>
        <View style={styles.moodView}>
          {mood && Object.keys(mood).length > 0 ? (
            <MoodScreen
              existingData={mood || null}
              key={selectedDate || "new-entry"}
              //routeSelectedDate={routeSelectedDate}
              editFromDateClick={true}
            />
          ) : (
            <Text style={styles.textStyle}>No Moods logged</Text>
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
            <Text style={styles.symptomTextStyle}>
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
        <Text style={styles.textStyle}>No symptoms logged</Text>
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
  entryHeading: {
    alignSelf: "center", 
    marginBottom: 20, 
    fontSize: 18, 
    fontWeight: 600
  },
  textStyle: {
    fontSize: 16, 
    fontWeight: 600, 
    alignSelf: "center"
  },
  moodView: {
    margin: 10
  },
  symptomTextStyle: {
    padding: 10, 
    fontSize: 16, 
    fontWeight: "bold"
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
    padding: 10,
    marginTop: 10,

  }
})