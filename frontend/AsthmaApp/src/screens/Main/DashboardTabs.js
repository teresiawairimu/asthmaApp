import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TodayScreen from "./TodayScreen";
import StatsScreen from "./StatsScreen";
import CalendarScreen from "./CalendarScreen";
import ProfileScreen from "./ProfileScreen";
import ProfileStack from "./ProfileStack";
import SymptomsScreen from "./SymptomsScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { signOut } from "../../firebaseConfig";
import { Touchable, TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();


const DashboardTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        animation: "fade",
        tabBarActiveTintColor: "#4A90E2",
        tabBarInactiveTintColor: "#2C3E50",
        tabBarLabelPosition: "below-icon",
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}
    >
      <Tab.Screen 
      name="Today" 
      component={TodayScreen}
      options={{
     
        tabBarIcon: ({color}) => (
          <Icon 
            name="notebook-outline"
            color={color}
            size={30}
          />
        )
      }}
      />
      <Tab.Screen 
        name="Stats" 
        component={StatsScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              name="chart-line"
              color={color}
              size={30}
            />
          )
        }}
      />
       <Tab.Screen 
        name="Entries" 
        component={SymptomsScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              name="plus-circle"
              color={color}
              size={30}
            />
          )
        }}
      />
      <Tab.Screen 
        name="Calendar" 
        component={CalendarScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              name="calendar-month-outline"
              color={color}
              size={30}
            />
          )
        }}
      />
      <Tab.Screen 
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              name="account-circle-outline"
              color={color}
              size={30}
            />
          )
        }}
      />  
    </Tab.Navigator>
  );
}

export default DashboardTabs;