import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import CustomButton from "../../components/Common/CustomButton";

const TodayScreen = ({existingData, selectedDate, onSubmit}) => {
  const [selectedMood, setSelectedMood] = useState(existingData?.mood_today || null);
  const [isEditMode, setIsEditMode] = useState(!existingData);
  const [error, setError] = useState(null);


  const handleMoodData = async () => {
    try {
      if (!selectedMood) {
        setError("Please select a mood");
        return;
      }
      
      const moodData = {
        mood_today: selectedMood,
        mood_date: selectedDate || new Date().toISOString(),
      }
      await onSubmit(moodData);
      setIsEditMode(false);
    } catch (error) {
      console.error(error);
      setError("An error occurred while processing mood data");
    }
  };

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
  
  console.log("TodayScreen props:", {existingData, onSubmit});
  console.log("onSubmit type:", typeof onSubmit);
  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.title}>How are you feeling today?</Text>
          <View style={styles.emojiGrid}>
            {Object.entries(customEmojis).map(([mood, icon]) => (
              <View key={mood} style={styles.emojiItem}>
                <TouchableOpacity disabled={!isEditMode} onPress={() => {
                  setSelectedMood(previous =>
                    previous === mood ? null : mood);
                  }}
                >
                  {icon}
                  <Text style={[styles.moodText,
                    selectedMood === mood ? styles.textSelected : null]}>{mood}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
      </View>


      {error && <Text style={styles.errorText}>{error}</Text>}
      {isEditMode ? (
        <>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleMoodData}
          >
            <Text style={styles.submitButtonText}>
              Submit Mood
            </Text>
          </TouchableOpacity>
          <CustomButton title="Cancel" onPress={() => {
            setIsEditMode(false);
          }}/>
        </>
      ) : (
        <CustomButton title="Edit Mood" 
        onPress={() => setIsEditMode(true)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    color: "#F5F7FA"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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

export default TodayScreen;