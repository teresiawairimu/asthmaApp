import React from "react";
import { View, Text} from "react-native";
import { CartesianChart } from "victory-native";

const SymptomTrends = ({statsData}) => {
  return (
    <View>
      <Text>Welcome to symptom trends</Text>
      <Text> {statsData.symptoms}</Text>
      <Text>{statsData.symptom_date}</Text>

    </View>
  )
};

export default SymptomTrends;