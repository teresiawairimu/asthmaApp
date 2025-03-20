import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {View, Text, StyleSheet, Button} from "react-native";
import CustomButton from "../Common/CustomButton";
import {useForm } from "react-hook-form";


const AsthmaInfoForm = ({ initialData, onSubmit}) => {
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(true);
  const [triggersOpen, setTriggersOpen] = useState(false);
  const [selectedTriggers, setSelectedTriggers] = useState([]);
  const [selectedSeverity, setSelectedSeverity] = useState(null);
  const [medicationOpen, setMedicationOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState([]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const { handleSubmit} = useForm();

  useEffect(() => {
    if (initialData) {
      const { triggers, severity_level, medication_type, date_of_birth} = initialData
      setSelectedTriggers(triggers || []);
      setSelectedSeverity(severity_level || null);
      setSelectedMedication(medication_type || []);
      setDate(date_of_birth ? new Date(date_of_birth) : new Date());
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
        triggers: selectedTriggers,
        severity_level: selectedSeverity,
        medication_type: selectedMedication,
        date_of_birth: date
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
      isEditMode ? styles.editModeContainer : styles.viewModeContainer
    ]}>
      <View style={styles.birth}>
      <Button title="Select Date of Birth" onPress={() => isEditMode && setShow(true)} disabled={!isEditMode} />
      <Text>DOB: {date.toDateString()}</Text>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          editable={isEditMode}
        />
      )}
      </View>

   
    
      <View style={styles.severity}>
        <RNPickerSelect
          placeholder={{ label: "Select the asthma severity", value: null, color: "black"}}
          onValueChange={setSelectedSeverity}
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
            }
          }}
        />
      </View>

      <View style={styles.trigger}>
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
            {label: "Allergies", value: "allergies"}
          ]}
          setOpen={(open) => {
            if (isEditMode) {
              setTriggersOpen(open);
              if (open) setMedicationOpen(false);
            }
          }}
          setValue={setSelectedTriggers}
          setItems={setTriggers}
          multiple={true}
          mode="BADGE"
          listMode="MODAL"
          disabled={!isEditMode}
        />
      </View>

  

      <View style={styles.medication}>
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
          setItems={setMedication}
          multiple={true}
          mode="BADGE"
          disabled={!isEditMode}
        />
      </View>

   
        {error && <Text style={styles.errorText}>{error}</Text>}
        <View>
          {isEditMode ? (
            <>
              <CustomButton 
                title="Save"
                onPress={handleSubmit(processForm)}
                disabled={isLoading}
              />
              <CustomButton
                title="Cancel"
                onPress={() => setIsEditMode(false)}
              />
            </>
          ) : (
            <CustomButton
              title="Edit"
              onPress={() => setIsEditMode(true)}
            />
          )}
      </View>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer: {
    padding: 16,
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
  birth: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10
  },
  severity: {
    margin: 10
  },
  trigger: {
    width: 300,
    margin: 10,
    zIndex: 3000
  },
  medication: {
    width: 300,
    margin: 10,
  },
});

export default AsthmaInfoForm;