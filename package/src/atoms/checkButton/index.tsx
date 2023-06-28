import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';
import { Body } from '../../tokens/typography';
import s from './checkButton.module.scss';

export interface CheckButtonProps {
  value: string;
  label: string;
  showIcon?: boolean;
  register?: UseFormRegisterReturn;
  isDisabled?: boolean;
  darkMode?: boolean;
  overWhite?: boolean;
}

const CheckButton = ({ value, label, showIcon, register, isDisabled, darkMode, overWhite }: CheckButtonProps) => {
  return (
    <div className={s.checkButton}>
      <label
        htmlFor={value}
        className={`${isDisabled ? s.disabled : ''} ${darkMode ? s.darkMode : ''} ${overWhite ? s.overWhite : ''}`}
      >
        <input
          id={value}
          value={value}
          type="checkbox"
          disabled={isDisabled}
          data-testid={`checkButton_${value}`}
          {...register}
        ></input>

        <div className={`${s.notSelected} ${showIcon ? s.showIcon : ''}`}>
          {showIcon && <RiCheckboxBlankLine />}
          <Body darkMode={darkMode}>{label}</Body>
        </div>

        <div className={`${s.selected} ${showIcon ? s.showIcon : ''}`}>
          {showIcon && <RiCheckboxLine />}
          <Body darkMode={darkMode}>{label}</Body>
        </div>
      </label>
    </div>
  );
};

export default CheckButton;
