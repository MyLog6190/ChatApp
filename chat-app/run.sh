# adb -s emulator-5554 install ./android/app/build/outputs/apk/debug/app-debug.apk 
# npx react-native start --host 127.0.0.1 --reset-cache
#!/usr/bin/env bash
set -euo pipefail

# 경로는 네 환경에 맞춰 수정
EMU="/mnt/c/Users/adg61/AppData/Local/Android/Sdk/emulator/emulator.exe"
ADB="/mnt/c/Users/adg61/AppData/Local/Android/Sdk/platform-tools/adb.exe"
AVD="Medium_Phone_API_36.0"
APK_L="./android/app/build/outputs/apk/debug/app-debug.apk"
APK_W=$(wslpath -w "$APK_L")   # WSL 경로 → Windows 경로

# 1) 에뮬레이터 백그라운드 실행 (이미 떠 있으면 건너뜀)
if ! "$ADB" devices | awk '/^emulator-/{found=1} END{exit !found}'; then
  "$EMU" -avd "$AVD" >/dev/null 2>&1 &
fi

# 2) 디바이스 대기 + 완전 부팅 대기
"$ADB" -e wait-for-device
# 부팅 완료 대기 (sys.boot_completed == 1)
until "$ADB" -e shell getprop sys.boot_completed 2>/dev/null | tr -d '\r' | grep -q "1"; do
  sleep 1
done

# 3) (RN이면) Metro 터널링
"$ADB" -e reverse tcp:8081 tcp:8081 || true

# 4) 설치
"$ADB" -e install -r "$APK_W"

# 5) 원하면 앱 실행
# PKG="com.yourapp"; ACT=".MainActivity"
# "$ADB" -e shell am start -n "$PKG/$ACT"
npx react-native start --host 127.0.0.1 --reset-cache
