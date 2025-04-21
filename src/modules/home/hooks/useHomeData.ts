import { useEffect, useState } from "react";
import { fetchSession } from "@/shared/services/fetchSession";
import { fetchActivatedGoals } from "@/shared/services/fetchActivatedGoals";
import { fetchRetrospectDates } from "@/shared/services/fetchRetrospectDates";
import { fetchGetGoalScores } from "@/shared/services/fetchGetGoalScores";
import { fetchLastSummary } from "../services/fetchLastSummary";
import { GoalEvaluationPeriod } from "@/shared/enums/goalEvaluation";
import { GoalScoreProps } from "@/modules/graph/types/goal-score";
import { SessionData } from "../types/session-date.type";
import { Goal } from "../types/goal.type";
import { fetchNumberOfImages } from "../services/fetchNumberOfImages";

export const useHomeData = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<SessionData | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [retrospectDates, setRetrospectDates] = useState<string[]>([]);
  const [goalScores, setGoalScores] = useState<GoalScoreProps[]>([]);
  const [lastSummary, setLastSummary] = useState<string>("");
  const [numberOfImages, setNumberOfImages] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sessionData, goalsData, datesData, scoresData, summaryData, numberOfImagesData] = await Promise.all(
          [
            fetchSession(),
            fetchActivatedGoals(),
            fetchRetrospectDates(),
            fetchGetGoalScores(GoalEvaluationPeriod.OneMonth),
            fetchLastSummary(),
            fetchNumberOfImages(),
          ]
        );

        setSession(sessionData);
        setGoals(goalsData);
        setRetrospectDates(datesData);
        setGoalScores(scoresData);
        setLastSummary(summaryData);
        setNumberOfImages(numberOfImagesData);
      } catch (error) {
        console.error("HomeScreen fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    loading,
    session,
    goals,
    retrospectDates,
    goalScores,
    lastSummary,
    numberOfImages
  };
};
