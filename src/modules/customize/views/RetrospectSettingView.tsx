"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FullHeightContainer from "@/components/ui/FullHeightContainer";
import { RetrospectConcept, RetrospectVolume } from "../enums/enums";
import { fetchRetrospectSetting } from "../services/fetchRetroSpectSetting";
import { UpdateSettingProps } from "../types/Props";
import { fetchUpdateSetting } from "../services/fetchUpdateSetting";
import { OptionSelector } from "../components/OptionSelector";

const concepts = [
  { label: "Emotional", value: RetrospectConcept.Emotion, description: "기분과 감정 위주로 회고를 작성합니다." },
  { label: "Event", value: RetrospectConcept.Event, description: "사건과 순간 위주로 회고를 작성합니다." },
  { label: "Reflection", value: RetrospectConcept.Reflection, description: "배움과 성찰 위주로 회고를 작성합니다." },
];

const volumes = [
  { label: "Light", value: RetrospectVolume.Light, description: "간단하게 회고를 작성합니다." },
  { label: "Standard", value: RetrospectVolume.Standard, description: "중간 분량의 회고를 작성합니다." },
  { label: "Deep", value: RetrospectVolume.Deep, description: "회고를 자세하게 작성합니다." },
];

export const RetrospectCustomizeView = () => {
  const [selectedConcept, setSelectedConcept] = useState<RetrospectConcept>(RetrospectConcept.Emotion);
  const [selectedVolume, setSelectedVolume] = useState<RetrospectVolume>(RetrospectVolume.Standard);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await fetchRetrospectSetting();
        setSelectedConcept(data.concept);
        setSelectedVolume(data.volume);
      } catch (error) {
        console.error("Error fetching retrospect settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      const settings: UpdateSettingProps = {
        concept: selectedConcept,
        volume: selectedVolume,
      };
      await fetchUpdateSetting(settings);
      alert("설정이 저장되었습니다.");
    } catch (error) {
      alert("설정을 저장하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <FullHeightContainer>
      <motion.div
        className="w-full flex flex-col items-center px-2bg-white dark:bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">로딩 중...</p>
        ) : (
          <div className="w-full max-w-md flex flex-col items-center">
            <h1 className="text-xl font-semibold text-center text-black dark:text-gray-200 w-full mb-2">
              나의 회고 스타일
            </h1>

            {/* 컨셉 선택 */}
            <OptionSelector
              title="회고 컨셉"
              options={concepts}
              selectedOption={selectedConcept}
              setSelectedOption={setSelectedConcept}
            />

            {/* 볼륨 선택 */}
            <OptionSelector
              title="질문 개수"
              options={volumes}
              selectedOption={selectedVolume}
              setSelectedOption={setSelectedVolume}
            />

            {/* 저장 버튼 */}
            <motion.button
              onClick={handleSave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 mb-8 px-6 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              저장
            </motion.button>
          </div>
        )}
      </motion.div>
    </FullHeightContainer>
  );
};