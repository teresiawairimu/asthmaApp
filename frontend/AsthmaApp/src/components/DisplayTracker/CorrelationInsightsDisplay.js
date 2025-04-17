import React, { useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { correlationInsights } from "../../services/correlationServices";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from "../../context/AuthContext";


const CorrelationInsightsDisplay =() => {
  const [insightsData, setInsightsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();


  const handleGenerateCorrelationInsights = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      setError(null);
      const idToken = await user.getIdToken();
      console.log("idToken THIS IS THE INVALID", idToken);
      const insightsInfo = await correlationInsights(idToken);
      console.log("insightsdata", insightsInfo);
      setInsightsData(insightsInfo);
    } catch (error) {
      setError("Failed to load data");
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleGenerateCorrelationInsights();
  }, [user])
  
  if (isLoading) return <Text style={styles.loadingStyle}>Loading...</Text>
  if (error) return <Text>{error}</Text>
  return (
    <View style={styles.correlationContainer}>
      {insightsData ? (
        <View>
          <Text style={styles.correlationTitle}>
           Monthly Correlation Insight!
            <AntDesign name="star" size={24} color="gold" />
          </Text>
          <Text style={styles.correlationText}>
            {showMore || insightsData.correlation.length <= 100
              ? insightsData.correlation
              : `${insightsData.correlation.slice(0, 100)}...`}
          </Text>
          {insightsData.correlation.length > 100 && (
            <TouchableOpacity onPress={() => setShowMore(!showMore)}>
              <Text style={styles.readMoreText}>
                {showMore ? "Read less" : "Read more"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <Text style={styles.noCorrelationInsightText}>No Correlation insights yet. Tap the button below to generate one.</Text>
      )}
      <View>
        <TouchableOpacity style={styles.correlationButton} onPress={handleGenerateCorrelationInsights}>
          <Text style={styles.correlationButtonText}>
           Refresh Insight
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CorrelationInsightsDisplay;

const styles = StyleSheet.create({
  correlationContainer: {
    backgroundColor: "#fffafa", 
    marginTop: 30, 
    borderRadius: 30, 
    padding: 20
  },
  correlationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: "center"
  },
  correlationText: {
    color: "#2D3748",
    fontSize: 16
  },
  noCorrelationInsightText: {
    fontSize: 16,
    margin: 10,
    fontWeight: "bold"
  },
  readMoreText: {
    color: 'blue',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  correlationButton: {
    alignItems: "center", 
    backgroundColor: "#87cefa", 
    marginTop: 30, 
    padding: 10, 
    borderRadius: 10
  },
  correlationButtonText: {
    color: "#ffffff", 
    fontSize: 20, 
    fontWeight: "bold"
  },
  loadingStyle: {
    padding: 10,
    fontSize: 16,
    fontWeight: 300
  }
});