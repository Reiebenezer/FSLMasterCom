import BackButton from "@/components/BackButton";
import { useContext } from "@/components/LoadingProvider";
import MultipleChoice from "@/components/test-items/MultipleChoice";
import assets from "@/scripts/asset-manager";
import { Question } from "@/scripts/level-schema";
import { navigate } from "@/scripts/navigation";
import { useState } from "react";
import { Image, Text, View } from "react-native";

const questions = [
  {
    image: assets.letters.a,
    label: `Let's begin by clicking \nthe button below!`,
    hint: `You can't get this wrong, man.`,
    choices: ['This is the letter A'],
    correct: 0,
  },
  {
    image: assets.letters.b,
    label: `You are given two choices. Choose the one that best represents the gesture above!`,
    hint: `It's the letter B`,
    choices: [`The letter A`, `The letter B`],
    correct: 1,
  }
].map<Question>(q => ({ ...q, completed: false }));

export default function Tutorial() {
  const context = useContext();
  const [questionIdx, setQuestionIndex] = useState(0);
  const [hint, setHint] = useState('');

  function onGuess(isCorrectAnswer: boolean) {
    if (isCorrectAnswer)
      questions[questionIdx].completed = true;

    else {
      setHint(questions[questionIdx].hint);
      return;
    }

    if (questionIdx < questions.length - 1)
      setQuestionIndex(questionIdx + 1);

    else {
      navigate(
        `/level/summary?level=tutorial&correct=${questions.filter(q => q.completed).join(',')
        }&incorrect=${questions.filter(q => !q.completed).join(',')
        }`, context);
    }
  }

  return (
    <View className="grow items-center justify-center p-6">
      <BackButton />
      <Text className="text-5xl font-poppins-bold text-primary">TUTORIAL</Text>
      <Text className="text-lg text-center mt-8 font-poppins">
        Welcome to <Text className="inline font-poppins-bold">ISATayo!</Text>
      </Text>
      <Text className="font-poppins text-center text-pretty mt-2 max-w-[80%]">This app will help you learn sign language in the easiest way!</Text>

      <Image source={questions[questionIdx].image} className="size-48 my-4" style={{ resizeMode: 'contain' }} />
      <Text className="font-poppins text-center text-pretty mt-2 max-w-[80%]">{questions[questionIdx].label}</Text>

      <View className="w-full max-w-md flex flex-wrap flex-row justify-center gap-2 rounded-lg p-4 mt-6">
        {questions[questionIdx].choices.map((choice, i) => (
          <MultipleChoice key={`choice-${questionIdx}-${i}`} isCorrectAnswer={i === questions[questionIdx].correct} onGuess={onGuess}>
            <Text className="font-gi text-lg text-light-100">{choice}</Text>
          </MultipleChoice>
        ))}
      </View>
      <Text className="text-red-600 text-sm">{hint && `Hint: ${hint}`}</Text>
    </View>
  );
}