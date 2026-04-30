import React, { useState } from 'react';
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import styles from '../styles/index.js';
import AppInput from '../components/AppInput.js';

import COLORS from '../../consts/Colors.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLazyQuery } from '@apollo/client';
import { LOGIN_USER } from '../../graphql/queries.js';
import { useDispatch } from 'react-redux';
import { login } from '../../consts/redux/reducers/Reducers.js';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER);

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;

    try {
      const { data } = await loginUser({
        variables: { email: email.trim().toLowerCase(), password },
      });

      const user = data?.users?.[0];
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        dispatch(login(user));
        navigation.replace('Main');
      } else {
        ToastAndroid.show('Invalid email or password', ToastAndroid.LONG);
      }
    } catch (err) {
      ToastAndroid.show('Login failed. Try again.', ToastAndroid.LONG);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <View style={{ marginVertical: 10 }}>
            <Image
              style={{ width: 200, height: 200 }}
              source={require('../../assets/icons/Login.jpg')}
            />
          </View>

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
              Sign in
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
                Email Address
              </Text>

              <AppInput
                value={email}
                onChangeText={setEmail}
                placeholder="name@example.com"
                leftIcon="mail"
                keyboardType="text"
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
                Password
              </Text>
              <AppInput
                value={password}
                onChangeText={setPassword}
                placeholder="***********"
                leftIcon="lock-closed-outline"
                isPassword
                type="password"
                required
              />
              {errors.password ? (
                <Text style={{ color: COLORS.red, fontSize: 12, marginTop: 2 }}>
                  {errors.password}
                </Text>
              ) : null}
            </View>

            <Pressable
              style={{ alignSelf: 'flex-end', marginVertical: 10 }}
              onPress={() => navigation.navigate('signup')}
            >
              <Text
                style={{
                  color: 'gray',
                  textDecorationColor: 'gray',
                  textDecorationLine: 'underline',
                }}
              >
                Create an account
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
                <Text style={{ ...styles.btnTextPrimary, color: '#fff' }}>
                  Submit
                </Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
