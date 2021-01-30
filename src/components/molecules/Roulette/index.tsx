import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  roulette2,
  roulette3,
  roulette4,
  roulette6,
  roulette8,
  roulette9,
  selector,
} from '@assets/index';
import { Colors, Mixins, Typography } from '@styles/index';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Button from '@components/atoms/Button';
import Sound from 'react-native-sound';

const determineRouletteSize = (length: number) => {
  switch (length) {
    case 2:
      return roulette2;
    case 3:
      return roulette3;
    case 4:
      return roulette4;
    case 5:
    case 6:
      return roulette6;
    case 7:
    case 8:
      return roulette8;
    case 9:
      return roulette9;
  }
};

const n2 = [
  [-1, 0, 0.5, 0],
  [1, 0, 0.5, 0],
];

const n3 = [
  [0, -1, 0, 0],
  [1, 1, 0.523599, 0],
  [-1, 1, 0.523599, 0],
];

const n4 = [
  [-1, 1, 0.785398, 0],
  [1, 1, 0.785398, 0],
  [1, -1, 0.785398, 0],
  [-1, -1, 0.785398, 0],
];

const n6 = [
  [1, 0, 0, 0],
  [1, 0, 0, 60],
  [-1, 0, 0, -60],
  [-1, 0, 0, 0],
  [-1, 0, 0, 60],
  [1, 0, 0, -60],
];

const n8 = [
  [1, 0, 0, 30],
  [1, 0, 0, 70],
  [1, 0, 0, 115],
  [1, 0, 0, 155],
  [1, 0, 0, 200],
  [1, 0, 0, 230],
  [1, 0, 0, 300],
  [1, 0, 0, 340],
];

const n9 = [
  [1, 0, 0, 35],
  [1, 0, 0, 70],
  [1, 0, 0, 115],
  [1, 0, 0, 145],
  [1, 0, 0, 185],
  [1, 0, 0, 220],
  [1, 0, 0, 280],
  [1, 0, 0, 310],
  [1, 0, 0, 355],
];

const n = [n2, n2, n3, n4, n6, n6, n8, n8, n9];

interface Props {
  itemList: string[];
  isSpinning?: (spinning: boolean) => void;
}

const ROULETTE_SIZE = Mixins.scaleSize(290);

const RAD_90 = 1.5708;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    ...Mixins.margin(Mixins.scaleSize(30), 0, 0, 0),
  },
  selector: {
    position: 'absolute',
    zIndex: 1,
    top: Mixins.scaleSize(-25),
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 0,
    ...Mixins.boxShadow({ color: Colors.BG_PRIMARY, radius: 3 }),
  },
  selectorImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  roulette: {
    width: ROULETTE_SIZE,
    height: ROULETTE_SIZE,
    borderRadius: ROULETTE_SIZE / 2,
    backgroundColor: Colors.WHITE,
    ...Mixins.boxShadow({ color: Colors.BLACK, radius: 3 }),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonContainer: {
    // position: 'absolute',
    // bottom: Mixins.scaleSize(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    ...Mixins.margin(Mixins.scaleSize(30), 0, 0, 0),
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    width: Mixins.scaleSize(80),
    height: Mixins.scaleSize(40),
    ...Mixins.margin(0, 5, 0, 0),
  },
  buttonReset: {
    alignItems: 'center',
    width: Mixins.scaleSize(80),
    height: Mixins.scaleSize(40),
    ...Mixins.margin(0, 0, 0, 5),
  },
  buttonTitle: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlignVertical: 'center',
  },
  rouletteContent: {
    position: 'absolute',
    zIndex: 1,
    top: '45%',
    left: '40%',
    fontSize: Mixins.scaleFont(16),
    alignSelf: 'center',
    textAlign: 'center',
  },
});

const Roulette = ({ itemList, isSpinning }: Props) => {
  const [_isSpinning, _spin] = useState(false);
  const rotationZ = useSharedValue(0);
  const randomValue = useSharedValue(0);
  const itemLength = itemList.length;
  const rouletteImage = determineRouletteSize(itemLength);
  let player = useRef<Sound | null>(null);

  useEffect(() => {
    player.current = new Sound('spinning_sound.mp3', Sound.MAIN_BUNDLE);
  }, []);

  useEffect(() => {
    if (_isSpinning) {
      player.current?.play();
    } else {
      player.current?.stop();
    }
    if (isSpinning) {
      isSpinning(_isSpinning);
    }
  }, [_isSpinning]);

  const rotate = useAnimatedStyle(() => {
    rotationZ.value = _isSpinning
      ? withTiming(
          randomValue.value * 10,
          {
            duration: 5000,
            easing: Easing.out(Easing.quad),
          },
          (isFinished) => {
            if (isFinished) {
              runOnJS(_spin)(false);
            }
          },
        )
      : rotationZ.value;
    return {
      transform: [{ rotate: `${rotationZ.value}deg` }],
    };
  });

  const onSpin = () => {
    if (!_isSpinning) {
      rotationZ.value = 0;
      randomValue.value = 360 + Math.round(Math.random() * 359 + 1);
    }
    _spin((prevState) => !prevState);
  };

  const onReset = () => {
    if (_isSpinning) {
      _spin(false);
    }
    rotationZ.value = 0;
  };

  return (
    <View style={styles.container}>
      <View style={styles.selector}>
        <Image source={selector} style={styles.selectorImage} />
      </View>
      <Animated.View style={[styles.roulette, rotate]}>
        {itemList.map((item, index) => {
          const eachStyle = {
            transform: [
              { rotate: `${n[itemLength - 1][index][3]}deg` },
              {
                translateX:
                  Mixins.scaleSize(70) *
                  n[itemLength - 1][index][0] *
                  Math.cos(n[itemLength - 1][index][2]),
              },
              {
                translateY:
                  Mixins.scaleSize(70) *
                  n[itemLength - 1][index][1] *
                  Math.sin(RAD_90 - n[itemLength - 1][index][2]),
              },
            ],
          };
          return (
            <Text key={index} style={[styles.rouletteContent, eachStyle]}>
              {item}
            </Text>
          );
        })}
        <Image style={styles.image} source={rouletteImage} />
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Button
          iconName="checkmark-outline"
          iconColor={Colors.WHITE}
          title="Spin"
          titleStyle={styles.buttonTitle}
          disabled={_isSpinning}
          customStyle={styles.button}
          onPress={onSpin}
        />
        <Button
          iconName="close-outline"
          iconColor={Colors.WHITE}
          disabled={_isSpinning}
          title="Reset"
          titleStyle={styles.buttonTitle}
          customStyle={styles.buttonReset}
          onPress={onReset}
        />
      </View>
    </View>
  );
};

export default Roulette;
