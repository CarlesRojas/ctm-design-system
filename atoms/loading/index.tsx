import { DetailedHTMLProps, HTMLAttributes } from "react";
import { RiLoader4Fill } from "react-icons/ri";
import s from "./loading.module.scss";

export type LoadingProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Loading = ({ className, ...props }: LoadingProps) => {
  return (
    <div {...props} className={`${s.loading} ${className}`} data-testid="loading">
      <RiLoader4Fill />
    </div>
  );
};

export default Loading;
