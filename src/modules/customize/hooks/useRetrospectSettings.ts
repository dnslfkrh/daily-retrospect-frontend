import { useState, useEffect } from "react";
import { fetchRetrospectSetting } from "../services/fetchRetroSpectSetting";
import { RetrospectConcept, RetrospectVolume } from "../enums/enums";

export const useRetrospectSettings = () => {
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

  return {
    selectedConcept,
    setSelectedConcept,
    selectedVolume,
    setSelectedVolume,
    loading,
  };
};
