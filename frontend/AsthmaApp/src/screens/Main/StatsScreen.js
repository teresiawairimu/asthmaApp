import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import { symptomsStats } from "../../services/symptomServices"; 
import SymptomTrends from "../../components/graphs/SymptomTrends";
import SymptomSeverityTrends from "../../components/graphs/SymptomSeverityTrends";
import CorrelationInsightsDisplay from "../../components/DisplayTracker/CorrelationInsightsDisplay";
import { useAuth } from "../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const StatsScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const { user } = useAuth();
  
  
  useEffect(() => {
    const fetchStatsData = async () => {
      if (!user) return;
      try {
        setIsLoading(true);
        setError(null);
        const idToken = await user.getIdToken();
        console.log("idToken THIS IS THE INVALID", idToken);
        const statsInfo = await symptomsStats(idToken);
        console.log("statsInfo is here", statsInfo);
        setStatsData(statsInfo);
      } catch (error) {
        setError("Failed to load data");
        console.error(error)
      } finally {
        setIsLoading(false);
      }
    }
      fetchStatsData();
    }, [user]);

    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>{error}</Text>
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <ScrollView>
    <Text>Welcome to Stats Screen</Text>
    <SymptomTrends 
      symptomsData={statsData}
    />
    <SymptomSeverityTrends
      symptomsData={statsData}
    />

    <View>
      <CorrelationInsightsDisplay />
    </View>
    </ScrollView>
  
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1
  }
})

export default StatsScreen;