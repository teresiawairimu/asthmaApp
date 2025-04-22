import React, { useContext, useState, useEffect, createContext } from "react";
import {useAuth } from "./AuthContext";
import { retrieveSymptomsByDate, updateSymptoms, logSymptoms } from "../services/symptomServices";
import { retrieveMoodByDate, logMood, updateMood } from "../services/moodServices";


const EntriesContext = createContext();

export const useEntries = () => {
  return useContext(EntriesContext);
};

export const EntriesProvider = ({children}) => {
  const [symptoms, setSymptoms] = useState(null);
  const [mood, setMood] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString("en-CA"))
    //new Date().toISOString().split("T")[0]);
  //const [refreshTrigger, setRefreshTrigger] = useState(0);
  console.log("selected date in context", selectedDate);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user} = useAuth();

  
  useEffect(() => {
    const fetchEntries = async () => {
      if (!user) return;
      try {
        setLoading(true);
        setError(null);
        const idToken = await user.getIdToken();
        const symptomsData = await retrieveSymptomsByDate(selectedDate, idToken);
        console.log("symptoms data from context", symptomsData);
        const moodData = await retrieveMoodByDate(selectedDate, idToken);
        console.log("mood data from context", moodData);
        setSymptoms(symptomsData);
        setMood(moodData);
      } catch (error) {
        console.error("Failed to fetch entries:", error);
        setError("Failed to retrieve entries. Please try again later");
      } finally {
        setLoading(false);
      }
       
    }
    fetchEntries();
  }, [selectedDate, user]);



  const handleSymptomsUpdate = async (newSymptomData) => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      const idToken = await user.getIdToken(true);
      
      
      const symptomData = {
        ...newSymptomData,
        symptom_date: newSymptomData.symptom_date || selectedDate
      };
      
      let updatedSymptoms;
      if (symptoms && symptoms.id) {
        await updateSymptoms(symptoms.id, symptomData, idToken);
        updatedSymptoms = { ...symptomData, id: symptoms.id};   
      } else {
        const result = await logSymptoms(symptomData, idToken);
        updatedSymptoms = { ...symptomData, id: result.id}; 
      }
      setSymptoms(updatedSymptoms);
      return { success: true, symptoms: updatedSymptoms };
    } catch (error) {
      console.error("Failed to update/create symptoms:", error);
      setError("Failed to update symptom information");
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

   const handleMoodUpdate = async (newMoodData) => {
      if (!user) return;
      try {
        setLoading(true);
        setError(null);
        const idToken = await user.getIdToken(true);

        const moodData = {
          ...newMoodData,
          mood_date: newMoodData.mood_date || selectedDate
        };

        let updatedMood;
        if (mood && mood.id) {
          await updateMood(mood.id, moodData, idToken);
          updatedMood = { ...moodData, id: mood.id}; 
        } else {
          const result = await logMood(moodData, idToken);
          updatedMood = { ...moodData, id: result.id}; 
          //navigation.navigate("Today")
        }
        setMood(updatedMood);
        //setRefreshTrigger(prev => prev + 1);
        return { success: true, mood: updatedMood };
      } catch (error) {
        setError("Failed to update mood info");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };


  const value = {
    symptoms,
    mood,
    selectedDate,
    setSelectedDate,
    error,
    loading,
    handleSymptomsUpdate,
    handleMoodUpdate
  };
  return (
    <EntriesContext.Provider value={value}>
      {children}
    </EntriesContext.Provider>
  );
};