import { useState, useEffect } from "react";
import { fetchTodayImages } from "../services/fetchTodayImages";
import { ImageData } from "../types/image-data.type";
import { useLoadingStore } from "@/common/store/ui/useLoading.store";

export const useImageManager = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const MAX_IMAGES = 3;

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await fetchTodayImages();
        if (isMounted) {
          setImages(
            data.map((item) => ({
              file: item.file,
              url: item.imageData,
              description: item.description,
              s3_key: item.s3_key,
            }))
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddImage = (file: File) => {
    if (images.length >= MAX_IMAGES) return;
    const url = URL.createObjectURL(file);
    setImages((prev) => [...prev, { file, url, description: "", s3_key: "" }]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const updateDescription = (index: number, description: string) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, description } : img))
    );
  };

  return { images, handleAddImage, removeImage, updateDescription };
};