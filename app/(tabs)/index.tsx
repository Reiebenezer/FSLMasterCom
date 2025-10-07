import AvatarIcon from "@/components/AvatarIcon";
import Button from "@/components/Button";
import { useContext } from "@/components/LoadingProvider";
import SlideModal from "@/components/SlideModal";
import { navigate } from "@/scripts/navigation";
import { Ionicons } from "@expo/vector-icons";
import { Storage } from "expo-sqlite/kv-store";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle } from 'react-native-reanimated';

const COLORS = ["#9d2b2b", "#fd7f2e", '#2d79df', '#2efdea', '#FB4B4E', '#7C0B2B',];

export default function Index() {
  const context = useContext();
  const isTutorial = Storage.getItemSync("completedTutorial") !== 'true';

  const [comingSoonModalVisible, setComingSoonModalVisible] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  // const colorProgress = useDerivedValue(() => withTiming(colorIndex));

  const colorStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      colorIndex,
      [...COLORS.keys()],
      COLORS
    )
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex(prev => (prev + 1) % COLORS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [])

  return (
    <View className="flex-grow items-center justify-center">
      <AvatarIcon className="absolute top-12 right-8" />
      <Text className="text-3xl mb-3 font-poppins">Welcome to</Text>
      <Animated.Text className="text-4xl font-poppins-bold" style={colorStyle}>FSL MasterCom</Animated.Text>

      {isTutorial ? (
        <Button onPress={() => navigate('/tutorial', context)}>
          <Text className="text-light-100 text-lg font-gi">
            START TUTORIAL
          </Text>
        </Button>
      ) : (
        <View className="mt-32 gap-4 px-6">
          <View className="flex-row gap-4 w-full">
            <Button className="flex-grow rounded-2xl" colors={['#2d79df', '#2efdea']} onPress={() => navigate('/levels', context)}>
              <Text className="font-gi text-xl text-light-100">LEARNING</Text>
              <Text className="font-gi text-xl text-light-100">PART</Text>
              <Ionicons name="book-outline" color="white" size={72} className="self-end mt-2" />
            </Button>
            <Button className="flex-grow rounded-2xl" onPress={() => setComingSoonModalVisible(true)}>
              <Text className="font-gi text-xl text-light-100">TRANSLATING</Text>
              <Text className="font-gi text-xl text-light-100">PART</Text>
              <Ionicons name="camera-outline" color="white" size={72} className="self-end mt-2" />
            </Button>
          </View>

          <Button className="rounded-full" onPress={() => navigate('/tutorial', context)}>
            <Text className="text-light-100 font-gi text-center">TUTORIAL</Text>
          </Button>

          <TouchableOpacity onPress={() => navigate('/reset-confirmation', context)}>
            <Text className="text-primary text-lg font-gi text-center">
              RESET LEVELS
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <SlideModal visible={comingSoonModalVisible} onClose={() => setComingSoonModalVisible(false)}>
        <Text className="font-poppins-bold text-3xl mb-2 text-primary">Coming Soon!</Text>
        <Text className="font-poppins">This feature is not yet available.</Text>
      </SlideModal>
      
    </View>
  );
}