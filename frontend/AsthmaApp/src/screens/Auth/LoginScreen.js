import React, {useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import LoginForm from "../../components/Forms/LoginForm";
import { auth, signInWithEmailAndPassword } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async (formData) => {
    setError(null);
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      navigation.navigate({
        index: 0,
        routes: [{name : "Dashboard"}],
      });
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";

      if (error.code === "auth/invalid-email") {
        errorMessage = " Please enter a valid email."
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password must be at least 8 characters."
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error"     
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <LoginForm onSubmit={handleLogin} error={error} isLoading={isLoading}/>
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

export default LoginScreen;