import { css } from "@emotion/css";
import { Image as ImageType } from "../data";

const imageButtonClassname = css`
  background: transparent;
  border: none;
`;

const imageClassname = css`
  aspect-ratio: 1 / 1;
  object-fit: cover;
  width: 100%;
  cursor: pointer;
  transition: transform 0.3s ease;

  :hover {
    transform: scale(1.03);
  }
`;

interface ImageButtonProps {
  image: ImageType;
  handleClick: () => void;
}

export default function ImageButton({ image, handleClick }: ImageButtonProps) {
  return (
    <button
      key={image.id}
      onClick={handleClick}
      className={imageButtonClassname}
    >
      <Image image={image} />
    </button>
  );
}

interface ImageProps {
  image: ImageType;
}

function Image({ image }: ImageProps) {
  const webpUrl = `${image.url}.webp`;
  const jpgUrl = `${image.url}.jpg`;

  return (
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
