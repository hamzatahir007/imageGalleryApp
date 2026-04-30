# 📸 Image Gallery App — Technical Assessment

A React Native image gallery with GraphQL (Hasura), Redux Toolkit, Reanimated animations, and a native Android DeviceDetails module.

---

## Tech Stack

- React Native (CLI)
- Apollo Client
- GraphQL (Hasura)
- Redux Toolkit
- AsyncStorage
- React Navigation

---

## Project Structure

```
src/
├── assets/
├── consts/
│   ├── Colors.js
│   └── redux/
│       ├── store.js                  ← updated — includes gallerySlice
│       └── reducers/
│           ├── Reducers.js           ← user/auth slice (unchanged)
│           └── gallerySlice.js       ← NEW: images, liked, loading, error
├── graphql/
│   ├── client.js                     ← Apollo Client setup
│   └── queries.js                    ← GQL queries & mutations
├
└── view/
    |── components
    |   └── AppInput.js
    |   └── CustomeButton.js
    |   └── CustomeCircleButton.js
    |── native/
    │   └── DeviceDetails.js              ← JS wrapper for native module
    ├── routes/
    │   ├── RootNavigator.js
    │   └── BottomNavigator.js        ← updated
    └── screens/
        ├── Login.js                  ← updated (GraphQL + validation)
        ├── Signup.js                 ← updated (GraphQL + validation)
        ├── ImageGalleryScreen.js     ← NEW: grid, pull-to-refresh, like
        ├── ImageDetailScreen.js      ← NEW: details + zoom + heart anim
        ├── LikeScreen.js             ← updated: shows liked images
        └── ProfileScreen.js          ← updated: device info display

android/app/src/main/java/com/imagegallery/
├── DeviceDetailsModule.java   
└── DeviceDetailsPackage.java 



## Features

### ✅ Auth
- Register with **Name, Email, Phone, Password**
- Client-side validation: email format, 10-digit phone, min 6-char password
- Stored via GraphQL mutation → Hasura → PostgreSQL
- Login via GraphQL query with session persisted in AsyncStorage + Redux

### ✅ Image Gallery
- Grid layout (2 columns) fetched from GraphQL
- **Pull-to-refresh** via `RefreshControl`
- Tap card → navigates to Image Detail Screen
- **Like button** with heart bounce animation (Reanimated)
- Liked count synced to database via mutation

### ✅ Image Detail Screen
- Full-size image with **zoom-in animation on mount** (Reanimated)
- Title, Author, Description, Total Likes
- Like button with **heart bounce animation** (Reanimated)
- Optimistic UI update — instant feedback, rollback on error

### ✅ Redux State
| Slice | State Managed |
|-------|--------------|
| `gallery` | `images`, `likedImages`, `loading`, `error` |
| `user`    | `user`, `tempuser`, `itemsInCart` |

### ✅ Native Module — DeviceDetails
Exposes `getDeviceInfo()` returning:
- `brand`, `model`, `manufacturer`
- `osVersion`, `sdkVersion`
- `deviceId`, `androidId`

Displayed on the **Profile screen**.

---

## Animations Summary

| Animation | Trigger | Library |
|-----------|---------|---------|
| Zoom-in   | Navigate to Image Detail | `react-native-reanimated` |
| Heart bounce + burst | Tap like button | `react-native-reanimated` |

---

## Database Schema

Two tables — `users` and `images`. See `database_schema.sql` for full SQL including seed data (20 sample images).



# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
npm install

## Run the App
First make sure you have react native setup installed

# Start Metro bundler
npm start

# Android
npx react-native run-android
# APK Build
cd android && gradlew assembleRelease

# iOS (Mac only)
cd ios && pod install && cd ..
npx react-native run-ios