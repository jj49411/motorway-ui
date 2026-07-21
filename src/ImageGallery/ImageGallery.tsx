import { useImages } from "./useImages";

export default function ImageGallery() {
  const { data: images, isLoading, isError } = useImages();

  return (
    <div>
      {images?.map((image) => (
        <div key={image.id}>{image.id}</div>
      ))}
    </div>
  );
}
