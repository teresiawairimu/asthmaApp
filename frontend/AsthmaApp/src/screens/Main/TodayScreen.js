import React, {use, useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MoodScreen from "./MoodScreen";
import { symptomsSummary } from "../../services/symptomServices";
import { useAuth } from "../../context/AuthContext";
import CustomButton from "../../components/Common/CustomButton";
import AntDesign from '@expo/vector-icons/AntDesign';

const TodayScreen = () => {

  const [summaryData, setSummaryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
 


  const handleGenerateInsights = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      setError(null);
      const idToken = await user.getIdToken();
      console.log("idToken THIS IS THE INVALID", idToken);
      const summaryInfo = await symptomsSummary(idToken);
      console.log("summarydata", summaryInfo);
      setSummaryData(summaryInfo);
    } catch (error) {
      setError("Failed to load data");
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  }



  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.moodView}>
        <MoodScreen />
        </View>

      {summaryData ? (
        <View style={styles.insightView}>
          <Text style={styles.title}>
            Here's Today's Insight!
            <AntDesign name="star" size={24} color="gold" />

          </Text>
          <Text style={styles.insightText}>{summaryData.summary}</Text>
        </View> 
      ) : (
      <Text style={styles.noInsightText}>No insights yet. Tap the button below to generate one.</Text>
      )}
      <View style={{ margin: 10}}>
        <CustomButton title={summaryData ? "Refresh Insight" : "Generate Insight"} onPress={handleGenerateInsights}/>
      </View>
      </ScrollView>


    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    //paddingTop: 0
  },
  container: {
    //flex: 1,
    //padding: 10,
    margin: 10,
    color: "#F5F7FA"
  },
  insightView: {
    margin: 10,
    backgroundColor: "#fff8dc"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: "center"
  },
  insightText: {
    color: "#2D3748",
    fontSize: 16
  },
  noInsightText: {
    fontSize: 16,
    margin: 10,
    fontWeight: "bold"
  },
  moodView: {
    paddingBottom: 20
  },
});

export default TodayScreen;