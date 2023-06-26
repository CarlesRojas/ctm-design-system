import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { RiCheckLine } from 'react-icons/ri';
import ErrorMessage from '../errorMessage';
import s from './checkbox.module.scss';

export interface CheckboxProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  children: React.ReactNode;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
  isDisabled?: boolean;
  darkMode?: boolean;
}

const Checkbox = ({ id, children, errorMessage, register, isDisabled, darkMode, ...rest }: CheckboxProps) => {
  return (
    <div className={`${s.checkbox} ${isDisabled ? s.disabled : ''} ${darkMode ? s.darkMode : ''}`}>
      <div className={s.content}>
        <label htmlFor={id}>
          <input
            id={id}
            type="checkbox"
            className={`${errorMessage ? s.error : ''}`}
            data-testid={`checkbox_${id}`}
            disabled={isDisabled}
            {...rest}
            {...register}
          />

          <div className={s.checkmark}>
            <RiCheckLine />
          </div>

          <div className={s.children}>{children}</div>
        </label>
      </div>

      <ErrorMessage id={id} message={errorMessage || '-'} darkMode={darkMode} hidden={!errorMessage} />
    </div>
  );
};

export default Checkbox;
