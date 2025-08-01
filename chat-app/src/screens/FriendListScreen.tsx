// FriendListScreen.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const friends = [
  {
    id: '1',
    name: '홍길동',
    status: '오늘도 열심히!',
    avatar: require('../assets/default-avatar-black.png'),
  },
  {
    id: '2',
    name: '김철수',
    status: '휴식 중',
    avatar: require('../assets/default-avatar-white.png'),
  },
];

export default function FriendListScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/logo-white.png')} style={styles.logo} />
      <Text style={styles.title}>친구 목록</Text>

      <FlatList
        data={friends}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => (
          <View style={styles.friendItem}>
            <Image source={item.avatar} style={styles.avatar} />
            <View style={styles.friendInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.status}>{item.status}</Text>
            </View>
            <TouchableOpacity style={styles.chatButton}>
              <Text style={styles.chatButtonText}>채팅</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6B3E26',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDEBD2',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  friendInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: '#6B3E26',
    fontWeight: 'bold',
  },
  status: {
    fontSize: 13,
    color: '#A4754C',
  },
  chatButton: {
    backgroundColor: '#D88A4D',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  chatButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
