"use client";

import React, { useState, useEffect, useRef } from "react";
import { fetchGalleryImages } from "../services/fetchGalleryImages";

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
      try {
        const galleryImages = await fetchGalleryImages(page);

        if (galleryImages.length === 0) {
          setCanLoadMore(false);
        } else {
          setImages((prevImages) => [...prevImages, ...galleryImages]);
        }
      } catch (error) {
        console.error("Failed to load images:", error);
      } finally {
        setLoading(false);
        lastLoadTimeRef.current = Date.now();
      }
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
      <h1 className="text-2xl font-bold text-center mb-8">갤러리</h1>
      <div className="columns-1 sm:columns-2 md:columns-2 gap-6 px-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="card-container cursor-pointer rounded-lg mb-6 break-inside-avoid inline-block w-full"
            onClick={() => handleFlip(index)}
            style={{
              perspective: "1500px",
            }}
          >
            <div
              className="card relative w-full h-full"
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)",
                transform: flippedIndexes.has(index) ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >

              <div
                className="w-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <img
                  src={image.url}
                  alt="Gallery image"
                  className="w-full h-auto block border-4 border-white rounded-lg"
                />
              </div>

              <div
                className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden shadow-lg"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="w-full h-full flex flex-col justify-center items-center p-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-4 border-gray-200 dark:border-gray-700 rounded-lg">
                  <p className="text-xl font-semibold mb-4">{image.date}</p>
                  <p className="text-center">{image.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && <p className="text-center py-6 text-gray-600 dark:text-gray-300">이미지 불러오는 중..</p>}
      {!canLoadMore && images.length > 0 && <p className="text-center py-6 text-gray-600 dark:text-gray-300">마지막 이미지</p>}
    </div>
  );
};

export default GalleryScreen;