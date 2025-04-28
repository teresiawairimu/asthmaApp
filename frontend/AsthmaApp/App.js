import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import LoginScreen from "./src/screens/Auth/LoginScreen";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { EntriesProvider } from "./src/context/EntriesContext";
import DashboardStack from "./src/screens/Main/DashboardStack";
import ConsentScreen from "./src/screens/Main/ConsentScreen";


const Stack = createNativeStackNavigator();

const InnerApp = () => {
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
                  title: "AsthmaTrack",
                  headerTitleStyle: {
                    color: "#2C3E50",
                    fontWeight: "bold",
                    fontSize: 20
                  }
                }}
              />
              <Stack.Screen 
                name="Register" 
                component={RegisterScreen}
                options={{
                  title: "AsthmaTrack",
                  headerTitleStyle: {
                    color: "#2C3E50",
                    fontWeight: "bold",
                    fontSize: 20
                  }
                }} 
              />
              <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                options={{
                  title: "AsthmaTrack",
                  headerTitleStyle: {
                    color: "#2C3E50",
                    fontWeight: "bold",
                    fontSize: 20
                  }
                }} 
              />
            </>
            ) : (
              <>
              <Stack.Screen
                name="Consent"
                component={ConsentScreen}
                options={{ 
                  title: "Consent Form",
                  headerBackVisible: false,
                  gestureEnabled: false, 
                }}
              />
              <Stack.Screen 
                name="Dashboard" 
                component={DashboardStack}
                options={{
                  //title: getCurrentDate(),
                 headerShown: false
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <EntriesProvider>
        <InnerApp />
      </EntriesProvider>
    </AuthProvider>
  );
};

export default App;


