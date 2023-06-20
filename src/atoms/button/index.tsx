import Loading from "@design/atoms/loading";
import { ButtonText } from "@design/tokens/typography";
import { ButtonHTMLAttributes, DetailedHTMLProps, Ref } from "react";
import s from "./button.module.scss";

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  id: string;
  label?: string;
  buttonType?: ButtonType;
  isLoading?: boolean;
  isDisabled?: boolean;
  icon?: JSX.Element;
  iconOnTheRight?: boolean;
  fullWidth?: boolean;
  innerRef?: Ref<HTMLButtonElement>;
  darkMode?: boolean;
}

export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  MINIMAL = "minimal",

  POSITIVE = "positive",
  NEUTRAL = "neutral",
  DESTRUCTIVE = "destructive",
}

const Button = ({
  id,
  label,
  buttonType,
  isLoading,
  isDisabled,
  icon,
  iconOnTheRight,
  fullWidth,
  darkMode,
  innerRef,
  className,
  ...rest
}: ButtonProps) => {
  const typeClass = s[buttonType ?? ButtonType.PRIMARY];

  return (
    <button
      type="submit"
      data-testid={`button_${id}`}
      disabled={isDisabled || isLoading}
      {...rest}
      className={`${typeClass} ${s.button} ${fullWidth ? s.fullWidth : ""} ${darkMode ? s.darkMode : ""} ${
        isLoading ? s.loading : ""
      } ${isDisabled ? s.disabled : ""} ${className}`}
      ref={innerRef}
    >
      {isLoading && <Loading className={s.loadingIcon} />}

      <div className={s.container}>
        {icon && !iconOnTheRight && (
          <div className={s.icon} data-testid={`button_${id}_iconLeft`}>
            {icon}
          </div>
        )}

        {label && <ButtonText className={s.label}>{label}</ButtonText>}

        {icon && iconOnTheRight && (
          <div className={s.icon} data-testid={`button_${id}_iconRight`}>
            {icon}
          </div>
        )}
      </div>
    </button>
  );
};

export default Button;
