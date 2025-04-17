import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const SelectableEntry = ({ isEditMode, onPress, icon, text, styles, styleSelector }) => {
  return (
    <TouchableOpacity disabled={!isEditMode} onPress={onPress}>
      {icon}
      <Text style={[styles.symptomText, styleSelector ? styles.textSelected : null]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectableEntry;
