import { subWeeks, subMonths, isWithinInterval, getMonth } from "date-fns";
import { GoalEvaluationPeriod } from "../../../shared/enums/goalEvaluation";
import { GoalScoreProps } from "../types/goal-score";

export const processScoresForChart = (
  rawData: GoalScoreProps[],
  period: GoalEvaluationPeriod
) => {
  // 키를 string으로 선언
  const aggregatedScores: { [key: string]: { sum: number; count: number } } = {};
  const allScores: number[] = [];
  const currentDate = new Date();

  // 기간별 필터링 기준 계산
  const fourWeeksAgo = subWeeks(currentDate, 4);
  const threeMonthsAgo = subMonths(currentDate, 3);
  const sixMonthsAgo = subMonths(currentDate, 6);

  rawData.forEach((item) => {
    const date = new Date(item.created_at);

    // 기간 필터링
    if (
      (period === GoalEvaluationPeriod.OneMonth && !isWithinInterval(date, { start: fourWeeksAgo, end: currentDate })) ||
      (period === GoalEvaluationPeriod.ThreeMonths && !isWithinInterval(date, { start: threeMonthsAgo, end: currentDate })) ||
      (period === GoalEvaluationPeriod.SixMonths && !isWithinInterval(date, { start: sixMonthsAgo, end: currentDate }))
    ) {
      return;
    }

    const answer = item.answer;
    if (!isNaN(answer)) allScores.push(answer);

    let key = "";
    switch (period) {
      case GoalEvaluationPeriod.OneMonth:
        // 최근 4주를 1주, 2주, 3주, 4주로 매핑
        const weekIndex = Math.floor((currentDate.getTime() - date.getTime()) / (7 * 24 * 60 * 60 * 1000));
        key = (4 - weekIndex).toString(); // 4주 전부터 현재까지 1, 2, 3, 4로 매핑
        break;
      case GoalEvaluationPeriod.ThreeMonths:
      case GoalEvaluationPeriod.SixMonths:
        // 월 단위로 매핑
        key = `${date.getFullYear()}-${getMonth(date) + 1}`; // "년도-월" 형식
        break;
      default:
        break;
    }

    if (key) {
      if (!aggregatedScores[key]) aggregatedScores[key] = { sum: 0, count: 0 };
      aggregatedScores[key].sum += answer;
      aggregatedScores[key].count += 1;
    }
  });

  let labels: string[] = [];
  let data: number[] = [];

  if (period === GoalEvaluationPeriod.OneMonth) {
    // 1개월: "1주, 2주, 3주, 4주" 레이블
    labels = ["1주", "2주", "3주", "4주"];
    data = [0, 0, 0, 0];    // 데이터 매핑
    Object.keys(aggregatedScores).forEach((key) => {
      const index = parseInt(key, 10) - 1; // 문자열 키를 숫자로 변환
      if (index >= 0 && index < 4) {
        data[index] = aggregatedScores[key].count > 0 ? 
          aggregatedScores[key].sum / aggregatedScores[key].count : 0;
      }
    });
  } else {
    // 3개월, 6개월: 월 단위 레이블
    const sortedKeys = Object.keys(aggregatedScores).sort((a, b) => a.localeCompare(b));
    labels = sortedKeys.map((key) => {
      const [year, month] = key.split("-");
      return `${parseInt(month, 10)}월`; // "월" 형식
    });
    data = sortedKeys.map((key) => (
      aggregatedScores[key].count > 0 ? 
        aggregatedScores[key].sum / aggregatedScores[key].count : 0
    ));
  }

  const sumOfScores = allScores.reduce((sum, score) => sum + score, 0);
  const averageScore = allScores.length ? sumOfScores / allScores.length : 0;

  return { chartData: { labels, data }, averageScore };
};