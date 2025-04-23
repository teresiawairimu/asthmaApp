import * as React from "react";
import * as yup from "yup";
import { yupResolver} from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation} from "@react-navigation/native";
import CustomTextInput from "../Common/CustomTextInput";
import CustomButton from "../Common/CustomButton";


const schema = yup.object({
  username: yup.string()
    .required("Username is required"),
  email: yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], "Passwords must match")
    .required("Confirm Password is required")
}).required();

const RegisterForm = ({ onSubmit, error, isLoading }) => {

  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors}} = useForm({
    resolver: yupResolver(schema)
  });

  const processForm = (data) => {
    onSubmit(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.registerHeading}>Sign Up</Text>
      <View>
        <View style={styles.textInputView}>
          <Controller
            control={control}
            name="username"
            render={({field: {onChange, onBlur, value }}) => (
              <CustomTextInput
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholder="Username"
                error={errors.username?.message}
              />
            )}
          />
        </View>
        <View style={styles.textInputView}>
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, onBlur, value}}) => (
              <CustomTextInput
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholder="Email"
                error={errors.email?.message}
              />
            )}
          />
        </View>
        <View style={styles.textInputView}>
          <Controller
            control={control}
            name="password"
            render={({field: {onChange, onBlur, value}}) => (
              <CustomTextInput
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholder="Password"
                isSecure={true}
                error={errors.password?.message}
              />
            )}
          />
        </View>
        <View style={styles.textInputView}>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholder="Confirm Password"
                isSecure={true}
                error={errors.confirmPassword?.message}
              />
            )}
          />
        </View>
      </View>

      <View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <CustomButton 
          title={isLoading ? "Registering..." : "Register"}
          onPress={handleSubmit(processForm)}
          disabled={isLoading}
        />
      </View>
      <View style={styles.loginView}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        > 
          <Text style={styles.loginLinkText}>Log</Text>
        </TouchableOpacity>
      </View>
    </View>  
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 30
  },
  registerHeading: {
    alignSelf: "center", 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20
  },
  textInputView: {
    marginBottom: 20
  },
  loginView: {
    flexDirection:"row", 
    marginTop: 20
  },
  loginText: {
    fontSize: 16, 
    fontWeight: 500
  },
  loginLink: {
    marginLeft: 5
  },
  loginLinkText: {
    color: "#4169e1", 
    fontSize: 16, 
    fontWeight: 500
  },
  errorText: {
    color: "#ff0000",
    fontSize: 14,
  }
});


