import {View, Text, StyleSheet} from "react-native";

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hello Register!!</Text>
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


export default RegisterScreen;