// MyPageScreen.tsx

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useLogout} from '../../hooks/queries/useAuth';
export default function MyPageScreen() {
  const logout = () => {
    const logoutMatate = useLogout();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{padding: 20}}>
      {/* 프로필 정보 */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/default-avatar-black.png')}
          style={styles.avatar}
        />
        <Text style={styles.username}>홍길동</Text>
        <Text style={styles.email}>hello@example.com</Text>
      </View>

      {/* 기능 버튼들 */}
      <View style={styles.menuGroup}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>프로필 수정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>비밀번호 변경</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>알림 설정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>친구 차단 관리</Text>
        </TouchableOpacity>
      </View>

      {/* 로그아웃 */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText} onPress={logout}>
          로그아웃
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8F0',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B3E26',
  },
  email: {
    fontSize: 14,
    color: '#A4754C',
  },
  menuGroup: {
    backgroundColor: '#FDEBD2',
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: '#FFF8F0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F3C28F',
  },
  menuText: {
    fontSize: 15,
    color: '#6B3E26',
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: 32,
    backgroundColor: '#D88A4D',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
