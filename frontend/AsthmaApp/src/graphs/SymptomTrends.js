import React from "react";
import { View, Text, Dimensions} from "react-native";
import { LineChart } from "react-native-chart-kit";

const transformForChartKit = (symptomsData) => {
  const allDates = [...new Set(symptomsData.map(d =>
    new Date(d.symptom_date).toISOString().split("T")[0]
  ))];

  const symptomSet = new Set();
  symptomsData.forEach(entry => entry.symptoms?.forEach(symptom => symptomSet.add(symptom)));
  const uniqueSymptoms = [...symptomSet];

  const datasets = uniqueSymptoms.map((symptom, index) => {
    const data = allDates.map(date => {
      const found = symptomsData.find(entry =>
        new Date(entry.symptom_date).toISOString().split("T")[0] === date &&
        entry.symptoms?.includes(symptom)
      );
      return found ? 1 : 0;
    });

    const colors = ["red", "blue", "green", "orange", "purple", "teal", "brown", "pink"];
    return {
      data,
      color: () => colors[index % colors.length],
      strokeWidth: 2,
      withDots: true,
    };
  });

  return {
    labels: allDates,
    datasets,
    legend: uniqueSymptoms,
  };
}

const SymptomTrends = ({symptomsData}) => {
  if (!symptomsData || !Array.isArray(symptomsData)) {
    return <Text>No data yet</Text>;
  }

  const chartData = transformForChartKit(symptomsData);
  const screenWidth = Dimensions.get("window").width;

  return (
    <View>
      <Text style={{ fontSize: 16, fontWeight: "bold", margin: 10 }}>
        Symptom Presence Line Chart
      </Text>
      <LineChart
        data={chartData}
        width={screenWidth - 20}
        height={300}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: () => "#333",
          propsForDots: {
            r: "3",
          },
        }}
        fromZero
        segments={1} 
        bezier
        style={{ marginVertical: 8, borderRadius: 10 }}
      />
    </View>
  )
};


export default SymptomTrends;