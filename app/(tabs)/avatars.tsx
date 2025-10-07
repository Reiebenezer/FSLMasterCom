import BackButton from "@/components/BackButton";
import { useContext } from "@/components/LoadingProvider";
import { Ionicons } from "@expo/vector-icons";
import { Storage } from "expo-sqlite/kv-store";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from "react-native";

export const AVATARS = [
  require('@/assets/avatars/1.png'),
  require('@/assets/avatars/2.png'),
  require('@/assets/avatars/3.png'),
  require('@/assets/avatars/4.png'),
  require('@/assets/avatars/5.png'),
  require('@/assets/avatars/6.png'),
  require('@/assets/avatars/7.png'),
  require('@/assets/avatars/8.png'),
  require('@/assets/avatars/premium-1.png'),
  require('@/assets/avatars/premium-2.png'),
  require('@/assets/avatars/premium-3.png'),
  require('@/assets/avatars/premium-4.png'),
  require('@/assets/avatars/premium-5.png'),
] as const;

export default function Avatars() {
  const context = useContext();
  const [avatarId, setAvatarId] = useState(parseInt(Storage.getItemSync('avatarId') ?? '0'));
  const avatar = AVATARS[avatarId];

  useEffect(() => { Storage.setItem('avatarId', avatarId.toString()) }, [avatarId]);

  function isLocked(index: number) {
    const highestAvatarUnlocked = [...context.levels.values()].findIndex(l => l.completed) + 8; // 7 if no level is completed, then 8, and so on
    return index > highestAvatarUnlocked;
  }

  function setAvatar(index: number) {
    if (isLocked(index)) {
      ToastAndroid.show(`Complete level ${index - 7} first!`, ToastAndroid.SHORT);
      return;
    }

    setAvatarId(index);
  }

  return (
    <View className="flex-1 items-center justify-center mb-8">
      <BackButton />
      <View className="mt-32 border-8 border-primary pt-4 size-32 overflow-hidden items-center bg-light-100">
        <Image source={avatar} className="size-24" />
      </View>
      <Text className="font-poppins-bold text-3xl mt-2">Pick Your Avatar</Text>

      <ScrollView contentContainerClassName="mt-12 gap-4 flex-row flex-wrap px-8 justify-center">
        {AVATARS.map((source, i) => (
          <TouchableOpacity onPress={() => setAvatar(i)} key={`avatar-${i}`} className="group relative items-center justify-center bg-light-100">
            <Image className="size-24" style={{ tintColor: 'gray' }} source={source} />
            <Image className={`size-24 absolute inset-0 ${isLocked(i) && 'opacity-30'}`} source={source} />
            {isLocked(i) &&
              <Ionicons name="lock-closed" className="absolute" color={'orange'} size={64} />
            }
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}