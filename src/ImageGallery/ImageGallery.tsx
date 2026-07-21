import { Image } from "../data";
import { useImages } from "./useImages";
import ImageButton from "./ImageButton";
import { useState } from "react";
import ImageDialog from "./ImageDialog";
import { gridClassname } from "./styles";
import GallerySkeleton from "./GallerySkeleton";

export default function ImageGallery() {
  const { data: images, isLoading, isError } = useImages();

  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  if (isLoading) return <GallerySkeleton />;
  if (isError) return <p>Failed to load images.</p>;

  return (
    <>
      <div className={gridClassname}>
        {images?.map((image) => (
          <ImageButton
            key={image.id}
            image={image}
            handleClick={() => setSelectedImage(image)}
          />
        ))}
      </div>

      {images?.length === 0 && <div>No images.</div>}

      {selectedImage && (
        <ImageDialog
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}
