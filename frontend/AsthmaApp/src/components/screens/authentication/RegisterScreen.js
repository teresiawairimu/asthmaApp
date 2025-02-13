import {View, Text} from "react-native";

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <TextInput />
      <TextInput />
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