import {View, Text, StyleSheet } from "react-native";
import { useNavigation} from "@react-navigation/native";
import { Button } from "@react-navigation/elements";


const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Hello World!!</Text>
      <Button onPress={() => navigation.navigate("Register")}>
        Go to Register
      </Button>
      <Button onPressIn={() => navigation.navigate("Login")}>
        Go to Logins
      </Button>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;