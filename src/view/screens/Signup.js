// src/view/screens/Signup.js
import React, { useState } from 'react';
import {
  Image,
  Text,
  Pressable,
  TouchableOpacity,
  View,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import AppInput from '../components/AppInput.js';
import styles from '../styles/index.js';
import COLORS from '../../consts/Colors.js';
import { REGISTER_USER } from '../../graphql/queries.js';
import { login } from '../../consts/redux/reducers/Reducers.js';

const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const validatePhone = phone => /^\d{10}$/.test(phone.trim());

const validatePassword = pwd => pwd.length >= 6;

const Signup = ({ navigation }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const [registerUser, { loading }] = useMutation(REGISTER_USER);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!validateEmail(email)) newErrors.email = 'Enter a valid email address';
    if (!validatePhone(phone))
      newErrors.phone = 'Phone must be exactly 10 digits';
    if (!validatePassword(password))
      newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;

    try {
      console.log('Mutation:', registerUser);
      const { data } = await registerUser({
        variables: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          password,
        },
      });

      const user = data?.insert_users_one;
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        dispatch(login(user));
        navigation.replace('Main');
      }
    } catch (err) {
      console.log(err);

      ToastAndroid.show(
        err.message.includes('Uniqueness')
          ? 'Email already registered'
          : 'Registration failed. Try again.',
        ToastAndroid.LONG,
      );
    }
  };

  const Field = ({ label, ...props }) => (
    <View style={{ marginBottom: 6 }}>
      <Text style={{ fontSize: 14, color: COLORS.black, paddingBottom: 4 }}>
        {label}
      </Text>
      <AppInput {...props} />
      {props.error ? (
        <Text style={{ color: COLORS.red, fontSize: 12, marginTop: 2 }}>
          {props.error}
        </Text>
      ) : null}
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <Image
            style={{ width: 200, height: 200 }}
            source={require('../../assets/icons/Login.jpg')}
          />

          <ScrollView style={styles.form}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 30,
                fontFamily: 'Poppins-SemiBold',
                color: '#000',
                marginBottom: 20,
              }}
            >
              Create an account
            </Text>

            <View
              style={{
                paddingTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.black,
                  paddingBottom: 5,
                }}
              >
                Name
              </Text>

              <AppInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                leftIcon="user"
                keyboardType="text"
                type="text"
                required={true}
              />
              {errors.name ? (
                <Text style={{ color: COLORS.red, fontSize: 12, marginTop: 2 }}>
                  {errors.name}
                </Text>
              ) : null}
            </View>

            <View
              style={{
                paddingTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.black,
                  paddingBottom: 5,
                }}
              >
                Email Address
              </Text>

              <AppInput
                value={email}
                onChangeText={setEmail}
                placeholder="name@example.com"
                leftIcon="mail"
                keyboardType="email-address"
                type="email"
                required={true}
              />
              {errors.email ? (
                <Text style={{ color: COLORS.red, fontSize: 12, marginTop: 2 }}>
                  {errors.email}
                </Text>
              ) : null}
            </View>

            <View
              style={{
                paddingTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.black,
                  paddingBottom: 5,
                }}
              >
                Phone Number (10 digits)
              </Text>

              <AppInput
                value={phone}
                onChangeText={setPhone}
                placeholder="3001234567"
                leftIcon="phone"
                keyboardType="number-pad"
                type="phone"
                required={true}
              />
              {errors.phone ? (
                <Text style={{ color: COLORS.red, fontSize: 12, marginTop: 2 }}>
                  {errors.phone}
                </Text>
              ) : null}
            </View>

            <View
              style={{
                paddingTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.black,
                  paddingBottom: 5,
                }}
              >
                Password
              </Text>

              <AppInput
                value={password}
                onChangeText={setPassword}
                placeholder="Min 6 characters"
                leftIcon="lock-closed-outline"
                isPassword
                keyboardType="number-pad"
                type="password"
                required={true}
              />
              {errors.password ? (
                <Text style={{ color: COLORS.red, fontSize: 12, marginTop: 2 }}>
                  {errors.password}
                </Text>
              ) : null}
            </View>

           

            <Pressable
              style={{ alignSelf: 'flex-end', marginVertical: 10 }}
              onPress={() => navigation.navigate('login')}
            >
              <Text
                style={{
                  color: 'gray',
                  textDecorationColor: 'gray',
                  textDecorationLine: 'underline',
                }}
              >
                Already have an account?
              </Text>
            </Pressable>

            <TouchableOpacity
              style={[styles.primaryBtn, loading && { opacity: 0.7 }]}
              onPress={onSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={{ color: '#fff', fontFamily: 'Poppins-SemiBold' }}>
                  Sign Up
                </Text>
              )}{' '}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;
