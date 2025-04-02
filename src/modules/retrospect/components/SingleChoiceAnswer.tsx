import React from "react";

const choiceOptions: { [key: string]: string[] } = {
  "오늘의 날씨는?": ["☀️", "🌤️", "⛈️", "❄️"],
  "지금 나의 컨디션은?": ["💪", "😐", "😴", "🤒"],
  "오늘 나의 기분은?": ["😀", "😢", "😡", "😌"],
};

const emojiKeywordMap: { [key: string]: { [emoji: string]: string } } = {
  "오늘의 날씨는?": { "☀️": "sunny", "🌤️": "partly_sunny", "⛈️": "thunderstorm", "❄️": "snow" },
  "지금 나의 컨디션은?": { "💪": "strong", "😐": "neutral", "😴": "sleepy", "🤒": "sick" },
  "오늘 나의 기분은?": { "😀": "happy", "😢": "sad", "😡": "angry", "😌": "calm" },
};

const getEmojiFromKeyword = (question: string, keyword: string): string => {
  const map = emojiKeywordMap[question] || {};
  return Object.keys(map).find((emoji) => map[emoji] === keyword) || keyword;
};

const getKeywordFromEmoji = (question: string, emoji: string): string => {
  return emojiKeywordMap[question]?.[emoji] || emoji;
};

const SingleChoiceAnswer = ({
  question,
  value,
  onSelect,
}: {
  question: string;
  value?: string;
  onSelect: (v: string) => void;
}) => {
  const options = choiceOptions[question] || ["✅", "❌"];

  return (
    <div className="flex justify-center space-x-2">
      {options.map((emoji) => (
        <button
          key={emoji}
          className={`p-3 border rounded transition-all text-3xl ${value === getKeywordFromEmoji(question, emoji)
            ? "bg-black text-white dark:bg-gray-700 dark:text-white border-gray-600"
            : "bg-white text-black dark:bg-gray-800 dark:text-gray-300 border-gray-600"
            }`}
          onClick={() => onSelect(getKeywordFromEmoji(question, emoji))}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default SingleChoiceAnswer;
