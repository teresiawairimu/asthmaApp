import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {View, Text, StyleSheet} from "react-native";
import CustomButton from "../Common/CustomButton";
import {useForm } from "react-hook-form";
import CheckBox  from "expo-checkbox";


const AsthmaInfoForm = ({ initialData, onSubmit}) => {
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(true);
  const [triggersOpen, setTriggersOpen] = useState(false);
  const [selectedTriggers, setSelectedTriggers] = useState([]);
  const [selectedSeverity, setSelectedSeverity] = useState(null);
  const [medicationOpen, setMedicationOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState([]);
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const { handleSubmit} = useForm();

  useEffect(() => {
    if (initialData) {
      console.log("initial data for asthma info", initialData);
      const { triggers, severity_level, medication_type, asthma_diagnosis} = initialData
      setSelectedTriggers(triggers || []);
      setSelectedSeverity(severity_level || null);
      setSelectedMedication(medication_type || []);
      setChecked(asthma_diagnosis || false)
      setIsEditMode(false);
    }
  }, [initialData]);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  }

  const processForm = () => {
    try {
      const asthmainfo = {
        asthma_diagnosis: checked,
        triggers: selectedTriggers,
        severity_level: selectedSeverity,
        medication_type: selectedMedication,
        //updated_at: new Date().toISOString().split("T")[0]
      };
      onSubmit(asthmainfo);
      setIsEditMode(false);
    } catch (error) {
      setError("An error occurred while processing your data");
      console.error(error);
    }  
  };

  return (
    <View style={[
      styles.formContainer,
      isEditMode ? styles.viewModeContainer : styles.editModeContainer
    ]}>
   

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Asthma Diagnosis: </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around"}}>
        <CheckBox
          value={checked}
          onValueChange={setChecked}
          style={styles.checkbox}
        />
        <Text style={styles.paragraph}>Have you been diagnosed with Asthma?</Text>
        </View>
      </View>

   
      <View style={styles.fieldContainer}>
       <Text style={styles.fieldLabel}>Asthma Severity: </Text>
        <RNPickerSelect
          placeholder={{ label: "Select the asthma severity", value: null}}
          onValueChange={setSelectedSeverity}
          value={selectedSeverity}
          items={[
            {label: "Mild", value: "mild"},
            {label: "Moderate", value: "moderate"},
            {label: "Severe", value: "severe"}
          ]}
          disabled={!isEditMode} 
          style={{
            placeholder: {
              fontWeight: "bold",
              color: "black"
            }, 
            inputIOS: { color: "black", fontSize: 16 },      
            inputAndroid: { color: "black", fontSize: 16 }
          }}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Triggers: </Text>
        <DropDownPicker
          placeholder="Select any known triggers"
          open={triggersOpen}
          value={selectedTriggers}
          items={[
            {label: "Pollen",  value: "pollen"},
            {label: "Dust", value: "dust"},
            {label: "Mold", value: "mold"},
            {label: "Air pollution", value: "air_pollution"},
            {label: "Cold Air", value: "cold_air"},
            {label: "Exercise", value: "exercise"},
            {label: "Stress", value: "stress"},
            {label: "Smoke", value: "smoke"},
            {label: "Strong Odors", value: "strong_odors"},
            {label: "Cleaning products", value: "cleaning_products"},
            {label: "Respiratory Infection", value: "respiratory_infection"},
            {label: "Allergies", value: "allergies"},
            {label: "Pet Dander", value: "pet_dander"},
            {label: "Scented Lotion", value: "scented_lotion"}
          ]}
          setOpen={(open) => {
            if (isEditMode) {
              setTriggersOpen(open);
              if (open) setMedicationOpen(false);
            }
          }}
          setValue={setSelectedTriggers}
          multiple={true}
          mode="BADGE"
          listMode="MODAL"
          disabled={!isEditMode}
        />
      </View>

  

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Medication: </Text>

        <DropDownPicker
          placeholder="Select medication types, if any"
          open={medicationOpen}
          value={selectedMedication}
          items={[
            {label: "Rescue",  value: "rescue"},
            {label: "Controller", value: "controller"},
            {label: "Biological", value: "biological"},
          ]}
          setOpen={(open) => {
            if (isEditMode) {
              setMedicationOpen(open);
              if (open) setTriggersOpen(false);
            }
          }}
          setValue={setSelectedMedication}
          multiple={true}
          mode="BADGE"
          disabled={!isEditMode}
        />
      </View>
  
        {error && <Text style={styles.errorText}>{error}</Text>}
        <View style={styles.button}>
          {isEditMode ? (
            <>
              <View style={{ padding: 10}}>
              <CustomButton 
                title="Save"
                onPress={handleSubmit(processForm)}
              />
              </View>
              <View style={{padding: 10}}>
              <CustomButton
                title="Cancel"
                onPress={() => setIsEditMode(false)}
              />
              </View>
            </>
          ) : (
            <View style={{ padding: 10}}>
            <CustomButton
              title="Edit"
              onPress={() => setIsEditMode(true)}
            />
            </View>
          )}
      </View>
    </View> 
  );
};

export default AsthmaInfoForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1
  },
  viewModeContainer: {
    backgroundColor: "#f5f5f5",
    borderColor: "#4b88c2"
  },
  editModeContainer: {
    backgroundColor: "#fffbee",
    borderColor: "#ffd161",
    borderWidth: 2
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
  },
  //birth: {
    //flexDirection: "row",
    //justifyContent: "space-between",
    //margin: 10
  //},
  //severity: {
    //margin: 10
  //},
  //trigger: {
    //width: 300,
    //margin: 10,
    //zIndex: 3000
  //},
  //medication: {
    //width: 300,
    //margin: 10,
  //},
  button: {
    padding: 10
  },
  fieldContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 3,
    backgroundColor: '#fff'
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333'
  }

});

