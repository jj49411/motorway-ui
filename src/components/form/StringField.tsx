import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { fieldWrapperClassname } from "./styles";
import { css } from "@emotion/css";

const requiredClassname = css`
  &::after {
    content: " *";
    color: lightcoral;
  }
`;

const errorClassname = css`
  color: #940000;
  font-size: 14px;
`;

interface StringFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
}

export function StringField({
  id,
  label,
  registration,
  error,
  required,
  ...props
}: StringFieldProps) {
  return (
    <div className={fieldWrapperClassname}>
      <label htmlFor={id} className={required ? requiredClassname : undefined}>
        {label}
      </label>

      <input
        id={id}
        required={required}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
        {...registration}
      />

      {error && (
        <span id={`${id}-error`} className={errorClassname} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
