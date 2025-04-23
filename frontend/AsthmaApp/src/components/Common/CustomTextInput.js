import React from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";


const CustomTextInput = ({value, onChangeText, onBlur, error, isSecure, placeholder}) => {
  
  return (
    <View>
      <TextInput 
        style={styles.input}
        onChangeText = {onChangeText}
        onBlur={onBlur}
        value={value}
        secureTextEntry={isSecure}
        placeholder={placeholder}
      />
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
  errorText: {
    color: "#ff0000",
    fontSize: 14,
  }
});

