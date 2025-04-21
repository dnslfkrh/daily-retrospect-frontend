"use client";

import React, { useState, useEffect, useRef } from "react";
import { fetchGalleryImages } from "../services/fetchImages";

const GalleryScreen = () => {
  const [images, setImages] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [flippedIndexes, setFlippedIndexes] = useState<Set<number>>(new Set());
  const [canLoadMore, setCanLoadMore] = useState(true);
  const lastLoadTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const loadImages = async () => {
      if (!canLoadMore) {
        return;
      }

      setLoading(true);
      const galleryImages = await fetchGalleryImages(page);

      if (galleryImages.length === 0) {
        setCanLoadMore(false);
      } else {
        setImages((prevImages) => [...prevImages, ...galleryImages]);
      }

      setLoading(false);
      lastLoadTimeRef.current = Date.now();
    };

    loadImages();
  }, [page, canLoadMore]);

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const bottom = target.scrollHeight - target.scrollTop <= target.clientHeight * 1.5;

    const now = Date.now();
    const canLoadNow = now - lastLoadTimeRef.current > 800;

    if (bottom && !loading && canLoadNow && canLoadMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleFlip = (index: number) => {
    setFlippedIndexes((prev) => {
      const newFlippedIndexes = new Set(prev);
      if (newFlippedIndexes.has(index)) {
        newFlippedIndexes.delete(index);
      } else {
        newFlippedIndexes.add(index);
      }
      return newFlippedIndexes;
    });
  };

  return (
    <div onScroll={handleScroll} className="gallery-container" style={{ height: "100vh", overflowY: "auto" }}>
      <h1 className="text-xl font-bold text-center mb-6">갤러리</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 px-4">
        {images.map((image, index) => (
          <div key={index} className="relative cursor-pointer overflow-hidden" onClick={() => handleFlip(index)}>
            <div
              className="w-full"
              style={{ perspective: "1000px" }}
            >
              <div
                className="relative w-full"
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 0.4s ease-in-out",
                  transform: flippedIndexes.has(index) ? "rotateY(180deg)" : "rotateY(0deg)"
                }}
              >
                <img
                  src={image.imageData}
                  alt="placeholder"
                  className="w-full"
                  style={{ visibility: 'hidden', height: 'auto' }}
                />

                <div
                  className="absolute w-full h-full top-0 left-0"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={image.imageData}
                    alt="Gallery image"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div
                  className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                  }}
                >
                  <p className="text-lg font-semibold mb-2">{image.date}</p>
                  <p className="text-center">{image.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && <p className="text-center py-4">이미지 확인하는 중..</p>}
      {!canLoadMore && images.length > 0 && <p className="text-center py-4">마지막 이미지</p>}
    </div>
  );
};

export default GalleryScreen;