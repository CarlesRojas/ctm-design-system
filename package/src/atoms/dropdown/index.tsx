import React, { DetailedHTMLProps, SelectHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { RiArrowDownSLine, RiErrorWarningFill } from 'react-icons/ri';
import { Label } from '../../tokens/typography';
import ErrorMessage from '../errorMessage';
import s from './dropdown.module.scss';

export interface DropdownProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  id: string;
  label?: string;
  defaultValue?: string;
  dropdownOptions: DropdownOption[];
  errorMessage?: string;
  success?: boolean;
  register?: UseFormRegisterReturn;
  isDisabled?: boolean;
  darkMode?: boolean;
  overWhite?: boolean;
  reserveErrorSpace?: boolean;
}

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export const DROPDOWN_SELECT_DEFAULT_VALUE = 'SELECT';

const Dropdown = ({
  id,
  label,
  defaultValue,
  dropdownOptions,
  errorMessage,
  success,
  register,
  isDisabled,
  darkMode,
  overWhite,
  reserveErrorSpace,
  ...rest
}: DropdownProps) => {
  return (
    <div
      className={`${s.dropdown} ${isDisabled ? s.disabled : ''} ${darkMode ? s.darkMode : ''} ${
        overWhite ? s.overWhite : ''
      }`}
    >
      {label && (
        <Label htmlFor={id} darkMode={darkMode}>
          {label}
        </Label>
      )}

      <div className={s.container}>
        <select
          id={id}
          className={`${errorMessage ? s.error : ''} ${success ? s.success : ''}`}
          data-testid={`dropdown_${id}`}
          defaultValue={defaultValue ?? DROPDOWN_SELECT_DEFAULT_VALUE}
          disabled={isDisabled}
          {...rest}
          {...register}
        >
          {!defaultValue && <option disabled value={DROPDOWN_SELECT_DEFAULT_VALUE} />}

          {dropdownOptions.map(({ value, label, disabled }) => (
            <option key={value} value={value} disabled={disabled}>
              {label}
            </option>
          ))}
        </select>

        <RiArrowDownSLine className={s.dropdownIcon} />
        {errorMessage && <RiErrorWarningFill className={s.errorIcon} />}
      </div>

      {(reserveErrorSpace || errorMessage) && (
        <ErrorMessage id={id} message={errorMessage || '-'} darkMode={darkMode} hidden={!errorMessage} />
      )}
    </div>
  );
};

export default Dropdown;
