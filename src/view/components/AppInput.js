import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  I18nManager,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../consts/Colors';

const AppInput = ({
  value,
  onChangeText,
  placeholder,
  leftIcon = null,
  isPassword = false,
  keyboardType = 'default',
  type = 'text',
  required = false,
  match = true,
  editable = true,
  multiline = false,
  margin = 15,
  height,
}) => {
  const [secure, setSecure] = useState(isPassword);
  const [error, setError] = useState('');

  const validate = text => {
    if (required && !text) {
      return 'This field is required';
    }
    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!emailRegex.test(text)) {
        return 'Invalid Email format (abc@abc.com)';
      }
    }

    if (type === 'cnic') {
      const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
      if (!cnicRegex.test(text)) {
        return 'Invalid CNIC format (xxxxx-xxxxxxx-x)';
      }
    }

    if (type === 'phone') {
      const phoneRegex = /^(?:\+92|0)?3[0-9]{2}[0-9]{7}$/;

      if (!phoneRegex.test(text)) {
        return 'Invalid Phone Number format (03000000000)';
      }
    }

    if (type === 'password') {
      if (text.length < 6) {
        return 'Password must be at least 6 characters';
      }
    }

    if (!match && type === 'password') {
      return 'Both passwords must match.';
    }

    return '';
  };

  const handleBlur = () => {
    const validationError = validate(value);
    setError(validationError);
  };

  const formatCNIC = text => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, '');

    // Limit to 13 digits
    const limited = cleaned.substring(0, 13);

    // Add dashes automatically
    if (limited.length <= 5) return limited;
    if (limited.length <= 12)
      return `${limited.slice(0, 5)}-${limited.slice(5)}`;

    return `${limited.slice(0, 5)}-${limited.slice(5, 12)}-${limited.slice(
      12,
    )}`;
  };

  return (
    <View style={{ marginBottom: margin == 0 ? margin : 15 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: COLORS.gray2,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 4,
          backgroundColor: !editable ? COLORS.light : COLORS.white,
          // marginBottom: 15,
        }}
      >
        {isPassword ? (
          <Ionicons name={leftIcon} size={20} color={COLORS.gray} />
        ) : leftIcon ? (
          <Feather name={leftIcon} size={20} color={COLORS.gray} />
        ) : null}
        <TextInput
          editable={editable}
          style={{
            flex: 1,
            marginHorizontal: 10,
            color: COLORS.black,
            height: height ? 100 : 'auto',
            textAlignVertical: 'top',
          }}
          multiline={multiline}
          value={value}
          onChangeText={text => {
            let formattedText = text;

            if (type === 'cnic') {
              formattedText = formatCNIC(text);
            }

            onChangeText(formattedText);

            if (error) setError('');
          }}
          onBlur={handleBlur}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          secureTextEntry={secure}
          keyboardType={keyboardType}
        />

        {isPassword && (
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Feather
              name={secure ? 'eye-off' : 'eye'}
              size={20}
              color={COLORS.gray}
            />
          </TouchableOpacity>
        )}
      </View>

      {error ? (
        <Text
          style={{
            color: 'red',
            fontSize: 12,
            marginTop: 0,
            marginLeft: 5,
          }}
        >
          {`${error}`}
        </Text>
      ) : null}
    </View>
  );
};

export default AppInput;
