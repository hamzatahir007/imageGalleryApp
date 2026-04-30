import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../consts/Colors';
import HomeScreen from '../screens/HomeScreen.js';
import LikeScreen from '../screens/LikeScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import LikeDetailScreen from '../screens/LikeDetailScreen.js';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const HomeStack = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      tabBar: false,
    }}
    initialRouteName="HomeScreen"
  >
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="LikeDetailScreen" component={LikeDetailScreen} />
  </Stack.Navigator>
);

const LikeStack = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      tabBar: false,
    }}
    initialRouteName="LikeScreen"
  >
    <Stack.Screen name="LikeScreen" component={LikeScreen} />
    <Stack.Screen name="LikeDetailScreen" component={LikeDetailScreen} />
  </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      tabBar: false,
    }}
    initialRouteName="ProfileScreen"
  >
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
  </Stack.Navigator>
);

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.main, 
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
        // tabBarItemStyle: {
        //   borderTopWidth: 3,
        //   borderTopColor: 'transparent',
        //   paddingTop: 6,
        // },

        tabBarIcon: ({ color, size, focused }) => {
          let icon;

          if (route.name === 'Home') {
            icon = (
              <Image
                source={require('../../assets/images/Home.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.black : COLORS.translation,
                }}
              />
            );
          } else if (route.name === 'Like') {
            icon = (
              <Image
                source={require('../../assets/images/apply.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.black : COLORS.translation,
                }}
              />
              // <MaterialCommunityIcons
              //   name="file-document-outline"
              //   size={24}
              //   color={color}
              // />
            );
          } else if (route.name === 'Profile') {
            icon = (
              <Image
                source={require('../../assets/images/Profile.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.black : COLORS.translation,
                }}
              />
            );
          }

          return (
            <View
              style={[
                styles.tabItemContainer,
                focused && styles.activeTabBorder,
              ]}
            >
              {icon}
            </View>
          );
        },

        tabBarItemStyle: ({ focused }) => ({
          borderTopWidth: 3,
          borderTopColor: focused ? '#0A8F3C' : 'transparent',
          paddingTop: 6,
        }),
      })}
      initialRouteName="Home"
    >
      <Tab.Screen
        options={() => ({
          tabBarLabel: ({ focused }) => {
            return (
              <View>
                <Text
                  style={{
                    color: focused ? COLORS.black : COLORS.gray,
                    fontSize: 12,
                    paddingTop: 5,
                  }}
                >
                  Home{' '}
                </Text>
              </View>
            );
          },

          tabBarItemStyle: styles.tabItem,
        })}
        name="Home"
        component={HomeStack}
      />

      <Tab.Screen
        options={() => ({
          tabBarLabel: ({ focused }) => {
            return (
              <View>
                <Text
                  style={{
                    color: focused ? COLORS.black : COLORS.gray,
                    fontSize: 12,
                    paddingTop: 5,
                  }}
                >
                  Likes
                </Text>
              </View>
            );
          },
        })}
        name="Like"
        component={LikeStack}
      />

      <Tab.Screen
        options={() => ({
          tabBarLabel: ({ focused }) => {
            return (
              <View>
                <Text
                  style={{
                    color: focused ? COLORS.black : COLORS.gray,
                    fontSize: 12,
                    paddingTop: 5,
                  }}
                >
                  Profile
                </Text>
              </View>
            );
          },
        })}
        name="Profile"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    paddingBottom: 10,
    paddingTop: 0,
    backgroundColor: '#F3F3F3',
    borderTopWidth: 0,
    elevation: 8,
  },

  label: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },

  tabItemContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 8,
  },

  activeTabBorder: {
    borderTopWidth: 3,
    borderTopColor:COLORS.black,
  },
});
