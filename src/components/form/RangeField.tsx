import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { fieldWrapperClassname } from "./styles";

interface RangeFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  min: string | number;
  max: string | number;
  currentValue: number | string;
  registration: UseFormRegisterReturn;
}

export function RangeField({
  id,
  label,
  min,
  max,
  currentValue,
  registration,
  ...props
}: RangeFieldProps) {
  return (
    <div className={fieldWrapperClassname}>
      <label htmlFor={id}>
        {label}: {currentValue}
      </label>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        {...props}
        {...registration}
      />
    </div>
  );
}
