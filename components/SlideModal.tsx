import { JSX, useEffect, useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const { height } = Dimensions.get('window');

export default function SlideModal({ visible, onClose, children }: { visible: boolean, onClose: () => void, children?: JSX.Element | JSX.Element[] }) {
  const [isMounted, setIsMounted] = useState(false);

  const backdropOpacity = useSharedValue(0);
  const yTranslation = useSharedValue(height);

  useEffect(() => {
    if (visible) {
      setIsMounted(true);

      backdropOpacity.value = withTiming(
        1,
        { duration: 100, easing: Easing.out(Easing.cubic) },
        finished => {
          if (!finished) return;
          yTranslation.value = withTiming(
            0,
            { duration: 300, easing: Easing.out(Easing.cubic) }
          )
        }
      )
      return;
    }

    yTranslation.value = withTiming(
      height,
      { duration: 300, easing: Easing.in(Easing.cubic) },
      finished => {
        if (!finished) return;

        backdropOpacity.value = withTiming(
          0,
          { duration: 100, easing: Easing.in(Easing.cubic) },
          finished => {
            if (finished) runOnJS(setIsMounted)(false)
          }
        )
      }
    )
  }, [visible]);

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value
  }));

  const yTranslationStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: yTranslation.value }]
  }));

  return isMounted && (
    <View className="flex-grow absolute inset-0 z-10">
      <Animated.View style={[opacityStyle]} className="flex-grow bg-black/40">
        <TouchableOpacity activeOpacity={1} className="flex-1" onPress={onClose} />
      </Animated.View>
      <Animated.View style={[yTranslationStyle]} className="p-6 h-1/2 bg-light-100 absolute inset-x-0 bottom-0">
        {children}
      </Animated.View>
    </View>
  )
};