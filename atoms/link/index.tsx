import NextLink from "next/link";
import s from "./link.module.scss";

export interface LinkProps {
  id: string;
  children: React.ReactNode;
  href: string;
  fullWidth?: boolean;
  className?: string;
}

const Link = ({ id, href, children, fullWidth, className, ...rest }: LinkProps) => {
  return (
    <NextLink
      href={href}
      data-testid={`link_${id}`}
      {...rest}
      className={`${s.link} ${className}  ${fullWidth ? s.fullWidth : ""}`}
    >
      {children}
    </NextLink>
  );
};

export default Link;
