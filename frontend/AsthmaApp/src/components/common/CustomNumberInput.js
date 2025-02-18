import React from "react";
import {StyleSheet, TextInput, View} from "react-native";

const CustomNumberInput = () => {
  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />

    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
});

export default CustomNumberInput;