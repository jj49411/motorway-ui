import { useImages } from "./useImages";
import ImageButton from "./ImageButton";
import { useState } from "react";
import ImageDialog from "./ImageDialog";
import { gridClassname } from "./styles";
import GallerySkeleton from "./GallerySkeleton";

export default function ImageGallery() {
  const { data: images, isLoading, isError } = useImages();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedImage =
    selectedIndex !== null && images ? images[selectedIndex] : null;

  if (isLoading) return <GallerySkeleton />;
  if (isError) return <p>Failed to load images.</p>;

  return (
    <>
      <div className={gridClassname}>
        {images?.map((image, index) => (
          <ImageButton
            key={image.id}
            image={image}
            handleClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      {images?.length === 0 && <div>No images.</div>}

      {selectedIndex !== null && selectedImage && (
        <ImageDialog
          image={selectedImage}
          onClose={() => setSelectedIndex(null)}
          onPrev={
            selectedIndex > 0
              ? () => setSelectedIndex(selectedIndex - 1)
              : undefined
          }
          onNext={
            images && selectedIndex < images.length - 1
              ? () => setSelectedIndex(selectedIndex + 1)
              : undefined
          }
        />
      )}
    </>
  );
}
