import { useEffect, useState } from "react";
import { AnswerProps, RetrospectSessionProps } from "../types/Props";
import { fetchSession } from "../services/fetchSession";

type AnswerMap = {
  [questionId: number]: string;
};

export const useRetrospectSession = () => {
  const [session, setSession] = useState<RetrospectSessionProps | null>(null);
  const [answers, setAnswers] = useState<AnswerMap>({});

  useEffect(() => {
    const loadSession = async () => {
      const data: RetrospectSessionProps = await fetchSession();
      setSession(data);

      const initialAnswers: AnswerMap = data.questions.reduce((acc, question, index) => {
        const matchingAnswer: AnswerProps | undefined = data.answers?.[index];
        acc[question.id] = matchingAnswer?.answer || "";
        return acc;
      }, {} as AnswerMap);

      setAnswers(initialAnswers);
    };

    loadSession();
  }, []);

  return { session, answers, setAnswers };
};
