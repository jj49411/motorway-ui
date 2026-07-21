import { useEffect, useRef } from "react";
import { Image } from "../data";
import { css } from "@emotion/css";

const imageDialogClassname = css`
  border: none;
  border-radius: 4px;
  padding: 8px;
`;

const imageClassname = css`
  display: flex;
  max-width: 100%;
  max-height: 90vh;
  margin-top: 8px;
`;

interface ImageDialogProps {
  image: Image;
  onClose: () => void;
}

export default function ImageDialog({ image, onClose }: ImageDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, [image]);

  function handleClose() {
    dialogRef.current?.close();
    onClose();
  }

  return (
    <dialog ref={dialogRef} className={imageDialogClassname} onCancel={onClose}>
      <button onClick={handleClose}>Close</button>

      <img
        src={`${image.url}.jpg`}
        alt="full size image"
        className={imageClassname}
      />
    </dialog>
  );
}
