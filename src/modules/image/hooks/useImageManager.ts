import { useState, useEffect } from "react";
import { fetchTodayImages } from "../services/fetchTodayImages";
import { ImageData } from "../../../shared/types/image-data.type";
import { compressImage } from "../utils/compressImage";

export const useImageManager = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [hadExistingImages, setHadExistingImages] = useState(false);
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
          if (data.length > 0) {
            setHadExistingImages(true);
          }
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

  const handleAddImage = async (file: File) => {
    if (images.length >= MAX_IMAGES) return;

    const compressedFile = await compressImage(file);

    const url = URL.createObjectURL(compressedFile);
    setImages((prev) => [...prev, { file: compressedFile, url, description: "", s3_key: "" }]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const updateDescription = (index: number, description: string) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, description } : img))
    );
  };

  return { images, handleAddImage, removeImage, updateDescription, hadExistingImages, setHadExistingImages };
};