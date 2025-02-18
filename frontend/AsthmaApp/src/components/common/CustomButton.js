import React from "react";
import { Alert, Button, StyleSheet, View } from "react-native";

const CustomButton = ({title, onPress}) => {
  return (
    <View>
      <Button 
        title={title}
        /*color="#f1194ff"*/
        onPress={onPress}
      />
    </View>
  );
};

export default CustomButton;