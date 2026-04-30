// android/app/src/main/java/com/YOUR_APP_NAME/DeviceDetailsModule.java
// Replace YOUR_APP_NAME with your actual package name.

package com.YOUR_APP_NAME;

import android.os.Build;
import android.provider.Settings;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class DeviceDetailsModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public DeviceDetailsModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    // The name exposed to JS: NativeModules.DeviceDetails
    @Override
    public String getName() {
        return "DeviceDetails";
    }

    @ReactMethod
    public void getDeviceInfo(Promise promise) {
        try {
            WritableMap info = Arguments.createMap();

            info.putString("brand",       Build.BRAND);
            info.putString("model",       Build.MODEL);
            info.putString("manufacturer", Build.MANUFACTURER);
            info.putString("osVersion",   Build.VERSION.RELEASE);
            info.putInt   ("sdkVersion",  Build.VERSION.SDK_INT);
            info.putString("deviceId",    Build.ID);

            // Android ID (unique per device + app signing key)
            String androidId = Settings.Secure.getString(
                reactContext.getContentResolver(),
                Settings.Secure.ANDROID_ID
            );
            info.putString("androidId", androidId);

            promise.resolve(info);
        } catch (Exception e) {
            promise.reject("DEVICE_INFO_ERROR", e.getMessage());
        }
    }
}
