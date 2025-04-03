
// 나중에 다국어 지원을 위해 i18n으로 관리할 예정
// 나중에 설정 필요
export const feedbackMessages = {
  low: [
    "목표가 너무 어려운 건 아닐까요?",
    "요즘 다른 바쁜 일이 있나요?",
    "목표 설정 방식을 다시 고민해볼까요?"
  ],
  mid: [
    "목표 진행이 안정적이네요!",
    "조금 더 도전적인 목표를 설정해볼까요?",
    "목표 난이도를 조정해도 좋을 것 같아요."
  ],
  high: [
    "목표를 잘 달성하고 있어요!",
    "더 과감한 목표를 설정해도 좋을 것 같아요.",
    "너무 쉬운 것만 목표하는 것도 지루하지 않나요?"
  ],
  perfect: ["완벽한 목표 달성이네요!"]
};

export const getFeedback = (averageScore: number): string[] => {
  if (averageScore <= 3) {
    return feedbackMessages.low;
  }
  if (averageScore <= 6) {
    return feedbackMessages.mid;
  }
  if (averageScore <= 9) {
    return feedbackMessages.high;
  }
  return feedbackMessages.perfect;
};
