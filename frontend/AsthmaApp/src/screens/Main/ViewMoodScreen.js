import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import CustomButton from "../../components/Common/CustomButton";
import { useEntries } from "../../context/EntriesContext";


const ViewMoodScreen = ({existingData, editFromDateClick, onEditPress}) => {
  //console.log("isondashboard", isOnDashboard);
  const {
       loading: EntriesLoading
  } = useEntries();

  //const MoodDataToUse = existingData || contextMood;
  {/*const MoodDataToUse = existingData || 
    (isOnDashboard
      ? (contextMood && selectedDate === new Date().toLocaleDateString("en-CA") ? contextMood : null)
      : contextMood);*/}

  {/*const MoodDataToUse = existingData || 
    (selectedDate === new Date().toLocaleDateString("en-CA") 
    ? contextMood 
    : null);*/}

  //const isToday = selectedDate === new Date().toLocaleDateString("en-CA");

  

  const [selectedMood, setSelectedMood] = useState(null);
  //const [isEditMode, setIsEditMode] = useState(!existingData);
  //const [isEditMode, setIsEditMode] = useState(isToday && !existingData && !MoodDataToUse);
  //const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingData) {
      setSelectedMood(existingData.mood || null);
    }
  }, [existingData]);

  const customEmojis = {
    happy: <Icon name="face-smile-beam" size={30} color="#4A90E2" />,
    energetic: <Icon name="face-laugh-beam" size={30} color="#4A90E2" />,
    calm: <Icon name="face-smile" size={30} color="#4A90E2" />,
    anxious: <Icon name="face-sad-tear" size={30} color="#4A90E2" />,
    stressed: <Icon name="face-frown" size={30} color="#4A90E2" />,
    irritable: <Icon name="face-angry" size={30} color="#4A90E2" />,
    sad: <Icon name="face-sad-cry" size={30} color="#4A90E2" />,
    tired: <Icon name="face-tired" size={30} color="#4A90E2" />
  }
  

  if (loading || EntriesLoading) {
      return <Text>Loading...</Text>
    }
  
  return (
    /*<SafeAreaView style={styles.safeAreaStyle}>*/
    <View style={styles.container}>
      <View style={styles.viewModeContainer}>
      <View>
      <Text style={styles.title}>Today's Mood</Text>
          <View style={styles.emojiGrid}>
            {Object.entries(customEmojis).map(([mood, icon]) => (
              <View key={mood} style={styles.emojiItem}>
                <TouchableOpacity 
                //disabled={!isEditMode} 
                disabled={true}
                >
                  {icon}
                  <Text style={[styles.moodText,
                    selectedMood === mood ? styles.textSelected : null]}>{mood}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
      </View>


     
    
          <View style={{margin: 10}}>

        <CustomButton title="Edit Mood" 
        onPress={onEditPress}/>
        </View>
      
      </View>
    </View>

  );
};


export default ViewMoodScreen;

const styles = StyleSheet.create({
  safeAreaStyle: {
    //flex: 1,
    //paddingTop: 0
  },
  container: {
    //flex: 1,
    //padding: 10,
    color: "#F5F7FA"
  },
  viewModeContainer: {
    backgroundColor: "#fffbee",
    borderColor: "#ffd161",
    borderWidth: 2,
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    alignSelf: "center"
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emojiItem: {
    alignItems: 'center',
    width: '25%', 
    marginBottom: 20,
  },
  moodText: {
    marginTop: 5,
    textAlign: 'center',
    color: "#2C3E50"
  },
  textSelected: {
    color: "#009688",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: "#aaa",
  }
});