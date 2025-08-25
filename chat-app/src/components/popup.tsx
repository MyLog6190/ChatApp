import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type Props = {
  visible: boolean;
  title?: string;
  message?: string;
  onClose?: () => void;
};

export function BasicPopup({visible, title = '알림', message, onClose}: Props) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          {!!message && <Text style={styles.msg}>{message}</Text>}
          <TouchableOpacity style={styles.btn} onPress={onClose}>
            <Text style={styles.btnText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FDEBD2',
    borderRadius: 18,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  title: {color: '#6B3E26', fontSize: 18, fontWeight: '800', marginBottom: 8},
  msg: {color: '#6B3E26', fontSize: 15, textAlign: 'center'},
  btn: {
    marginTop: 16,
    backgroundColor: '#D88A4D',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  btnText: {color: '#fff', fontWeight: 'bold'},
});
