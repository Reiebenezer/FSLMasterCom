import { navigate } from "@/scripts/navigation";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import Button from "../Button";
import { useContext } from "../LoadingProvider";


export default function LevelNode({ level }: { level: number }) {
  const context = useContext();
  const levelData = context.levels.get(level);

  if (!levelData) return;

  const locked = !levelData.completed && !context.levels.get(level - 1)?.completed && level > 1;
  const colors: LinearGradient['props']['colors'] =
    locked
      ? ['#efefef', '#cccccc']
      : levelData.completed
        ? ['#FB4B4E', '#7C0B2B']
        : ['#2d79df', '#2efdea'];

  return (
    <Button
      className={`size-48 rounded-3xl group`}
      gradientClassName="justify-center h-full"
      onPress={() => navigate({ pathname: '/level/[level]', params: { level } }, context)}
      disabled={locked}
      colors={colors}
    >
      <Text className="text-6xl font-poppins text-center text-light-100 group-disabled:text-gray-500">{level}</Text>
    </Button>
  )
}