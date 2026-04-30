import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { login, selectUser } from '../../consts/redux/reducers/Reducers.js';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tutorial from '../screens/Onboarding.js';
import Login from '../screens/Login.js';
import Signup from '../screens/Signup.js';
import BottomNavigator from './BottomNavigator.js';

const Stack = createNativeStackNavigator();

const RootNaviagtor = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const data = await AsyncStorage.getItem('user');

      if (data) {
        const parsed = JSON.parse(data);
        if (parsed) {
          dispatch(login(parsed));
        }
      }
    };

    loadUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <Stack.Screen name="Main" component={BottomNavigator} />
        ) : (
          <>
            <Stack.Screen name="Onboarding" component={Tutorial} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="login" component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNaviagtor;
