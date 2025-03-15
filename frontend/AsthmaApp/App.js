import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import LoginScreen from "./src/screens/Auth/LoginScreen";
import DashboardScreen from "./src/screens/Main/DashboardScreen";
import { AuthProvider, useAuth } from "./src/context/AuthContext";

const Stack = createNativeStackNavigator();


const getCurrentDate = () => {
  const today = new Date();
  return today.toDateString();
};

const App = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName={ user ? "Dashboard": "Home"}
      screenOptions={{
        headerTitleAlign: "center",   
      }}
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
            component={DashboardScreen}
            options={{
              title: getCurrentDate(),
            }}
            />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};


