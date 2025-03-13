import * as React from "react";
import * as yup from "yup";
import { yupResolver} from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import {View, Text, StyleSheet} from "react-native";
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
    .required("Password is required")
}).required();

const RegisterForm = ({ onSubmit, error, isLoading }) => {
  const { control, handleSubmit, formState: { errors}} = useForm({
    resolver: yupResolver(schema)
  });

  const processForm = (data) => {
    onSubmit(data);
  };

  return (
    <View>
      <Text>Username</Text>
      <Controller
        control={control}
        name="username"
        render={({field: {onChange, onBlur, value }}) => (
          <CustomTextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder="Enter your username"
            error={errors.username?.message}
          />
        )}
        
      />
      <Text>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <CustomTextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder="Enter your email"
            error={errors.email?.message}
          />
        )}
        
      />
      <Text>Password</Text>
      <Controller
        control={control}
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <CustomTextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder="Enter your password"
            isSecure={true}
            error={errors.password?.message}
          />
        )}
      />

      <View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <CustomButton 
          title={isLoading ? "Registering..." : "Register"}
          onPress={handleSubmit(processForm)}
          disabled={isLoading}
        />
      </View>
    </View>  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  }
});

export default RegisterForm;
