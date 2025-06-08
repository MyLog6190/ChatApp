// ChatRoomScreen.tsx

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';

const messages = [
  {id: '1', text: '안녕!', sender: 'friend'},
  {id: '2', text: '어이! 잘 지냈어?', sender: 'me'},
];

export default function ChatRoomScreen() {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    // TODO: 메시지 추가 로직
    setInputText('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backText}>{'←'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>김철수</Text>
        <View style={{width: 24}} />
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        style={styles.chatList}
        contentContainerStyle={{padding: 16}}
        renderItem={({item}) => (
          <View
            style={[
              styles.messageBubble,
              item.sender === 'me' ? styles.myMessage : styles.friendMessage,
            ]}>
            <Text
              style={[
                styles.messageText,
                item.sender === 'me'
                  ? styles.myMessageText
                  : styles.friendMessageText,
              ]}>
              {item.text}
            </Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="메시지를 입력하세요"
          placeholderTextColor="#B0885A"
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>보내기</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5D7B4',
    backgroundColor: '#FDEBD2',
  },
  backText: {
    fontSize: 24,
    color: '#6B3E26',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B3E26',
  },
  chatList: {
    flex: 1,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '70%',
    marginVertical: 6,
  },
  friendMessage: {
    backgroundColor: '#FDEBD2',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  myMessage: {
    backgroundColor: '#D88A4D',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  friendMessageText: {
    color: '#6B3E26',
  },
  myMessageText: {
    color: '#fff',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5D7B4',
    backgroundColor: '#FFF8F0',
  },
  input: {
    flex: 1,
    backgroundColor: '#FDEBD2',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#6B3E26',
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#D88A4D',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
