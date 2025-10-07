import BackButton from "@/components/BackButton";
import { useContext } from "@/components/LoadingProvider";
import MultipleChoice from "@/components/test-items/MultipleChoice";
import { navigate } from "@/scripts/navigation";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Image, Text, View } from "react-native";

export default function Level() {
  const { level } = useLocalSearchParams();
  const context = useContext();

  debugger;

  const levelData = context.levels.get(parseInt(level as string));
  if (!levelData) return;

  const [questionIdx, setQuestionIndex] = useState(0);
  const [hint, setHint] = useState('');

  const questions = useMemo(() => levelData.questions.sort(() => Math.random() - 0.5), [level]);

  const onGuess = (isCorrectAnswer: boolean) => {
    if (isCorrectAnswer)
      questions[questionIdx].completed = true;

    // else {
    //   setHint(questions[questionIdx].hint);
    //   return;
    // }

    if (questionIdx < questions.length - 1)
      setQuestionIndex(questionIdx + 1);

    else {
      navigate(
        `/level/summary?level=${level}&correct=${questions.filter(q => q.completed).join(',')
        }&incorrect=${questions.filter(q => !q.completed).join(',')
        }`, context);
    }
  }

  return (
    <View className="grow items-center justify-center p-6">
      <BackButton />
      <Text className="text-4xl font-poppins-bold text-primary">LEVEL {level}</Text>

      <Image source={questions[questionIdx].image} alt={"Image-not-found"} className="size-48 mt-4" style={{ resizeMode: 'contain' }} />
      <Text className="text-center text-pretty mt-2 max-w-[80%] font-poppins">{questions[questionIdx].label}</Text>

      <View className="w-full max-w-md flex flex-wrap flex-row justify-center gap-2 rounded-lg p-4 mt-6">
        {questions[questionIdx].choices.map((choice, i) => (
          <MultipleChoice key={`choice-${questionIdx}-${i}`} isCorrectAnswer={i === questions[questionIdx].correct} onGuess={onGuess}>
            <Text className="text-light-100 font-gi">{choice}</Text>
          </MultipleChoice>
        ))}
      </View>
      <Text className="text-red-600 text-sm">{hint && `Hint: ${hint}`}</Text>
    </View>
  );
}