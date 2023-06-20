import { Caption } from "@design/tokens/typography";
import s from "./successMessage.module.scss";

export interface SuccessMessageProps {
  id: string;
  message: string;
  darkMode?: boolean;
  hidden?: boolean;
  className?: string;
}

const SuccessMessage = ({ id, message, darkMode, hidden, className }: SuccessMessageProps) => {
  return (
    <Caption
      className={`${s.successMessage} ${darkMode ? s.darkMode : ""} ${hidden ? s.hidden : ""} ${className}`}
      data-testid={`success_${id}`}
    >
      {message}
    </Caption>
  );
};

export default SuccessMessage;
