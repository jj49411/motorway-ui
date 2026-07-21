import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { fieldWrapperClassname } from "./styles";

interface StringFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
}

export function StringField({
  id,
  label,
  registration,
  ...props
}: StringFieldProps) {
  return (
    <div className={fieldWrapperClassname}>
      <label htmlFor={id}>{label}</label>

      <input id={id} {...props} {...registration} />
    </div>
  );
}
