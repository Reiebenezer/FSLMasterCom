import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function BackButton() {
  return (
    <TouchableOpacity className="p-2 absolute left-4 top-12" onPress={() => router.back()}>
      <Ionicons name="arrow-back" size={24} className="text-light-100" />
    </TouchableOpacity>
  );
}