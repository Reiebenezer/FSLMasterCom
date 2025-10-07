import Button from "@/components/Button";
import { useContext } from "@/components/LoadingProvider";
import { navigate } from "@/scripts/navigation";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function ResetConfirmation() {
  const context = useContext();
  const [allowReset, setAllowReset] = useState(false);

  return (
    <View className="flex-grow items-center justify-center">
      <Text className="font-poppins-bold text-4xl">Reset All Progress</Text>
      <Text className="mt-4 font-poppins">This cannot be undone!</Text>
      <Text className="font-poppins">Are you sure you want to start over?</Text>

      <Text className="mt-8 font-poppins">If you are sure, type 'ISATayo Reset' below:</Text>
      <TextInput className="border border-accent rounded-lg w-full max-w-sm mt-2 text-center font-gi" onChangeText={text => setAllowReset(text === 'ISATayo Reset')} />

      <View className="flex-row gap-4 mt-4">
        <Button onPress={() => {context.resetLevelDatabase(); navigate('/', context)}} disabled={!allowReset}>
          <Text className="text-light-100 font-gi">Yes, delete everything</Text>
        </Button>

        <Button colors={['#2d79df', '#2efdea']} onPress={() => navigate('/', context)}>
          <Text className="text-light-100 font-gi">Cancel</Text>
        </Button>
      </View>
    </View>
  )
}