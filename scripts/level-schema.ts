import { ImageSourcePropType } from 'react-native';

export const LevelChoiceModes = ['multiple-choice', 'drag-and-drop'] as const;
export interface Level {
  id: number;
  questions: Question[];
  completed: boolean;
}

export interface Question {
  image: ImageSourcePropType;
  label: string;
  choices: string[];
  correct: number;
  completed: boolean;
  hint: string;
}