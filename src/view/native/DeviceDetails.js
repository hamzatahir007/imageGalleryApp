// src/native/DeviceDetails.js
import { NativeModules } from 'react-native';

const { DeviceDetails } = NativeModules;

/**
 * Returns a promise resolving to:
 * {
 *   brand, model, manufacturer,
 *   osVersion, sdkVersion, deviceId, androidId
 * }
 */
export const getDeviceInfo = () => DeviceDetails.getDeviceInfo();

export default DeviceDetails;
