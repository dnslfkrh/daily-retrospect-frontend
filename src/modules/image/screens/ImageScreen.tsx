"use client";

import { useState } from "react";
import { useImageManager } from "../hooks/useImageManager";
import ImageSwiper from "../components/ImageSwiper";
import toast from "react-hot-toast";
import { fetchGetSignedUrl } from "../services/fetchGetSignedUrl";
import { fetchApplyImages } from "../services/fetchApplyImages";
import { uploadFileToSignedUrl } from "../services/uploadFileToSignedUrl";

const ImageScreen = () => {
  const { images, handleAddImage, removeImage, updateDescription, hadExistingImages, setHadExistingImages } = useImageManager();
  const [isSending, setIsSending] = useState(false);

  const handleSave = async () => {
    const totalImages = images.length;

    if (totalImages === 0 && hadExistingImages) {
      const confirmApply = confirm("오늘의 사진첩을 비우시겠습니까?");
      if (!confirmApply) {
        return;
      }
    }

    if (totalImages === 0 && !hadExistingImages) {
      toast("사진을 추가해 보세요.", { icon: "👀" });
      return;
    }

    setIsSending(true);
    try {
      // 1. 기존 이미지의 정리
      const existingKeys = images
        .filter((img) => img.s3_key)
        .map((img) => img.s3_key)
        .filter((key): key is string => key !== undefined);

      // 2. s3에 이미지 업로드
      const uploadPromises = images
        .filter((img) => img.file)
        .map(async (img) => {
          const signedUrl = await fetchGetSignedUrl();
          console.log("Signed URL:", signedUrl);
          await uploadFileToSignedUrl(signedUrl, img.file!);
          return {
            s3_key: new URL(signedUrl).pathname.substring(1),
            description: img.description,
          };
        });

      const newImages = await Promise.all(uploadPromises);

      // 3. 서버 및 s3 업데이트
      await fetchApplyImages({
        existingKeys,
        newImages,
      });

      setHadExistingImages(true);
      toast.success("사진첩이 저장되었습니다.");
    } catch (error) {
      console.error("Error saving images:", error);
      toast.error("사진 저장에 실패했습니다.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 mt-2">오늘의 사진들</h1>

      <ImageSwiper
        images={images}
        onAdd={handleAddImage}
        onRemove={removeImage}
        onChangeDesc={updateDescription}
      />

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-md text-base font-medium border bg-black text-white hover:bg-gray-800 dark:bg-gray-200 dark:text-black dark:hover:bg-white transition"
        >
          {isSending ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  );
};

export default ImageScreen;