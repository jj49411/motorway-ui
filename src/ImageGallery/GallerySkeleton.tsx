import { css } from "@emotion/css";
import { gridClassname } from "./styles";

const cardClassname = css`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: lightgrey;
`;

export default function GallerySkeleton() {
  const placeholders = Array.from({ length: 12 });

  return (
    <div className={gridClassname}>
      {placeholders.map((_, idx) => (
        <div key={idx} className={cardClassname}></div>
      ))}
    </div>
  );
}
