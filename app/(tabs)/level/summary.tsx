import { useContext } from "@/components/LoadingProvider";
import { navigate } from "@/scripts/navigation";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Storage } from "expo-sqlite/kv-store";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";


export default function Summary() {
  const { level, correct, incorrect } = useLocalSearchParams();
  const context = useContext();

  useEffect(() => {
    console.log(level);

    if (level === 'tutorial') {
      Storage.setItemSync("completedTutorial", 'true');
    }
  }, []);

  const correctAnswerCount = (correct as string).split(',').filter(s => s.length > 0).length;
  const incorrectAnswerCount = (incorrect as string).split(',').filter(s => s.length > 0).length;

  if (incorrectAnswerCount === 0 && level !== 'tutorial') {
    context.levels.get(parseInt(level as string))!.completed = true;
  }

  return (
    <View className="flex-grow justify-center items-center gap-4">
      <Text className="font-bold text-4xl">Level Summary</Text>
      <View className="">
        <View className="flex-row">
          <Text className="flex-grow">Correct guesses</Text>
          <Text className="min-w-8 text-right color-green-600">{correctAnswerCount}</Text>
        </View>
        <View className="flex-row">
          <Text className="flex-grow">Incorrect guesses</Text>
          <Text className="min-w-8 text-right color-red-500">{incorrectAnswerCount}</Text>
        </View>
      </View>
      <View className="flex-row gap-4">
        <TouchableOpacity className="rounded-full bg-primary p-3" onPress={() => navigate(level === 'tutorial' ? '/tutorial' : `/level/${level}`, context)}>
          <Ionicons name="repeat" size={32} color="white" />
        </TouchableOpacity>
        {incorrectAnswerCount === 0 &&
          <TouchableOpacity className="rounded-full bg-primary p-3" onPress={() => navigate('/levels', context, true)}>
            <Ionicons name="arrow-forward" size={32} color="white" />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
}