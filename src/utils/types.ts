export interface IQuestion {
  id: number;
  question: string;
  answers: string[];
  correctAnswers: number[];
}

export interface IData {
  questions: IQuestion[];
  testTime: number;
}

export interface IAnswerItemProps {
  currentQuestion: number;
  answer: string;
  id: number;
  onChange: () => void;
  type: 'radio' | 'checkbox';
}
