import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useAuth } from "../../context/AuthContext";
import { logMood } from "../../services/moodServices";

const TodayScreen = ({navigation}) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const { user } = useAuth()

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
  
  
  console.log(selectedMood);
  const saveMood = async () => {
    if (!user || !selectedMood) {
      console.error("User is not logged in or no mood selected.");
      return;
    }
    const moodData = {
      mood: selectedMood,
      mood_date: new Date()
    }
    try {
      const token = await user.getIdToken();
      await logMood(moodData, token);
    } catch (error) {
      console.error("Failed to get token: ", error);
    }
  };
   
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      <View style={styles.emojiGrid}>
        {Object.entries(customEmojis).map(([mood, icon]) => (
          <View key={mood} style={styles.emojiItem}>
            <TouchableOpacity onPress={() => {
              setSelectedMood(mood);
              saveMood(); 
              navigation.navigate("Entries");
            }}>
              {icon}
            <Text style={styles.moodText}>{mood}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
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
});

export default TodayScreen;