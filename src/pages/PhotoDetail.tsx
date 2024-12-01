import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Photo } from "../interfaces/photo";
import { axiosClient } from "../configs/axios";
import { ThreeDot } from "react-loading-indicators";

const PhotoDetail = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState<Photo>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/photos/${id}`);
        setPhoto(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center">
        <ThreeDot size="medium" color="#00b7ff" />;
      </div>
    );
  }

  if (!photo) {
    return <div className="text-center">Photo not found</div>;
  }

  return (
    <div className="mt-2">
      <img
        src={photo.urls.regular}
        alt={photo.alt_description}
        className="rounded w-full h-auto"
      />
      <div className="mt-2">
        <h1 className="font-semibold text-lg">
          {photo.alt_description || "Untitled"}
        </h1>
        <p>
          <span className="text-sm">By: </span>
          <span className="text-sm font-semibold">{photo.user.name}</span>
        </p>
        <p className="text-sm">
          Description: {photo.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default PhotoDetail;
