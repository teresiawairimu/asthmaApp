import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, Image} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { symptomsSeverityAnalysis } from "../../services/analysisServices";

const SymptomsSeverityTrend = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const { user } = useAuth();
    
    
  useEffect(() => {
    const fetchSeverityData = async () => {
      if (!user) return;
        try {
          setIsLoading(true);
          setError(null);
          const idToken = await user.getIdToken();
          console.log("idToken THIS IS THE INVALID", idToken);
          const severityInfo = await symptomsSeverityAnalysis(idToken);
          console.log("severityInfo is here", severityInfo);
          if (severityInfo?.image) {
            setImageUri(`data:image/png;base64,${severityInfo.image}`);
          }
        } catch (error) {
          setError("Failed to load data");
          console.error(error)
        } finally {
          setIsLoading(false);
        }
    }
      fetchSeverityData();
  }, [user]);
  
  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>{error}</Text>
  return(
    <View>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
      )}
    </View>
  );
}

export default SymptomsSeverityTrend;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
})
