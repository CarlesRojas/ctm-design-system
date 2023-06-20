import React, { AnchorHTMLAttributes, DetailedHTMLProps, HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import s from './typography.module.scss';

interface HeadingProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
  darkMode?: boolean;
}

interface ParagraphProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  children: ReactNode;
  className?: string;
  darkMode?: boolean;
}

interface AnchorProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  children: ReactNode;
  className?: string;
  darkMode?: boolean;
}

interface SmallProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  children: ReactNode;
  className?: string;
  darkMode?: boolean;
}

interface LabelProps extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  children: ReactNode;
  className?: string;
  darkMode?: boolean;
}

export const SeoH1 = ({ children, darkMode, className, ...rest }: HeadingProps) => {
  return (
    <h1 {...rest} className={`${s.seoH1} ${className} ${darkMode ? s.darkMode : ''}`}>
      {children}
    </h1>
  );
};

export const H1 = ({ children, darkMode, className, ...rest }: HeadingProps) => {
  return (
    <h2 {...rest} className={`${s.h1} ${className} ${darkMode ? s.darkMode : ''}`}>
      {children}
    </h2>
  );
};

export const H2 = ({ children, darkMode, className, ...rest }: HeadingProps) => {
  return (
    <h2 {...rest} className={`${s.h2} ${className} ${darkMode ? s.darkMode : ''}`}>
      {children}
    </h2>
  );
};

export const H3 = ({ children, darkMode, className, ...rest }: HeadingProps) => {
  return (
    <h3 {...rest} className={`${s.h3} ${className} ${darkMode ? s.darkMode : ''}`}>
      {children}
    </h3>
  );
};

export const Body = ({ children, darkMode, className, ...rest }: ParagraphProps) => {
  return (
    <p {...rest} className={`${s.body} ${className} ${darkMode ? s.darkMode : ''}`}>
      {children}
    </p>
  );
};

export const BodyBold = ({ children, darkMode, className, ...rest }: ParagraphProps) => {
  return (
    <p {...rest} className={`${s.bodyBold} ${className} ${darkMode ? s.darkMode : ''}`}>
      {children}
    </p>
  );
};

export const Anchor = ({ children, darkMode, className, ...rest }: AnchorProps) => {
  return (
    <a {...rest} className={`${s.anchor} ${className} ${darkMode ? s.darkMode : ''}`}>
      {children}
    </a>
  );
};

export const Caption = ({ children, darkMode, className, ...rest }: SmallProps) => {
  return (
    <small {...rest} className={`${s.caption} ${className} ${darkMode ? s.darkMode : ''}`}>
      {children}
    </small>
  );
};

export const CaptionBold = ({ children, darkMode, className, ...rest }: SmallProps) => {
  return (
    <small {...rest} className={`${s.captionBold} ${className} ${darkMode ? s.darkMode : ''}`}>
      {children}
    </small>
  );
};

export const Label = ({ children, darkMode, className, ...rest }: LabelProps) => {
  return (
    <label {...rest} className={`${s.label} ${className} ${darkMode ? s.darkMode : ''}`}>
      {children}
    </label>
  );
};

export const ButtonText = ({ children, darkMode, className, ...rest }: ParagraphProps) => {
  return (
    <p {...rest} className={`${s.buttonText} ${className} ${darkMode ? s.darkMode : ''}`}>
      {children}
    </p>
  );
};
