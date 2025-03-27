import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import CheckBox  from "expo-checkbox";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome6";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";



const SymptomsScreen = ({ existingData, selectedDate, onSubmit}) => {
const [selectedSymptoms, setSelectedSymptoms] = useState(existingData?.symptoms || []);
  console.log(selectedSymptoms);
  const [selectedSymptomsSeverity, setSelectedSymptomsSeverity] = useState(existingData?.symptoms_severity || null);
  console.log(selectedSymptomsSeverity);
  const [selectedTimePeriods, setSelectedTimePeriods] = useState(existingData?.time_periods || []);
  console.log(selectedTimePeriods)
  const [selectedActivityType, setSelectedActivityType] = useState(existingData?.activity_type || []);
  console.log(selectedActivityType)
  const [selectedActivityLevel, setSelectedActivityLevel] = useState(existingData?.activity_level || null);
  console.log(selectedActivityLevel);
  const [selectedEnvironmentalFactors, setSelectedEnvironmentalFactors] = useState(existingData?.environmental_factors || []);
  console.log(selectedEnvironmentalFactors);
  const [selectedTriggers, setSelectedTriggers] = useState(existingData?.triggers || [])
  const [isChecked, setIsChecked] = useState(existingData?.rescueinhaler_used || false);
  const [isEditMode, setIsEditMode] = useState(!existingData);
  const [error, setError] = useState(null);
  console.log("existing data in symptoms file", existingData);


 

  const formatSymptomName = (key) => {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const processSymptomData = async () => {
    try {
      const symptomData = {
        symptom_date : selectedDate || new Date().toISOString(),
        symptoms: selectedSymptoms,
        symptoms_severity: selectedSymptomsSeverity,
        time_periods: selectedTimePeriods,
        activity_type: selectedActivityType,
        activity_level: selectedActivityLevel,
        environmental_factors: selectedEnvironmentalFactors,
        triggers: selectedTriggers,
        rescueinhaler_used: isChecked,
      };
      await onSubmit(symptomData);
      setIsEditMode(false);
    } catch (error) {
      console.error(error);
      setError("An error occurred while processing symptom data")
    }
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
    Basketball: <FontAwesomeIcon name="basketball" size={20} color="#4A90E2" />,
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
    <SafeAreaView style={styles.safeAreaStyle}>
      <View style={styles.mainContainer}>
    <ScrollView
    //style={styles.scrollView}
    //contentContainerStyle={styles.scrollViewContent}
    showsVerticalScrollIndicator={true}
    >
    <View style={styles.container}>
      <View style={isEditMode ?  styles.viewModeContainer : styles.editModeContainer}>
      <Text style={styles.mainTitle}>How have you been?</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.title}>Which symptoms have you experienced?</Text>
            <View style={styles.grid}>
              {Object.entries(customSymptoms).map(([symptom, icon]) => (
                <View key={symptom} style={styles.item}>
                  <TouchableOpacity
                    disabled={!isEditMode}
                    onPress={() => {
                      setSelectedSymptoms(previousSymptoms => previousSymptoms.includes(symptom)
                        ? previousSymptoms.filter(s => s !== symptom)
                        : [...previousSymptoms, symptom]);
                    }}
                  >
                    {icon}
                    <Text style={[styles.symptomText, 
                      selectedSymptoms.includes(symptom) ? styles.textSelected : null
                    ]}>{formatSymptomName(symptom)}</Text>
                  </TouchableOpacity>              
                </View>
              ))}
           </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.title}>How would you rate your symptoms' severity?</Text>
            <View style={styles.grid}>
              {Object.entries(customSymptomSeverityLevels).map(([symptomSeverity, icon]) => (
                <View key={symptomSeverity} style={styles.item}>
                  <TouchableOpacity 
                    disabled={!isEditMode}
                    onPress={() => {
                      setSelectedSymptomsSeverity(previous =>
                        previous === symptomSeverity ? null : symptomSeverity);
                    }}
                  >
                    {icon}
                    <Text style={[styles.symptomText, 
                      selectedSymptomsSeverity === symptomSeverity ? styles.textSelected : null]}>{symptomSeverity}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.title}>What time periods did you experience these symptoms?</Text>
            <View style={styles.grid}>
              {Object.entries(customTimePeriods).map(([timePeriod, icon]) => (
                <View key={timePeriod} style={styles.item}>
                  <TouchableOpacity 
                    disabled={!isEditMode} 
                    onPress={() =>{
                      setSelectedTimePeriods(previousPeriods => previousPeriods.includes(timePeriod)
                        ? previousPeriods.filter(p => p !== timePeriod)
                        : [...previousPeriods, timePeriod]);
                    }}
                  >
                    {icon}
                    <Text style={[styles.symptomText,
                      selectedTimePeriods.includes(timePeriod) ? styles.textSelected : null
                      ]}>{timePeriod}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.title}>Which activities were you participating in?</Text>
            <View style={styles.grid}>
              {Object.entries(customActivityType).map(([activityType, icon]) => (
                <View key={activityType} style={styles.item}>
                  <TouchableOpacity 
                    disabled={!isEditMode} 
                    onPress={() => {
                      setSelectedActivityType(previousActivity => previousActivity.includes(activityType)
                        ? previousActivity.filter(activity => activity !== activityType)
                        : [...previousActivity, activityType]);
                    }}
                  >
                    {icon}
                    <Text style={[styles.symptomText,
                      selectedTimePeriods.includes(activityType) ? styles.textSelected : null
                      ]}>{activityType}</Text> 
                  </TouchableOpacity>
                </View>
              ))}
            </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.title}>How would you rate the intensity of your activities?</Text>
            <View style={styles.grid}>
              {Object.entries(customActivityLevel).map(([activityLevel, icon]) => (
                <View key={activityLevel} style={styles.item}>
                  <TouchableOpacity disabled={!isEditMode} onPress={() => {
                    setSelectedActivityLevel(previous => 
                      previous === activityLevel ? null : activityLevel);
                    }}
                  >
                    {icon}
                    <Text style={[styles.symptomText,
                      selectedActivityLevel === activityLevel ? styles.textSelected : null
                      ]}>{activityLevel}</Text> 
                  </TouchableOpacity>
                </View>
              ))}
            </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.title}>What about environmental factors?</Text>
            <View style={styles.grid}>
              {Object.entries(customEnvironmentalFactors).map(([environmentalFactor, icon]) => (
                <View key={environmentalFactor} style={styles.item}>
                  <TouchableOpacity disabled={!isEditMode} onPress={() => {
                    setSelectedEnvironmentalFactors(previousFactors => previousFactors.includes(environmentalFactor)
                      ? previousFactors.filter(factor => factor !== environmentalFactor)
                      : [...previousFactors, environmentalFactor]);
                    }}
                  >
                    {icon}
                    <Text style={[styles.symptomText,
                      selectedEnvironmentalFactors.includes(environmentalFactor)  ? styles.textSelected : null
                    ]}>{formatSymptomName(environmentalFactor)}</Text> 
                  </TouchableOpacity>
                </View>
              ))}
            </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.title}>Were you exposed to any known triggers?</Text>
            <View style={styles.grid}>
              {Object.entries(customTriggers).map(([trigger, icon]) => (
                <View key={trigger} style={styles.item}>
                  <TouchableOpacity disabled={!isEditMode} onPress={() => {
                    setSelectedTriggers(previousTriggers => previousTriggers.includes(trigger)
                      ? previousTriggers.filter(t => t !== trigger)
                      : [...previousTriggers, trigger]);
                    }}
                  >
                    {icon}
                    <Text style={[styles.symptomText,
                      selectedTriggers.includes(trigger)  ? styles.textSelected : null
                    ]}>{formatSymptomName(trigger)}</Text> 
                  </TouchableOpacity>
                </View>
              ))}
            </View>
      </View>

      <View style={styles.fieldContainer}>
        <View style={styles.grid}>
          <View style={styles.section}>
            <CheckBox
              value={isChecked}
              onValueChange={setIsChecked}
              disabled={!isEditMode}
              style={styles.checkbox}
              />
                <Text style={styles.paragraph}>Did you use your rescue inhaler?</Text>
              </View>
            </View>
      </View>


      {error && <Text style={styles.errorText}>{error}</Text>}

      {isEditMode ? (
        <>
        <TouchableOpacity 
        style={styles.submitButton}
        onPress={processSymptomData}
        >
          <Text style={styles.submitButtonText}>Save Symptoms</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.submitButton}
        onPress={() => setIsEditMode(false)}
        >
          <Text style={styles.submitButtonText}>Cancel</Text>
        </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
        onPress={() => setIsEditMode(true)}
        >
          <Text>Edit Symptoms</Text>
        </TouchableOpacity>
      )}
      </View>
     </View>
     </ScrollView>
     </View>
     </SafeAreaView>

  );
};
    
const styles = StyleSheet.create({
  //scrollView: {
    //flex: 1
  //},
  //scrollViewContent: {
    //paddingBottom: 100
  //},
  safeAreaStyle: {
    flex: 1
  },
 
  container: {
    //flex: 1,
    padding: 10,
    backgroundColor: "#F5F7FA",
    //minHeight: "100%"
  },
  viewModeContainer: {
    backgroundColor: "#f5f5f5",
    borderColor: "#4b88c2",
    //paddingTop: 80
  },
  editModeContainer: {
    backgroundColor: "#fffbee",
    borderColor: "#ffd161",
    borderWidth: 2,
    padding: 10
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
   fieldContainer: {
    backgroundColor: "#ffffff",
    marginBottom: 20
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  item: {
    alignItems: "center",
    width: "30%", 
    marginBottom: 20,
  },
  symptomText: {
    marginTop: 5,
    textAlign: "justify",
    color: "#2C3E50"
  },
 
  textSelected: {
    color: "#009688",
    fontWeight: "bold",
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
  },
  submitButton: {
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    //marginBottom: 40
  },
  submitButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    //fontSize: 16
  }
});


export default SymptomsScreen;