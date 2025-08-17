# 📱 Payment Transfer Module (React Native + Expo)

This is a take-home assessment demonstrating a secure transaction flows in React Native with Expo.

Implements **biometric authentication with PIN fallback**, mock API, and a **two-step transfer flow**:  
**Select Recipient → Enter Amount → Confirm Transfer**.

---

## 🚀 Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/en) (>= 20)
- npm or Yarn
- [Expo Go](https://expo.dev/client) installed on your mobile device (iOS)


### Run Locally
```bash
npm install
npm run start
```
This will start the Expo dev server.


### Open on Device
1. Scan the QR code in your terminal or browser using the **Expo Go** app.
2. The app should load on your device.

---

### 🧪 How to Simulate Test Scenarios
Enter specific amounts to simulate errors:
1. RM `404` → **Insufficient funds**
2. RM `500` → **Network/server error**
3. Any other valid amount → **Success**


### 🔐 Biometrics & PIN
- On real devices: Face ID / Touch ID will prompt when sending.
- On simulator/emulator: biometrics are not available → PIN fallback will appear.

>Demo PIN: 123456

#### Note:
- No Apple Developer ID was used. Face ID cannot be simulated — please see the demo video for biometric flow.
- Tested on **iOS (physical device)** only. _Web and Android are not fully optimized._

---

### 🎥 Demo Video

