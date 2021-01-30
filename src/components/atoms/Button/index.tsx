import { Colors, Mixins } from '@styles/index';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  title?: string;
  onPress?: () => void;
  customStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  iconName?: string;
  iconColor?: string;
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: Colors.DOABLE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    ...Mixins.boxShadow({
      color: Colors.BLACK,
      radius: 4,
    }),
  },
  title: {
    color: Colors.WHITE,
    fontSize: Mixins.scaleFont(16),
    alignSelf: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
  disabledStyle: {
    opacity: 0.5,
  },
});

const Button = ({
  title,
  onPress,
  customStyle,
  titleStyle,
  disabled,
  iconName,
  iconColor,
}: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.button,
        customStyle || {},
        disabled && styles.disabledStyle,
      ]}
      onPress={onPress ? onPress : () => {}}>
      {iconName && (
        <Icon
          style={styles.icon}
          name={iconName}
          size={24}
          color={iconColor || Colors.BLACK}
        />
      )}
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default Button;
