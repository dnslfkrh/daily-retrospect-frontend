"use client";

export const NextButton = ({ onClick, disabled, text }: { onClick: () => void; disabled: boolean; text: string }) => (
  <button
    className="mt-4 px-6 py-2 bg-gray-800 text-white text-lg font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);