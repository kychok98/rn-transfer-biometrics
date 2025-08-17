# rn-transfer-biometrics

Expo Router + NativeWind + Biometrics demo for a digital banking transfer flow.

## Run

```
npm install
npm run start
```

## Test Biometrics

- On real devices: Face ID / Touch ID prompt appears on Send.
- On Simulator/Emulator without biometrics enrolled: PIN fallback appears. Demo PIN: **123456**.

## Notes

- Amount validation supports 2 decimal places.
- Simulated API throws realistic errors.
- Recipient list is 1,000 items to showcase perf tuning.
