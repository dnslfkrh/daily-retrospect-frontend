import { useEffect, useState } from "react";
import { fetchSession } from "../../../shared/services/fetchSession";
import { AnswerMapProps } from "../types/answer-map";
import { RetrospectSessionProps } from "../types/session";
import { BaseAnswerProps } from "@/shared/types/answer";

export const useRetrospectSession = () => {
  const [session, setSession] = useState<RetrospectSessionProps | null>(null);
  const [answers, setAnswers] = useState<AnswerMapProps>({});

  useEffect(() => {
    const loadSession = async () => {
      const data: RetrospectSessionProps = await fetchSession();
      setSession(data);

      const initialAnswers: AnswerMapProps = data.questions.reduce((acc, question, index) => {
        const matchingAnswer: BaseAnswerProps | undefined = data.answers?.[index];
        acc[question.id] = matchingAnswer?.answer || "";
        return acc;
      }, {} as AnswerMapProps);

      setAnswers(initialAnswers);
    };

    loadSession();
  }, []);

  return { session, answers, setAnswers };
};
