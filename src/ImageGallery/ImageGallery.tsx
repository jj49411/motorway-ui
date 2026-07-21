import { css } from "@emotion/css";
import { Image as ImageType } from "../data";
import { useImages } from "./useImages";

const gridClassname = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 8px;
`;

const imageClassname = css`
  aspect-ratio: 1 / 1;
  object-fit: cover;
  width: 100%;
`;

export default function ImageGallery() {
  const { data: images, isLoading, isError } = useImages();

  if (isLoading) return <p>Loading...</p>; // TODO: skeleton
  if (isError) return <p>Failed to load images.</p>;

  return (
    <div className={gridClassname}>
      {images?.map((image) => (
        <Image key={image.id} image={image} />
      ))}
    </div>
  );
}

interface ImageProps {
  image: ImageType;
}

function Image({ image }: ImageProps) {
  const webpUrl = `${image.url}.webp`;
  const jpgUrl = `${image.url}.jpg`;

  return (
    // prioritise webp and fall back to jpg
    <picture>
      <source srcSet={webpUrl} type="image/webp" />
      <img
        src={jpgUrl}
        alt={image.alt_description || "car image"}
        loading="lazy"
        className={imageClassname}
      />
    </picture>
  );
}
