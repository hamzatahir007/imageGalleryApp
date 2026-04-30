import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import COLORS from '../../consts/Colors';
import Feather from 'react-native-vector-icons/Feather';

const CustomeCircleButton = ({
  func,
  title,
  bgcolor,
  txtcolor,
  width,
  height,
  icon,
  size,
}) => {

  return (
    <TouchableOpacity
      style={{
        padding: 10,
        borderWidth: 1,
        backgroundColor: bgcolor ?? COLORS.white,
        borderRadius: 50,
      }}
      onPress={func}
    >
      {icon && (
        <Feather
          size={size}
          color={txtcolor ?? COLORS.black}
          name={'chevron-right'}
        />
      )}
      
    </TouchableOpacity>
  );
};

export default CustomeCircleButton;

const styles = StyleSheet.create({});
