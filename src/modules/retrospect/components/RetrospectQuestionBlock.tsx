import React from "react";
import TextAnswer from "./TextAnswer";
import ScoreAnswer from "./ScoreAnswer";
import SingleChoiceAnswer from "./SingleChoiceAnswer";
import { AnswerType } from "../enums/retrospect.enum";

type Props = {
  type: AnswerType;
  value: string;
  onChange: (value: string) => void;
  question: string;
};

const RetrospectQuestionBlock = ({ type, value, onChange, question }: Props) => {
  switch (type) {
    case AnswerType.TEXT:
      return <TextAnswer value={value} onChange={onChange} />;
    case AnswerType.SCORE:
      return <ScoreAnswer value={value} onChange={onChange} />;
    case AnswerType.SINGLE_CHOICE:
      return <SingleChoiceAnswer question={question} value={value} onSelect={onChange} />;
    default:
      return null;
  }
};

export default RetrospectQuestionBlock;
