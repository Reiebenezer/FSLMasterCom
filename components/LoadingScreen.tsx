import { useEffect, useState } from "react";
import { Text } from "react-native";
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useContext } from "./LoadingProvider";

export default function LoadingScreen() {
  const { visible } = useContext();

  const opacity = useSharedValue(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      setLoading(true);
      opacity.value = withTiming(1, { easing: Easing.out(Easing.cubic) });
      return;
    }

    opacity.value = withTiming(
      0,
      { easing: Easing.in(Easing.cubic) },
      finished => {
        if (finished) runOnJS(setLoading)(false);
      });
  }, [visible]);

  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  return loading && (
    <Animated.View style={[animatedOpacity]} className="z-[9999] absolute inset-0 h-full w-full bg-accent items-center justify-center">
      <Text className="font-poppins-bold text-4xl text-light-100">ISATayo</Text>
      <Text className="font-poppins text-2xl text-light-100">Loading...</Text>
    </Animated.View>
  )
}