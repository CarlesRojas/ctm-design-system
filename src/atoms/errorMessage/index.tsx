import { Caption } from "@design/tokens/typography";
import s from "./errorMessage.module.scss";

export interface ErrorMessageProps {
  id: string;
  message: string;
  darkMode?: boolean;
  hidden?: boolean;
  className?: string;
}

const ErrorMessage = ({ id, message, darkMode, hidden, className }: ErrorMessageProps) => {
  return (
    <Caption
      className={`${s.errorMessage} ${darkMode ? s.darkMode : ""} ${hidden ? s.hidden : ""} ${className}`}
      data-testid={`error_${id}`}
    >
      {message}
    </Caption>
  );
};

export default ErrorMessage;
