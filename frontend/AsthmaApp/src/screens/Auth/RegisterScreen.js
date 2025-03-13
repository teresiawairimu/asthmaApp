import { useState } from "react";
import {View, Text, StyleSheet} from "react-native";
import RegisterForm from "../../components/Forms/RegisterForm";
import { auth, createUserWithEmailAndPassword } from "../../firebaseConfig";
import { registerUser } from "../../services/userServices";

const RegisterScreen = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (formData) => {
    setError(null);
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      await registerUser({
        display_name : formData.username,
        email: formData.email,
        consent_signed: false
      }, idToken);

    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use."
      } else if (error.code === "auth/invalid-email") {
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
      <RegisterForm onSubmit={handleRegister} error={error} isLoading={isLoading} />
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