import { Colors } from '@styles/index';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const styles = StyleSheet.create({
  weavy: {
    position: 'absolute',
    top: 0,
  },
});

function Weavy() {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 1440 320" style={styles.weavy}>
      <Path
        fill={Colors.PRIMARY}
        d="M0,160L48,170.7C96,181,192,203,288,224C384,245,480,267,576,277.3C672,288,768,288,864,282.7C960,277,1056,267,1152,245.3C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      />
    </Svg>
  );
}

export default Weavy;
