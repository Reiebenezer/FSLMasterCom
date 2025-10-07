import LevelNode from "@/components/levels/LevelNode";
import { useContext } from "@/components/LoadingProvider";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ScrollView, View } from "react-native";

// This is the level setup
export default function Levels() {
    const context = useContext();

    return (
        <View className="flex-grow w-full">
            <ScrollView contentContainerClassName="p-28 gap-28 items-center grid grid-cols-2">
                {[...context.levels.keys()].map((l) => <LevelNode level={l} key={`level-${l}`} />)}
            </ScrollView>
            <Link href="/" className="p-2 absolute left-4 top-8 mt-4">
                <Ionicons name="arrow-back" size={24} className="text-light-100" />
            </Link>
        </View>
    )
}