import {View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation} from "@react-navigation/native";



const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome</Text>
      <Text style={styles.text}>Sign up or log in to your account</Text>
      <TouchableOpacity style={styles.register} onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.logView}>
        <Text style={styles.text}>Already have an account?</Text>
        <TouchableOpacity style={styles.log} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.logText}>Log</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#add8e6",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    color: "#808080", 
    fontSize: 24, 
    fontWeight: 800
  },
  text: {
    color: "#808080", 
    fontSize: 18, 
    fontWeight: 500
  }, 
  register: {
    margin: 20, 
    alignItems:"center", 
    backgroundColor: "#6495ED", 
    borderRadius: 20, 
    width: 200, 
    padding: 10
  }, 
  registerText: {
    color: "#ffffff", 
    fontSize: 16
  },
  log: {
    marginLeft: 5
  },
  logText: {
    color: "#6495ED",
    fontSize: 18,
    fontWeight: 800
  },
  logView: {
    flexDirection: "row"
  }
});

