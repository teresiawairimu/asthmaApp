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
        <Text>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default CustomTextInput;