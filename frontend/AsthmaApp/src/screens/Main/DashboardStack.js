import { createNativeStackNavigator} from "@react-navigation/native-stack";
import DashboardTabs from "./DashboardTabs";
import Icon from "react-native-vector-icons/FontAwesome6";
import {getAuth, signOut} from "firebase/auth";
import {Alert, TouchableOpacity} from "react-native";
import { useAuth } from "../../context/AuthContext";
import EntryScreen from "./EntryScreen";
import SymptomsScreen from "./SymptomsScreen";
import MoodScreen from "./MoodScreen";

const Stack = createNativeStackNavigator();

const getCurrentDate = () => {
  const today = new Date();
  return today.toDateString();
};

const DashboardStack = () => {
  const { setUser} = useAuth();
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="DashboardTabs" 
        component={DashboardTabs}
        options={{
          title: getCurrentDate(),
          headerTitleAlign: "center", 
          headerRight: () => (
            <TouchableOpacity onPress={ async () => {
              const confirm = await new Promise((resolve) => {
                Alert.alert("Sign Out", "Do you want to sign out?", [
                  {text: "Cancel", style: "cancel", onPress: () => resolve(false)},
                  {text: "Sign Out", onPress: () => resolve(true)}
                ]);
              });
              if (confirm) {
                try {
                  const auth = getAuth();
                  await signOut(auth);
                  setUser(null);
                } catch (error) {
                  console.error("Sign-out error:", error);
                }
              }
            }}>
              <Icon name="right-from-bracket" size={24} color="black" />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen
        name="Entries"
        component={EntryScreen}
        options={{ title: "Multiple Entries"}}
      />
       <Stack.Screen
        name="Mood"
        component={MoodScreen}
        options={{ title: "Mood Entry"}}
      />
    
    </Stack.Navigator>
  )
}

export default DashboardStack;