import React from "react";
import { View, Text, Dimensions, ScrollView} from "react-native";
import { LineChart } from "react-native-chart-kit";

const transformForChartKit = (symptomsData) => {
  const allDates = [...new Set(symptomsData.map(d =>
    new Date(d.symptom_date).toISOString().split("T")[0]
  ))].sort((a, b) => new Date(a) - new Date(b));


  const formattedDates = allDates.map(date => {
    const d = new Date(date);
    return `${d.getMonth()+1}/${d.getDate()}`;
  });


  const symptomSet = new Set();
  symptomsData.forEach(entry => entry.symptoms?.forEach(symptom => symptomSet.add(symptom)));
  const uniqueSymptoms = [...symptomSet];

  
  const symptomColors = {
    "cough": "red",
    "wheezing": "blue",
    "chest_tightness": "green",
    "shortness_of_breath": "orange",
    "fatigue": "yellow",
    "trouble_sleeping": "teal",
    "difficulty_speaking": "brown"
  };


  const datasets = uniqueSymptoms.map((symptom) => {
    const data = allDates.map(date => {
      const found = symptomsData.find(entry =>
        new Date(entry.symptom_date).toISOString().split("T")[0] === date &&
        entry.symptoms?.includes(symptom)
      );
      return found ? 1 : 0;
    });

    return {
      data,
      color: () => symptomColors[symptom] || "#" + Math.floor(Math.random()*16777215).toString(16),
      strokeWidth: 2,
      withDots: true,
    };
  });

  return {
    labels: formattedDates,
    datasets,
    legend: uniqueSymptoms,
  };
};

const SymptomTrends = ({symptomsData}) => {
  if (!symptomsData || !Array.isArray(symptomsData)) {
    return <Text>No data yet</Text>;
  }

  const chartData = transformForChartKit(symptomsData);
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
        {chartData.legend.map((symptom, index) => {
          const color = chartData.datasets[index].color();
          const displayName = symptom.replace(/_/g, ' '); 
          
          return (
            <View key={symptom} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 }}>
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
      <Text style={{ fontSize: 16, fontWeight: "bold", margin: 10 }}>
        Symptom Presence Line Chart
      </Text>
      
      {renderLegend()}
      
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <LineChart

          data={{
            labels: visibleLabels,
            datasets: chartData.datasets,
          }}
          formatYLabel={(value) => value === "1" ? "Present" : "No"}
          width={Math.max(screenWidth - 20, chartData.labels.length * 50)} 
          height={300}
          
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: () => "#333",
            propsForDots: {
              r: "5",
              strokeWidth: "1",
            },
            propsForLabels: {
              fontSize: 10,
              rotation: -45,
            },
            formatYLabel: (value) => value === "1" ? "Present" : "No",
          }}
          fromZero
          yAxisInterval={1}
          segments={1}
          //yAxisSuffix=""
          //yAxisLabel=""
          //yAxisLabel="Present"
          withVerticalLabels={true}
          verticalLabelRotation={0}
          withInnerLines={false}
          withOuterLines={true}
          style={{ marginVertical: 8, borderRadius: 10 }}
        />
      </ScrollView>
    </View>
  );
};

export default SymptomTrends;

