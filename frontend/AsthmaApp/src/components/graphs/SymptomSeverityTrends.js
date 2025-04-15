import { View, Text, Dimensions, ScrollView} from "react-native";
import { LineChart } from "react-native-chart-kit";


const transformForChartKit = (symptomsData) => {
  const allDates = [...new Set(symptomsData.map(entry =>
    new Date(entry.symptom_date).toISOString().split("T")[0]
  ))].sort((a, b) => new Date(a) - new Date(b));



  const formattedDates = allDates.map(date => {
    const d = new Date(date);
    return `${d.getMonth()+1}/${d.getDate()}`;
  });


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
    labels: formattedDates,
    datasets,
    legend: severityLevels,
  };
  
}

const SymptomSeverityTrends = ({symptomsData}) => {
  if (!Array.isArray(symptomsData)) return <Text>No data</Text>;

  const chartData = transformForChartKit(symptomsData);
  console.log("chart data", chartData);
  const screenWidth = Dimensions.get("window").width;

  const labelCount = chartData.labels.length;
  const maxDisplayLabels = 6; 
  const skipFactor = Math.max(1, Math.ceil(labelCount / maxDisplayLabels));
  
  
  const visibleLabels = chartData.labels.map((label, i) => 
    i % skipFactor === 0 ? label : ""
  );

 
  const renderLegend = () => {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingVertical: 10 }}>
        {chartData.legend.map((severityLevels, index) => {
          const color = chartData.datasets[index].color();
          const displayName = severityLevels.replace(/_/g, ' '); 
          
          return (
            <View key={severityLevels} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 }}>
              <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: color, marginRight: 4 }} />
              <Text>{displayName}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View>
      <Text> Here is the severity trends</Text>
      <Text style={{ fontSize: 16, fontWeight: "bold", margin: 10 }}>
        Symptom Severity Presence Over Time
      </Text>
      {renderLegend()}
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
      <LineChart
        data={{
          labels: visibleLabels,
          datasets: chartData.datasets,
        }}
        //formatYLabel={(value) => value === "1" ? "Present" : "No"}
        width={Math.max(screenWidth - 20, chartData.labels.length * 50)}
        height={300}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: () => "#333",
          propsForDots: { 
            r: "5"
          },
          propsForLabels: {
            fontSize: 10,
            rotation: -45,
          },
          //formatYLabel: (value) => { 
            //return value === "1" || value === "1.0" ? "Present" : "No";
          //}
          
        }}
        fromZero={true}
        yAxisInterval={1}
        segments={2}
        yLabelsOffset={5}
        formatYLabel={(value) => {
          // Round to nearest integer to handle floating point comparison issues
          const numValue = Math.round(parseFloat(value));
          if (numValue === 1) return "Present";
          if (numValue === 0) return "Not Present";
          return "";
        }}
        //formatYLabel={(value) => {
          // Convert to number first to handle any string format
          //const numValue = parseFloat(value);
          //if (numValue === 1) return "Present";
          //if (numValue === 0) return "No";
          //return "";
        //}}
        //formatYLabel={(value) => {
          //if (value === "1") return "Yes";
          //if (value === "0") return "No";
          //return "";
        //}}
        //formatYLabel={(value) => {
          //if (value.trim().startsWith("1")) return "Yes";
          //if (value.trim().startsWith("0")) return "No";
          //return "";
        //}}
        //formatYLabel={(value) => {
          //if (value === "1" || value === "1.0" || value === "1.00") return "Yes";
          //if (value === "0" || value === "0.0" || value === "0.00") return "No";
          //return "";
        //}}
        
        //yAxisLabel="Present"
        withVerticalLabels={true}
        verticalLabelRotation={0}
        bezier
        style={{ borderRadius: 10 }}
      />
      </ScrollView>
    </View>
  )
};

export default SymptomSeverityTrends;