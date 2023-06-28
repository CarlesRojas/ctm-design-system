import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { RiCheckboxBlankCircleLine, RiCheckboxCircleLine } from 'react-icons/ri';
import { Body } from '../../tokens/typography';
import s from './radioButton.module.scss';

export interface RadioButtonProps {
  value: string;
  label: string;
  showIcon?: boolean;
  register?: UseFormRegisterReturn;
  isDisabled?: boolean;
  darkMode?: boolean;
  overWhite?: boolean;
}

const RadioButton = ({ value, label, showIcon, register, isDisabled, darkMode, overWhite }: RadioButtonProps) => {
  return (
    <div className={s.radioButton}>
      <label
        htmlFor={value}
        className={`${isDisabled ? s.disabled : ''} ${darkMode ? s.darkMode : ''} ${overWhite ? s.overWhite : ''}`}
      >
        <input
          id={value}
          value={value}
          type="radio"
          disabled={isDisabled}
          data-testid={`radioButton_${value}`}
          {...register}
        ></input>

        <div className={`${s.notSelected} ${showIcon ? s.showIcon : ''}`}>
          {showIcon && <RiCheckboxBlankCircleLine />}
          <Body darkMode={darkMode}>{label}</Body>
        </div>

        <div className={`${s.selected} ${showIcon ? s.showIcon : ''}`}>
          {showIcon && <RiCheckboxCircleLine />}
          <Body darkMode={darkMode}>{label}</Body>
        </div>
      </label>
    </div>
  );
};

export default RadioButton;
