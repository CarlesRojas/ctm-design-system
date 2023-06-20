import { Label } from "@design/tokens/typography";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "../errorMessage";
import s from "./input.module.scss";

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  label?: string;
  errorMessage?: string;
  success?: boolean;
  register?: UseFormRegisterReturn;
  isDisabled?: boolean;
  darkMode?: boolean;
  overWhite?: boolean;
}

const Input = ({
  id,
  label,
  errorMessage,
  success,
  register,
  isDisabled,
  darkMode,
  overWhite,
  ...rest
}: InputProps) => {
  return (
    <div
      className={`${s.input} ${isDisabled ? s.disabled : ""} ${darkMode ? s.darkMode : ""} ${
        overWhite ? s.overWhite : ""
      }`}
    >
      {label && (
        <Label htmlFor={id} darkMode={darkMode}>
          {label}
        </Label>
      )}

      <input
        id={id}
        key={id}
        className={`${errorMessage ? s.error : ""} ${success ? s.success : ""}`}
        data-testid={`input_${id}`}
        disabled={isDisabled}
        {...rest}
        {...register}
      />

      {errorMessage && <ErrorMessage id={id} message={errorMessage} darkMode={darkMode} />}
    </div>
  );
};

export default Input;
