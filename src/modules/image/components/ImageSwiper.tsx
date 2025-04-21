import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ImageSlide from "./ImageSlide";
import { ImageData } from "../../../shared/types/image-data.type";
import { Plus } from "lucide-react";

type Props = {
  images: ImageData[];
  onAdd: (file: File) => void;
  onRemove: (index: number) => void;
  onChangeDesc: (index: number, desc: string) => void;
};

const ImageSwiper = ({ images, onAdd, onRemove, onChangeDesc }: Props) => {
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onAdd(file);
    e.target.value = "";
  };

  const canAddMore = images.length < 3;

  return (
    <div className="w-full max-w-md mx-auto mb-4">
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <ImageSlide
              image={img}
              onRemove={() => onRemove(idx)}
              onChangeDesc={(desc) => onChangeDesc(idx, desc)}
            />
          </SwiperSlide>
        ))}

        {canAddMore && (
          <SwiperSlide key="add">
            <div className="flex flex-col items-center space-y-2">
              <label className="relative w-full max-w-sm aspect-[4/5] bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                <Plus className="w-10 h-10 text-gray-500 dark:text-gray-300" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAddImage}
                  className="hidden"
                />
              </label>
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      <div className="custom-pagination flex justify-center mt-2 space-x-2"></div>

      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background-color: gray;
          opacity: 0.5;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background-color: #333;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default ImageSwiper;
