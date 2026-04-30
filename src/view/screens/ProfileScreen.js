// src/view/screens/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

import COLORS from '../../consts/Colors';
import styles from '../styles';
import { logout, selectUser } from '../../consts/redux/reducers/Reducers';
import { getDeviceInfo } from '../native/DeviceDetails';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [device, setDevice] = useState(null);
  const [loadingDev, setLoadingDev] = useState(true);

  useEffect(() => {
    getDeviceInfo()
      .then(info => setDevice(info))
      .catch(() => setDevice(null))
      .finally(() => setLoadingDev(false));
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    dispatch(logout());
    navigation.replace('login');
  };

  const DeviceRow = ({ label, value }) => (
    <View style={localStyles.devRow}>
      <Text style={localStyles.devLabel}>{label}</Text>
      <Text style={localStyles.devValue}>{value ?? '—'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* ── Avatar ── */}
      <View style={styles.profile}>
        <Image
          style={{ width: 120, height: 120, borderRadius: 60 }}
          source={{
            uri:
              'https://ui-avatars.com/api/?name=' +
              (user?.name ?? 'User') +
              '&background=136c38&color=fff&size=200',
          }}
        />
        <Text style={styles.profileName}>{user?.name ?? 'Guest'}</Text>
        <Text
          style={{
            color: COLORS.gray,
            fontFamily: 'Poppins-Regular',
            fontSize: 13,
          }}
        >
          {user?.email ?? ''}
        </Text>
      </View>

      {/* ── Device Details (Native Module) ── */}
      <View style={localStyles.card}>
        <Text style={localStyles.cardTitle}>
          <Icon name="mobile" size={16} /> Device Details
        </Text>

        {loadingDev ? (
          <ActivityIndicator color={COLORS.main} style={{ marginTop: 8 }} />
        ) : device ? (
          <>
            <DeviceRow label="Brand" value={device.brand} />
            <DeviceRow label="Model" value={device.model} />
            <DeviceRow label="Manufacturer" value={device.manufacturer} />
            <DeviceRow label="Android OS" value={device.osVersion} />
            <DeviceRow label="SDK Version" value={String(device.sdkVersion)} />
            <DeviceRow label="Device ID" value={device.deviceId} />
          </>
        ) : (
          <Text style={{ color: COLORS.gray, fontSize: 13 }}>
            Could not retrieve device info.
          </Text>
        )}
      </View>

      {/* ── Logout ── */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Pressable style={localStyles.logoutBtn} onPress={handleLogout}>
          <Icon name="sign-out" size={18} color={COLORS.white} />
          <Text
            style={{
              color: COLORS.white,
              marginLeft: 8,
              fontFamily: 'Poppins-SemiBold',
            }}
          >
            Logout
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const localStyles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: COLORS.light,
    borderRadius: 14,
    padding: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.black,
    marginBottom: 10,
  },
  devRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2,
  },
  devLabel: {
    fontSize: 13,
    color: COLORS.gray,
    fontFamily: 'Poppins-Regular',
  },
  devValue: {
    fontSize: 13,
    color: COLORS.black,
    fontFamily: 'Poppins-SemiBold',
    maxWidth: '60%',
    textAlign: 'right',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.black ?? 'red',
    borderRadius: 12,
    paddingVertical: 14,
  },
});
