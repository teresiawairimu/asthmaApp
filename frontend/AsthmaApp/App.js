import { Alert, TouchableOpacity} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import LoginScreen from "./src/screens/Auth/LoginScreen";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import Icon from "react-native-vector-icons/FontAwesome6";
import { getAuth, signOut} from "firebase/auth";
import DashboardStack from "./src/screens/Main/DashboardStack"

const Stack = createNativeStackNavigator();

const App = () => {
  const { user } = useAuth();

  return (
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
  );
}

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};


