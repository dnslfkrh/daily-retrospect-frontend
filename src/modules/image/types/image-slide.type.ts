import { ImageData } from "./image-data.type";

export interface ImageSlideProps {
  image: ImageData;
  onRemove: () => void;
  onChangeDesc: (desc: string) => void;
};
