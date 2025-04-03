import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import LoginScreen from "./src/screens/Auth/LoginScreen";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { EntriesProvider } from "./src/context/EntriesContext";
import DashboardStack from "./src/screens/Main/DashboardStack"


const Stack = createNativeStackNavigator();

const App = () => {
  const { user } = useAuth();


  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName={ user ? "Dashboard": "Home"}
        >
          { !user ? (
            <>
              <Stack.Screen 
                name="Home" 
                component={HomeScreen}
                options={{
                  title: "AsthmaTrack"
                }}
              />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
            </>
            ) : (
              <Stack.Screen 
                name="Dashboard" 
                component={DashboardStack}
                options={{
                  //title: getCurrentDate(),
                 headerShown: false
                }}
              />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default () => {
  return (
    <AuthProvider>
      <EntriesProvider>
        <App />
      </EntriesProvider>
    </AuthProvider>
  );
};


