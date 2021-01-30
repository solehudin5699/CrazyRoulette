import { Colors } from '@styles/index';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

interface Props {
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: Colors.BG_PRIMARY,
  },
});

const Layout = ({ children }: Props) => {
  return (
    <>
      <StatusBar backgroundColor={Colors.PRIMARY} />
      <View style={styles.layout}>{children}</View>
    </>
  );
};

export default Layout;
