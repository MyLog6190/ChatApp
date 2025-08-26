import React, {useEffect, useRef} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';

type Variant = 'success' | 'error' | 'info';

type Props = {
  visible: boolean;
  title?: string;
  message?: string;
  onClose?: () => void;
  confirmText?: string;
  variant?: Variant;
};

const PALETTE = {
  brown: '#6B3E26',
  primary: '#D88A4D',
  cream: '#FDEBD2',
  success: '#2E7D32',
  error: '#D32F2F',
};

const VARIANT = {
  success: {
    iconBg: 'rgba(46,125,50,0.12)',
    iconColor: PALETTE.success,
    titleColor: PALETTE.success,
    textColor: PALETTE.brown,
    buttonBg: PALETTE.primary,
    icon: '✓',
  },
  error: {
    iconBg: 'rgba(211,47,47,0.12)',
    iconColor: PALETTE.error,
    titleColor: PALETTE.error,
    textColor: PALETTE.brown,
    buttonBg: PALETTE.primary,
    icon: '!',
  },
  info: {
    iconBg: 'rgba(107,62,38,0.12)',
    iconColor: PALETTE.brown,
    titleColor: PALETTE.brown,
    textColor: PALETTE.brown,
    buttonBg: PALETTE.primary,
    icon: 'i',
  },
} as const;

export function Popup({
  visible,
  title = '알림',
  message,
  onClose,
  confirmText = '확인',
  variant = 'info',
}: Props) {
  const v = VARIANT[variant];
  const scale = useRef(new Animated.Value(0.95)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scale.setValue(0.95);
      opacity.setValue(0);
    }
  }, [visible, scale, opacity]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.layer}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <Animated.View style={[styles.card, {transform: [{scale}], opacity}]}>
          {/* ✅ 아이콘 + 타이틀 */}
          <View style={styles.headerRow}>
            <View style={[styles.iconBadge, {backgroundColor: v.iconBg}]}>
              <Text style={[styles.iconText, {color: v.iconColor}]}>
                {v.icon}
              </Text>
            </View>
            <Text style={[styles.title, {color: v.titleColor}]}>{title}</Text>
          </View>

          {!!message && (
            <Text style={[styles.msg, {color: v.textColor}]}>{message}</Text>
          )}

          <TouchableOpacity
            style={[styles.btn, {backgroundColor: v.buttonBg}]}
            onPress={onClose}>
            <Text style={styles.btnText}>{confirmText}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  layer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  card: {
    width: '80%',
    backgroundColor: PALETTE.cream,
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 18,
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: PALETTE.brown,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
    alignSelf: 'stretch',
  },
  iconBadge: {
    width: 28, // ✅ 줄임
    height: 28, // ✅ 줄임
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {fontSize: 16, fontWeight: '900'}, // ✅ 줄임
  title: {fontSize: 18, fontWeight: '800', textAlign: 'center'},
  msg: {fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 14},
  btn: {
    marginTop: 6,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  btnText: {color: '#fff', fontWeight: 'bold', fontSize: 15},
});
