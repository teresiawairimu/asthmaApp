import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import ProfileScreen from "./ProfileScreen";


const Stack = createNativeStackNavigator();

const ProfileStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{
          title: "Profile",
       
        }}
      />
    </Stack.Navigator>
  )
}

export default ProfileStack;