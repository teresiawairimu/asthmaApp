import React, {useState} from "react";
import {View, StyleSheet} from "react-native";
import LoginForm from "../../components/Forms/LoginForm";
import { auth, signInWithEmailAndPassword } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { retrieveConsent } from "../../services/consentServices";

const LoginScreen = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { user } = useAuth();

  const handleLogin = async (formData) => {
    setError(null);
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const idToken = await user.getIdToken();
      const consentData = await retrieveConsent(idToken);
      console.log("consentData", consentData);
      if (!consentData?.signed) {
        navigation.navigate("Consent");
      } else {
        navigation.navigate({
          index: 0,
          routes: [{name : "Dashboard"}],
        });
      }
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
    <SafeAreaView style={styles.safeAreaStyle}>
      <View style={styles.container}>
        <LoginForm onSubmit={handleLogin} error={error} isLoading={isLoading}/>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: 'red',
    backgroundColor: "#d3d3d3",
    alignItems: "center",
    justifyContent: "center",
  },
 
});

