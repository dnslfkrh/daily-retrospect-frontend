import React, { useEffect, useRef } from "react";

const TextAnswer = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="..."
      rows={3}
      className="mt-2 w-full max-w-lg mx-auto p-2 border rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
      style={{ minHeight: "6rem", maxHeight: "200px", overflowY: "auto" }}
    />
  );
};

export default TextAnswer;
