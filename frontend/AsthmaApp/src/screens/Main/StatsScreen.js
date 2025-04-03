import React from "react";
import { View, Text} from "react-native";
import { symptomsStats } from "../../services/symptomServices";
import SymptomTrends from "../../graphs/symptomTrends";

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
        console.log("statsInfo", statsInfo);
        setStatsData(userInfo);
      } catch (error) {
        setError("Failed to load data");
        console.error(error)
      } finally {
        setIsLoading(false);
      }
    }
      fetchStatsData();
    }, [user]);
  return (
    <View>
    <Text>Welcome to Stats Screen</Text>
    <SymptomTrends 
      symptomData={statsData}
    />
    </View>

  );
};

export default StatsScreen;