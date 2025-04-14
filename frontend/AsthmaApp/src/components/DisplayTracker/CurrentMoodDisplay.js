import { View, Text, StyleSheet } from "react-native";
import { useEntries } from "../../context/EntriesContext";
import Icon from "react-native-vector-icons/FontAwesome6";

const  CurrentMoodDisplay = () => {
  const {
    mood
  } = useEntries();

  const moodKey = mood?.mood;



  const customEmojis = {
    happy: <Icon name="face-smile-beam" size={36} color="#daa520" />,
    energetic: <Icon name="face-laugh-beam" size={36} color="#daa520" />,
    calm: <Icon name="face-smile" size={36} color="#daa520" />,
    anxious: <Icon name="face-sad-tear" size={36} color="#daa520" />,
    stressed: <Icon name="face-frown" size={36} color="#daa520" />,
    irritable: <Icon name="face-angry" size={36} color="#daa520" />,
    sad: <Icon name="face-sad-cry" size={36} color="#daa520" />,
    tired: <Icon name="face-tired" size={36} color="#daa520" />
  };

  return (
    <View style={styles.moodContainer}>
      <Text style={styles.heading}> Current Mood</Text>
      <View style={styles.moodView}>
        {customEmojis[moodKey] || <Text style={styles.text}>Click log mood</Text>}
        <Text style={styles.moodName}>{moodKey}</Text>
      </View>
    </View>
  )

}

export default CurrentMoodDisplay;

const styles = StyleSheet.create({
  moodContainer: {
    marginTop: 30, 
    borderRadius: 30, 
    backgroundColor: "#fffaf0",
    //"#f8f8ff",
    //"#fff5ee", 
    padding: 10
  }, 
  heading: {
    padding : 10, 
    fontSize: 18, 
    fontWeight: "bold"
  },
  moodView: {
    flexDirection: "row", 
    padding: 10
  },
  moodName: {
    marginLeft: 10, 
    fontSize: 18, 
    fontWeight: "bold"
  },
  text: {
    fontSize: 16,
    margin: 10,
    fontWeight: "bold"
  }
});