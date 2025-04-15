import { X } from "lucide-react";
import { ImageData } from "../types/image-data.type";
import { ImageSlideProps } from "../types/image-slide.type";

const ImageSlide = ({ image, onRemove, onChangeDesc }: ImageSlideProps) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative w-full max-w-sm aspect-[4/5] bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden mb-8">
        <img
          src={image.url}
          className="w-full h-full object-contain"
          alt="uploaded"
        />
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 bg-white dark:bg-gray-200 p-1 rounded-full shadow hover:bg-red-100 transition"
        >
          <X size={20} className="text-red-500" />
        </button>
      </div>

      <textarea
        className="w-full max-w-sm p-2 text-sm border rounded-md dark:bg-gray-700 dark:text-white mb-4"
        placeholder="이미지 설명"
        value={image.description}
        onChange={(e) => onChangeDesc(e.target.value)}
      />
    </div>
  );
};

export default ImageSlide;