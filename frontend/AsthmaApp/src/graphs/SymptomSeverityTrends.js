import { View, Text, Dimensions} from "react-native";
import { LineChart } from "react-native-chart-kit";


const transformForChartKit = (symptomsData) => {
  const allDates = [...new Set(symptomsData.map(entry =>
    new Date(entry.symptom_date).toISOString().split("T")[0]
  ))].sort();

  const severityLevels = [ "mild", "moderate", "severe"];

  const severityPresence = {
    mild: [],
    moderate: [],
    severe: []
  };

  allDates.forEach(date => {
    const entry = symptomsData.find(e =>
      new Date(e.symptom_date).toISOString().split("T")[0] === date
    );

    severityLevels.forEach(level => {
      const isPresent = entry?.symptoms_severity === level ? 1 : 0;
      severityPresence[level].push(isPresent);
    });
  });

  const datasets = severityLevels.map((level, i) => {
    const colors = ["#ff6384", "#36a2eb", "#ffce56"];
    return {
      data: severityPresence[level],
      color: () => colors[i % colors.length],
      strokeWidth: 2,
      withDots: true,
    };
  });

  return {
    labels: allDates,
    datasets,
    legend: severityLevels,
  };
  
}

const SymptomSeverityTrends = ({symptomsData}) => {
  if (!Array.isArray(symptomsData)) return <Text>No data</Text>;

  const chartData = transformForChartKit(symptomsData);
  console.log("chart data", chartData);
  const screenWidth = Dimensions.get("window").width;

  return (
    <View>
      <Text> Here is the severity trends</Text>
      <Text style={{ fontSize: 16, fontWeight: "bold", margin: 10 }}>
        Symptom Severity Presence Over Time
      </Text>
      <LineChart
        data={chartData}
        width={screenWidth - 20}
        height={300}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          //decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: () => "#333",
          propsForDots: { r: "5" },
        }}
        fromZero
        yAxisInterval={1}
        segments={1} 
        bezier
        style={{ borderRadius: 10 }}
      />
    </View>
  )
};

export default SymptomSeverityTrends;