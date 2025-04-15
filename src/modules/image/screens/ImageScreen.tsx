"use client";

import { useState } from "react";
import { useImageManager } from "../hooks/useImageManager";
import ImageSwiper from "../components/ImageSwiper";
import { fetchApplyImages } from "../services/fetchApplyImages";
import toast from "react-hot-toast";

const ImageScreen = () => {
  const { images, handleAddImage, removeImage, updateDescription } = useImageManager();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    const uploadImages = images.filter((img) => img.file);
    if (uploadImages.length === 0) return;

    setLoading(true);
    try {
      await fetchApplyImages(uploadImages.map((img) => img.file!));
      toast.success("이미지 저장 완료");
    } catch (error) {
      console.error(error);
      toast.error("이미지 저장 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold mb-12">오늘의 사진첩</h1>
      <ImageSwiper
        images={images}
        onAdd={handleAddImage}
        onRemove={removeImage}
        onChangeDesc={updateDescription}
      />
      <div className="flex justify-center gap-4 mt-6">
        {images.length > 0 && (
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-md text-base font-medium border bg-black text-white hover:bg-gray-800 dark:bg-gray-200 dark:text-black dark:hover:bg-white transition"
          >
            {loading ? "저장 중..." : "저장"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageScreen;
