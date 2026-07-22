import { useEffect, useRef } from "react";
import { Image } from "../data";
import { css } from "@emotion/css";

const imageDialogClassname = css`
  border: none;
  border-radius: 4px;
  padding: 8px;

  ::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const imageClassname = css`
  display: flex;
  max-width: 100%;
  max-height: 90vh;
  margin-top: 8px;
`;

const buttonControlClassname = css`
  display: flex;
  justify-content: space-between;
`;

interface ImageDialogProps {
  image: Image;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function ImageDialog({
  image,
  onClose,
  onPrev,
  onNext,
}: ImageDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal(); // display dialog in the top layer and enable backdrop
  }, [image]);

  function handleClose() {
    dialogRef.current?.close();
    onClose();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight" && onNext) onNext();
    if (e.key === "ArrowLeft" && onPrev) onPrev();
  }

  return (
    <dialog
      ref={dialogRef}
      className={imageDialogClassname}
      onCancel={onClose} // catch the escape key event
      onKeyDown={handleKeyDown}
    >
      <div className={buttonControlClassname}>
        <button onClick={handleClose}>Close</button>

        <div>
          <button onClick={onPrev} disabled={!onPrev}>
            Prev
          </button>
          <button onClick={onNext} disabled={!onNext}>
            Next
          </button>
        </div>
      </div>

      <img
        src={`${image.url}.jpg`}
        alt="full size image"
        className={imageClassname}
      />
    </dialog>
  );
}
