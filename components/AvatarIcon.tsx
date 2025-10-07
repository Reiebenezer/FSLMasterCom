import { AVATARS } from "@/app/(tabs)/avatars";
import { navigate } from "@/scripts/navigation";
import { Storage } from "expo-sqlite/kv-store";
import { Image, TouchableOpacity, ViewProps } from "react-native";
import { useContext } from "./LoadingProvider";

export default function AvatarIcon(props: ViewProps) {
  const context = useContext();
  const avatar = AVATARS[parseInt(Storage.getItemSync('avatarId') ?? '0')];
  
  return (
    <TouchableOpacity onPress={() => navigate('/avatars', context)} {...props} className={`rounded-full border-8 border-primary bg-light-100 overflow-hidden pt-2 size-20 items-center ${props.className}`}>
      <Image source={avatar} alt="Avatar" className="size-14" />
    </TouchableOpacity>
  )
}