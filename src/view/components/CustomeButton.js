import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import COLORS from '../../consts/Colors';

const CustomeButton = ({
  func,
  title,
  bgcolor,
  txtcolor,
  width,
  height,
  icon = null,
}) => {

  return (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: bgcolor ?? COLORS.white,
        borderRadius: 10,
        width: width ?? 'auto',
        height: height ?? 'auto',
        justifyContent: 'center',
        alignItems:'center',
        borderWidth: 1,
        borderColor: COLORS.main,
        flexDirection : icon ? 'row' : 'column'
      }}
      onPress={func}
    >
      {icon && <View style={{
        paddingRight:10,
      }}>{icon}</View>}
      <Text
        style={{
          color: txtcolor ?? 'Black',
          textAlign: 'center',
          textAlignVertical: 'center',
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomeButton;

const styles = StyleSheet.create({});
