import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Colors, Mixins, Typography } from '@styles/index';
import Weavy from './Weavy';

const { width } = Dimensions.get('window');

interface Props {
  title: string;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: Mixins.scaleSize(80),
    alignItems: 'center',
    backgroundColor: Colors.BG_PRIMARY,
    width,
  },
  title: {
    alignSelf: 'center',
    // fontWeight: 'bold',
    fontSize: Mixins.scaleFont(28),
    textAlign: 'center',
    color: Colors.WHITE,
    fontFamily: Typography.FONT_HEADER,
  },
});

const Header = ({ title }: Props) => {
  return (
    <View style={styles.container}>
      <Weavy />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;
