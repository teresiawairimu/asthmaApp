import React, { useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { symptomsSummary } from "../../services/symptomServices";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from "../../context/AuthContext";

const CurrentInsightsDisplay = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
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
    <View style={styles.insightContainer}>
      {summaryData ? (
        <View>
          <Text style={styles.insightTitle}>
            Here's Today's Insight!
            <AntDesign name="star" size={24} color="gold" />
          </Text>
          <Text style={styles.insightText}>
            {showMore || summaryData.summary.length <= 100
              ? summaryData.summary
              : `${summaryData.summary.slice(0, 100)}...`}
          </Text>
          {summaryData.summary.length > 100 && (
            <TouchableOpacity onPress={() => setShowMore(!showMore)}>
              <Text style={styles.readMoreText}>
                {showMore ? "Read less" : "Read more"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <Text style={styles.noInsightText}>No insights yet. Tap the button below to generate one.</Text>
      )}
      <View >
        <TouchableOpacity style={styles.insightButton} onPress={handleGenerateInsights}>
          <Text style={styles.insightButtonText}>{summaryData ? "Refresh Insight" : "Generate Insight"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CurrentInsightsDisplay;

const styles = StyleSheet.create({
  insightContainer: {
    backgroundColor: "#fffaf0", 
    marginTop: 30, 
    borderRadius: 30, 
    padding: 20
  },
  insightTitle: {
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
  readMoreText: {
    color: 'blue',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  insightButton: {
    alignItems: "center", 
    backgroundColor: "#87cefa", 
    marginTop: 30, 
    padding: 10, 
    borderRadius: 10
  },
  insightButtonText: {
    color: "#ffffff", 
    fontSize: 20, 
    fontWeight: "bold"
  } 
});