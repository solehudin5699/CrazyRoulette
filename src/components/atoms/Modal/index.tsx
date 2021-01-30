import { Colors, Mixins } from '@styles/index';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Pressable } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export interface AppProps {
  children?: React.ReactElement;
  toggleModal: (callback: () => void) => void;
  dismissable?: boolean;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(Pressable);

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    width,
    height,
    zIndex: 1,
    ...Mixins.padding(20, 10, 20, 10),
    ...Mixins.boxShadow({ color: Colors.BLACK, radius: 1 }),
  },
  container: {
    minWidth: Mixins.scaleSize(300),
    minHeight: 200,
    maxHeight: Mixins.scaleFont(500),
    alignSelf: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: Mixins.scaleSize(10),
    overflow: 'hidden',
    zIndex: 2,
    ...Mixins.boxShadow({ color: Colors.BLACK }),
  },
});

const SCALE_SPEED = 120;

const Modal = ({ toggleModal, children, dismissable }: AppProps) => {
  const [_active, _setActive] = useState(false);
  const _scale = useSharedValue(0);

  const _toggleActive = useCallback(() => {
    _setActive((prevState) => {
      if (prevState) {
        _scale.value = 0;
        return prevState;
      }
      _scale.value = 1;
      return !prevState;
    });
  }, [_scale.value]);

  useEffect(() => {
    toggleModal(_toggleActive);
  }, [toggleModal, _toggleActive]);

  const _animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(
            _scale.value,
            {
              duration: SCALE_SPEED,
              easing: Easing.linear,
            },
            (isFinished) => {
              if (isFinished) {
                if (_scale.value === 0) {
                  runOnJS(_setActive)(false);
                }
              }
            },
          ),
        },
      ],
    };
  });

  const _closeSelf = () => {
    if (dismissable) {
      _scale.value = 0;
    }
  };

  return _active ? (
    <AnimatedTouchableOpacity style={[styles.backdrop]} onPress={_closeSelf}>
      <Animated.View style={[styles.container, _animatedContainerStyle]}>
        {children}
      </Animated.View>
    </AnimatedTouchableOpacity>
  ) : null;
};

export default Modal;
