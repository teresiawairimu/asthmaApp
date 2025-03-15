import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import CheckBox  from "expo-checkbox";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome6";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useAuth } from "../../context/AuthContext";

const SymptomsScreen = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  console.log(selectedSymptoms);
  const [selectedSymptomsSeverity, setSelectedSymptomsSeverity] = useState(null);
  console.log(selectedSymptomsSeverity);
  const [selectedTimePeriods, setSelectedTimePeriods] = useState([]);
  console.log(selectedTimePeriods)
  const [selectedActivityType, setSelectedActivityType] = useState([]);
  console.log(selectedActivityType)
  const [selectedActivityLevel, setSelectedActivityLevel] = useState(null);
  console.log(selectedActivityLevel);
  const [selectedEnvironmentalFactors, setSelectedEnvironmentalFactors] = useState([]);
  console.log(selectedEnvironmentalFactors);
  const [selectedTriggers, setSelectedTriggers] = useState([])
  const [isChecked, setChecked] = useState(false);
  console.log(isChecked);
  const [symptomErrors, setSymptomsErrors] = useState([]);
  const { user } = useAuth();

  const formatSymptomName = (key) => {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleSubmit = async () => {
    setSymptomsErrors([]);

    if (!user) {
      setSymptomsErrors(["User is not logged in"]);
      return;
    }

    if (selectedSymptoms.length === 0) {
      setSymptomsErrors(["Please select at least one symptom"]);
      return;
    }

    const symptomData = {
      symptom_date : new Date(),
      symptoms: selectedSymptoms,
      symptoms_severity: selectedSymptomsSeverity,
      time_periods: selectedTimePeriods,
      activity_type: selectedActivityType,
      activity_level: selectedActivityLevel,
      environmental_factors: selectedEnvironmentalFactors,
      rescue_inhaler: isChecked,
    }
    try {
      const token = await user.getIdToken();
      await logSymptoms(symptomData, token);
    } catch (error) {
      console.error(error);
      setSymptomsErrors([error.message]);
    };
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
    mild: <FontAwesomeIcon name="face-meh" size={20} color="#00b300" />,
    moderate: <FontAwesomeIcon name="face-grimace" size={20} color="#e6e600" />,
    severe: <FontAwesomeIcon name="face-dizzy" size={20} color="#ff0000" />,

  }

  const customTimePeriods = {
    morning: <FeatherIcon name="sunrise" size={20} color="#4A90E2" />,
    afternoon: <FeatherIcon name="sun" size={20} color="#4A90E2" />,
    evening: <FeatherIcon name="sunset" size={20} color="#4A90E2" />,
    night: <FeatherIcon name="moon" size={20} color="#4A90E2" />
  }

  const customActivityType = {
    walking: <FontAwesomeIcon name="person-walking" size={20} color="#4A90E2" />,
    running: <FontAwesomeIcon name="person-running" size={20} color="#4A90E2" />,
    cycling: <FontAwesomeIcon name="person-biking" size={20} color="#4A90E2" />,
    Baketball: <FontAwesomeIcon name="basketball" size={20} color="#4A90E2" />,
    sports: <FontAwesomeIcon name="medal" size={20} color="#4A90E2" />,
    workouts: <FontAwesomeIcon name="dumbbell" size={20} color="#4A90E2" />,
    others: <FontAwesomeIcon name="people-pulling" size={20} color="#4A90E2" />
  }

  const customActivityLevel = {
    low: <FontAwesomeIcon name="face-grin-wide" size={20} color="#00b300" />,
    moderate: <FontAwesomeIcon name="face-grin-beam-sweat" size={20} color="#e6e600" />,
    high: <FontAwesomeIcon name="face-grin-tears" size={20} color="#ff0000" />
  }

  const customEnvironmentalFactors = {
    high_pollen_levels: <FontAwesomeIcon name="box-tissue" size={20} color="#4A90E2" />,
    cold_weather: <FontAwesomeIcon name="temperature-low" size={20} color="#4A90E2" />,
    high_humidity: <FontAwesomeIcon name="droplet" size={20} color="#4A90E2" />,
    poor_air_quality: <FontAwesomeIcon name="head-side-mask" size={20} color="#4A90E2" />
  }

  const customTriggers = {
    air_pollution: <FontAwesomeIcon name="head-side-mask" size={20} color="#4A90E2" />,
    allergies: <FontAwesomeIcon name="hand-dots" size={20} color="#4A90E2" />,
    cold_air: <FontAwesomeIcon name="temperature-low" size={20} color="#4A90E2" />,
    cleaning_products: <FontAwesomeIcon name="soap" size={20} color="#4A90E2" />,
    dust: <FontAwesomeIcon name="head-side-mask" size={20} color="#4A90E2" />,
    exercise: <FontAwesomeIcon name="dumbbell" size={20} color="#4A90E2" />,    
    mold: <FeatherIcon name="home" size={20} color="#4A90E2" />,
    pollen: <FontAwesomeIcon name="box-tissue" size={20} color="#4A90E2" />,
    respiratory_infection: <FontAwesomeIcon name="lungs-virus" size={20} color="#4A90E2" />,
    stress: <FontAwesomeIcon name="face-frown" size={20} color="#4A90E2" />,
    smoke: <FontAwesomeIcon name="smog" size={20} color="#4A90E2" />,
    strong_odors: <FontAwesomeIcon name="head-side-mask" size={20} color="#4A90E2" />   
  }

 


  

 

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.mainTitle}>How have you been?</Text>

      <View style={styles.symptomContainer}>
        <Text style={styles.title}>Which symptoms have you experienced?</Text>
        <View style={styles.symptomGrid}>
          {Object.entries(customSymptoms).map(([symptom, icon]) => (
            <View key={symptom} style={styles.symptomItem}>
              <TouchableOpacity 
              onPress={() => {
                setSelectedSymptoms(previousSymptoms => previousSymptoms.includes(symptom)
                ? previousSymptoms.filter(s => s !== symptom)
                : [...previousSymptoms, symptom]);
              }}>
                {icon}
                <Text style={[styles.symptomText, 
                  selectedSymptoms.includes(symptom) ? styles.symptomTextSelected : null
                ]}>{formatSymptomName(symptom)}</Text>
              </TouchableOpacity>              
            </View>
          ))}
        </View>
        {selectedSymptoms.length > 0 && (<Text>Selected: {selectedSymptoms.join(", ")}</Text>)}
      </View>

      <View style={styles.symptomSeverityContainer}>
        <Text style={styles.title}>How would you rate your symptoms' severity?</Text>
        <View style={styles.symptomGrid}>
          {Object.entries(customSymptomSeverityLevels).map(([symptomSeverity, icon]) => (
            <View key={symptomSeverity} style={styles.symptomItem}>
              <TouchableOpacity 
              onPress={() => {
                setSelectedSymptomsSeverity(symptomSeverity);
              }}>
                {icon}
                <Text style={[styles.symptomText, 
                  selectedSymptomsSeverity === symptomSeverity ? styles.severityTextSelected : null]}>{symptomSeverity}</Text>
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
              <TouchableOpacity onPress={() =>{
                  setSelectedTimePeriods(previousPeriods => previousPeriods.includes(timePeriod)
                  ? previousPeriods.filter(p => p !== timePeriod)
                  : [...previousPeriods, timePeriod])
              }}>
                {icon}
                <Text style={[styles.symptomText,
                  selectedTimePeriods.includes(timePeriod) ? styles.timeTextSelected : null
                ]}>{timePeriod}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.activityTypeContainer}>
        <Text style={styles.title}>Which activities were you participating in?</Text>
        <View style={styles.symptomGrid}>
          {Object.entries(customActivityType).map(([activityType, icon]) => (
            <View key={activityType} style={styles.symptomItem}>
              <TouchableOpacity onPress={() => {
                setSelectedActivityType(previousActivities => previousActivities.includes(activityType)
                ? previousActivities.filter(activity => activity !== activityType)
                : [...previousActivities, activityType]
              )
              }}>
                {icon}
                <Text style={[styles.symptomText,
                  selectedActivityType.includes(activityType) ? styles.activityTypeTextSelected : null
                ]}>{activityType}</Text> 
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.activityLevelContainer}>
        <Text style={styles.title}>How would you rate the intensity of your activities?</Text>
        <View style={styles.symptomGrid}>
          {Object.entries(customActivityLevel).map(([activityLevel, icon]) => (
            <View key={activityLevel} style={styles.symptomItem}>
              <TouchableOpacity onPress={() => {
                setSelectedActivityLevel(activityLevel);
              }}>
                {icon}
                <Text style={[styles.symptomText,
                  selectedActivityLevel === activityLevel ? styles.activityLevelTextSelected : null
                ]}>{activityLevel}</Text> 
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.environmentalFactorsContainer}>
        <Text style={styles.title}>What about environmental factors?</Text>
        <View style={styles.symptomGrid}>
          {Object.entries(customEnvironmentalFactors).map(([environmentalFactor, icon]) => (
            <View key={environmentalFactor} style={styles.symptomItem}>
              <TouchableOpacity onPress={() => {
                setSelectedEnvironmentalFactors(previousFactors => previousFactors.includes(environmentalFactor)
                ? previousFactors.filter(factor => factor !== environmentalFactor)
                : [...previousFactors, environmentalFactor]
              )
              }}>
                {icon}
                <Text style={[styles.symptomText,
                  selectedEnvironmentalFactors.includes(environmentalFactor)  ? styles.factorsTextSelected : null
                ]}>{formatSymptomName(environmentalFactor)}</Text> 
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.triggersContainer}>
        <Text style={styles.title}>Were you exposed to any known triggers?</Text>
        <View style={styles.symptomGrid}>
          {Object.entries(customTriggers).map(([trigger, icon]) => (
            <View key={trigger} style={styles.symptomItem}>
              <TouchableOpacity onPress={() => {
                setSelectedTriggers(previousTriggers => previousTriggers.includes(trigger)
                ? previousTriggers.filter(t => t !== trigger)
                : [...previousTriggers, trigger]
              )
              }}>
                {icon}
                <Text style={[styles.symptomText,
                  selectedTriggers.includes(trigger)  ? styles.triggersTextSelected : null
                ]}>{formatSymptomName(trigger)}</Text> 
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.inhalerContainer}>
        <View style={styles.symptomGrid}>
          <View style={styles.section}>
              <CheckBox
                value={isChecked}
                onValueChange={setChecked}
                style={styles.checkbox}
              />
              <Text style={styles.paragraph}>Did you use your rescue inhaler?</Text>
            </View>
        </View>
      </View>

      {symptomErrors.length > 0 && (
        <View style={styles.errorContainer}>
          {symptomErrors.map((error, index) => (
            <Text key={index} style={styles.errorText}>{error}</Text>
          ))}
        </View>
      )}


     </View>
     </ScrollView>

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
    fontWeight: "bold",
    textAlign: "center",
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  symptomItem: {
    alignItems: "center",
    width: "30%", 
    marginBottom: 20,
  },
  symptomText: {
    marginTop: 5,
    textAlign: "justify",
    color: "#2C3E50"
  },
  symptomSeverityContainer: {
    backgroundColor: "#ffffff",
    marginBottom: 20,
  },
  timePeriodsContainer: {
    backgroundColor: "#ffffff",
    marginBottom: 20
  },
  activityTypeContainer: {
    backgroundColor: "#ffffff",
    marginBottom: 20
  },
  activityLevelContainer: {
    backgroundColor: "#ffffff",
    marginBottom: 20
  },
  environmentalFactorsContainer: {
    backgroundColor: "#ffffff",
    marginBottom: 20
  },
  triggersContainer: {
    backgroundColor: "#ffffff",
    marginBottom: 20
  },
  inhalerContainer: {
    backgroundColor: "#ffffff",
    marginBottom: 20
  },
  symptomTextSelected: {
    color: "#009688",
    fontWeight: "bold",
  },
  severityTextSelected: {
    color: "#009688", 
    fontWeight: "bold",
  },
  timeTextSelected: {
    color: "#009688", 
    fontWeight: "bold",
  }, 
  activityTypeTextSelected: {
    color: "#009688", 
    fontWeight: "bold",
  },
  activityLevelTextSelected: {
    color: "#009688",
    fontweight: "bold"
  },
  factorsTextSelected: {
    color: "#009688",
    font: "bold"
  },
  triggersTextSelected: {
    color: "#009688",
    font: "bold"
  },
  section: {
    flexDirection: "row",
  },
  checkbox: {
    margin: 8
  },
  paragraph: {
    fontSize: 15,
    paddingTop: 5,
    fontWeight: "bold"
  }
  

});


export default SymptomsScreen;