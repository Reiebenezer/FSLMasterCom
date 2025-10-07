import { useAudioPlayer } from 'expo-audio';
import React, { useState } from "react";
import { ColorValue } from "react-native";
import Button from "../Button";

interface MultipleChoiceProps {
  isCorrectAnswer: boolean;
  onGuess: (answer: boolean) => void;
  children: React.ReactNode
}

export default function MultipleChoice({ isCorrectAnswer, onGuess, children }: MultipleChoiceProps) {
  const [gradientColors, setGradientColors] = useState<[ColorValue, ColorValue, ...ColorValue[]]>(); // red is incorrect, green is correct
  const correctSfx = useAudioPlayer(require('@/assets/correct-sfx.mp3'));
  const wrongSfx = useAudioPlayer(require('@/assets/wrong-sfx.mp3'));

  correctSfx.volume = 0.8;
  wrongSfx.volume = 0.5;

  function onPress() {
    (isCorrectAnswer
      ? correctSfx
      : wrongSfx
    ).play();

    setGradientColors(
      isCorrectAnswer
        ? ['#2d79df', '#2efdea']
        : ['#FB4B4E', '#7C0B2B']);

    setTimeout(() => onGuess(isCorrectAnswer), 800);
  }

  return (
    <Button colors={gradientColors} onPress={onPress}>
      {children}
    </Button>
  )
}