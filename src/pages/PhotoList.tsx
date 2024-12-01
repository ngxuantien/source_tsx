import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Photo } from "../interfaces/photo";
import { axiosClient } from "../configs/axios";
import { DEFAULT_PER_PAGE } from "../constants/common";
import { ThreeDot } from "react-loading-indicators";

const PhotoList = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1); // To keep track of current page
  const [loading, setLoading] = useState(false); // To manage loading state

  // Ref to observe the bottom of the photo list
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/photos", {
          params: {
            page,
            per_page: DEFAULT_PER_PAGE,
          },
        });
        setPhotos((prevPhotos) => [...prevPhotos, ...response.data]); // Append new photos to the list
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [page]);

  // Callback for the IntersectionObserver
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        setPage((prevPage) => prevPage + 1); // Load the next page
      }
    },
    [loading]
  );

  // Set up the IntersectionObserver when the component mounts
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null, // Observe scrolling in the viewport
      rootMargin: "20px", // Trigger slightly before reaching the bottom
      threshold: 1.0, // Trigger when the element is fully visible
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current); // Clean up observer
      }
    };
  }, [handleObserver]);

  return (
    <div>
      <div className="flex flex-wrap">
        {photos.map((photo) => (
          <div key={photo.id} className="m-[10px] text-center">
            <Link to={`/photos/${photo.id}`}>
              <img
                src={photo.urls.thumb}
                alt={photo.alt_description}
                className="rounded w-[200px]"
              />
            </Link>
            <p className="text-sm">
              <span className="text-xs">By: </span>
              <span className="font-semibold">{photo.user.name}</span>
            </p>
          </div>
        ))}
      </div>
      {/* Observer div at the bottom of the list */}
      <div ref={observerRef} className="h-5 text-center">
        {loading && <ThreeDot size="medium" color="#00b7ff" />}
      </div>
    </div>
  );
};

export default PhotoList;
