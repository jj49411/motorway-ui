import { css } from "@emotion/css";
import { Image } from "../data";
import { useImages } from "./useImages";
import ImageButton from "./ImageButton";
import { useState } from "react";
import ImageDialog from "./ImageDialog";

const gridClassname = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 8px;
`;

export default function ImageGallery() {
  const { data: images, isLoading, isError } = useImages();

  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  if (isLoading) return <p>Loading...</p>; // TODO: skeleton
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
