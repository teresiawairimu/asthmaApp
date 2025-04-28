import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver} from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import {View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomTextInput from "../Common/CustomTextInput";
import CustomButton from "../Common/CustomButton";



const schema = yup.object({
  username: yup.string()
    .required("Username is required"),
  email: yup.string()
    .email("Invalid email format")
    .required("Email is required")
}).required();

const ProfileForm = ({ initialData, onSubmit, onDelete}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState("");


  const { control, handleSubmit, formState: { errors}, reset} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: ""
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        username: initialData.display_name || "",
        email: initialData.email || "",
      });
    }
  }, [initialData, reset]);

  const processForm = async (data) => {
    try {
      onSubmit({
        display_name: data.username,
        email: data.email,
        //updated_at: new Date().toISOString().split("T")[0]
      });
      setIsEditMode(false);
      setError("");
    } catch(error) {
      console.error(error);
      setError("Failed to update profile. Please try again");
    }
  }

  return (
    <View style={[
      styles.formContainer,
      isEditMode ? styles.editModeContainer : styles.viewModeContainer
    ]}>
      <View style={styles.username}>
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
              editable={isEditMode}
            />
          )} 
        />
      </View>

      {!isEditMode && (
        <View style={styles.email}>
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
                editable={false}
              />
            )} 
          />
        </View>
      )}
     

      <View style={styles.buttonContainer}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {isEditMode ? (
          <>
        <View style={{ padding: 10}}>
          <CustomButton 
            title="Save"
            onPress={handleSubmit(processForm)}
          />
        </View>
        <View style={{ padding: 10}}>
          <CustomButton
            title="Cancel"
            onPress={() => {
              setIsEditMode(false);
              reset({
                username: initialData.display_name || "",
                email: initialData.email || ""
              });
            }}
          />
        </View>
        </>
        ) : (
          <CustomButton
          title="Edit Profile"
          onPress={() => setIsEditMode(true)}
          />
        )}

        <View>
          <TouchableOpacity
            onPress={onDelete} 
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1
  },
  viewModeContainer: {
    backgroundColor: "#f5f5f5",
    borderColor: "#4b88c2"
  },
  editModeContainer: {
    backgroundColor: "#fffbee",
    borderColor: "#ffd161",
    borderWidth: 2
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
  },
  email: {
    margin: 10
  },
  username: {
    margin: 10
  },
  buttonContainer: {
    marginTop: 15
  },
  button: {
    marginVertical: 5
  },
  deleteButton: {
    backgroundColor: "#ff0000", 
    alignSelf: "center", 
    padding: 10, 
    margin: 10
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 400
  }
  
});

export default ProfileForm;