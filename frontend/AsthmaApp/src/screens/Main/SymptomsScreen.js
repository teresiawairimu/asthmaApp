import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome6";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";

const SymptomsScreen = () => {

  const formatSymptomName = (key) => {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

 

  const customSymptoms = {
    cough: <FontAwesomeIcon name="head-side-cough" size={20} color="#4A90E2" />,
    shortness_of_breath: <MaterialCommunityIcon name="emoticon-sick-outline" size={20} color="#4A90E2"  />,
    chest_tightness: <MaterialCommunityIcon name="emoticon-sick-outline" size={20} color="#4A90E2" />,
    wheezing: <MaterialCommunityIcon name="emoticon-sick-outline" size={20} color="#4A90E2" />,
    fatigue: <MaterialCommunityIcon name="emoticon-sick-outline" size={20} color="#4A90E2" />,
    trouble_sleeping: <FontAwesomeIcon name="bed" size={20} color="#4A90E2" />,
    difficulty_speaking: <FontAwesomeIcon name="face-meh-blank" size={20} color="#4A90E2"/>
  }

  const customSymptomSeverityLevels = {
    mild: <FontAwesomeIcon name="face-meh" size={20} color="#4A90E2" />,
    moderate: <FontAwesomeIcon name="face-grimace" size={20} color="#4A90E2" />,
    severe: <FontAwesomeIcon name="face-dizzy" size={20} color="#4A90E2" />
  }

  const customTimePeriods = {
    morning: <FeatherIcon name="sunrise" size={20} color="#4A90E2" />,
    afternoon: <FeatherIcon name="sun" size={20} color="#4A90E2" />,
    evening: <FeatherIcon name="sunset" size={20} color="#4A90E2" />,
    night: <FeatherIcon name="moon" size={20} color="#4A90E2" />
  }

 

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>How have you been?</Text>

      <View style={styles.symptomContainer}>
        <Text style={styles.title}>Symptoms</Text>
        <View style={styles.symptomGrid}>
          {Object.entries(customSymptoms).map(([symptom, icon]) => (
            <View key={symptom} style={styles.symptomItem}>
              <TouchableOpacity onPress={() => {
              }}>
                {icon}
                <Text style={styles.symptomText}>{formatSymptomName(symptom)}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.symptomSeverityContainer}>
        <Text style={styles.title}>Symptoms Severity</Text>
        <View style={styles.symptomGrid}>
          {Object.entries(customSymptomSeverityLevels).map(([symptomSeverity, icon]) => (
            <View key={symptomSeverity} style={styles.symptomItem}>
              <TouchableOpacity>
                {icon}
                <Text style={styles.symptomText}>{symptomSeverity}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.timePeriodsContainer}>
        <Text style={styles.title}>What time periods did you experience these symptoms?</Text>
        <View style={styles.symptomGrid}>
          {Object.entries(customTimePeriods).map(([timePeriod, icon]) => (
            <View key={timePeriod} style={styles.symptomItem}>
              <TouchableOpacity>
                {icon}
                <Text style={styles.symptomText}>{timePeriod}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

     </View>

  );
};
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F5F7FA"
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
   symptomContainer: {
    backgroundColor: "#ffffff",
    marginBottom: 20
  
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20
  },
  symptomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  symptomItem: {
    alignItems: 'center',
    width: '30%', 
    marginBottom: 20,
  },
  symptomText: {
    marginTop: 5,
    textAlign: 'justify',
    color: "#2C3E50"
  },
  symptomSeverityContainer: {
    backgroundColor: "#ffffff",
    marginBottom: 20,
  },
  symptomSeverityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  symptomSeverityItem: {
    alignItems: 'center',
    width: '30%', 
    marginBottom: 20,
  },
  timePeriodsContainer: {
    backgroundColor: "#ffffff",
    marginBottom: 20
  }

});


export default SymptomsScreen;