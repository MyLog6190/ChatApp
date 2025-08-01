// ChatListScreen.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const chats = [
  {
    id: '1',
    name: '곰돌이 친구',
    message: '오늘 산책 어때요?',
    time: '오후 3:15',
    avatar: require('../assets/default-avatar-white.png'),
  },
  {
    id: '2',
    name: '브라우니',
    message: '사진 잘 받았어요 🐾',
    time: '오후 2:30',
    avatar: require('../assets/default-avatar-brown.png'),
  },
  {
    id: '3',
    name: '흑곰이',
    message: '곧 도착할게요',
    time: '오전 11:50',
    avatar: require('../assets/default-avatar-black.png'),
  },
];

export default function ChatRoomListScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.chatItem}>
            <Image source={item.avatar} style={styles.avatar} />
            <View style={styles.textContainer}>
              <View style={styles.nameTimeRow}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <Text style={styles.message}>{item.message}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2E6DC',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B3E26',
  },
  time: {
    fontSize: 12,
    color: '#B0885A',
  },
  message: {
    fontSize: 14,
    color: '#7F5A3C',
  },
});
