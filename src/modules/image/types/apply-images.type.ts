export interface ApplyImagesProps {
  existingKeys: string[];
  newImages: { s3_key: string; description: string }[];
}