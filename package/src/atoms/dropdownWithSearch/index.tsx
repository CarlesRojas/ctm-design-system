import { DropdownOption } from 'atoms/dropdown';
import React, { DetailedHTMLProps, SelectHTMLAttributes, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { RiArrowDownSLine, RiErrorWarningFill } from 'react-icons/ri';
import Select from 'react-select';
import { Label } from '../../tokens/typography';
import ErrorMessage from '../errorMessage';
import s from './dropdownWithSearch.module.scss';

export interface DropdownWithSearchProps
  extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  id: string;
  label?: string;
  defaultValue?: string;
  dropdownOptions: DropdownOption[];
  errorMessage?: string;
  success?: boolean;
  control?: Control<any, any>;
  isDisabled?: boolean;
  darkMode?: boolean;
  overWhite?: boolean;
  reserveErrorSpace?: boolean;
}

const DropdownWithSearch = ({
  id,
  label,
  defaultValue,
  dropdownOptions,
  errorMessage,
  success,
  control,
  isDisabled,
  darkMode,
  overWhite,
  reserveErrorSpace
}: DropdownWithSearchProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`${s.dropdownWithSearch} ${isDisabled ? s.disabled : ''} ${darkMode ? s.darkMode : ''} ${
        overWhite ? s.overWhite : ''
      }`}
    >
      {label && (
        <Label htmlFor={id} darkMode={darkMode}>
          {label}
        </Label>
      )}

      <div className={s.container}>
        <Controller
          control={control}
          defaultValue={defaultValue}
          name={id}
          render={({ field: { onChange, value } }) => (
            <Select
              name={id}
              isDisabled={isDisabled}
              options={dropdownOptions}
              value={dropdownOptions.find((c) => c.value === value)}
              onChange={(val) => onChange(val.value)}
              placeholder=""
              isSearchable
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={`${s.select} ${focused ? s.focused : ''}  ${errorMessage ? s.error : ''} ${
                success ? s.success : ''
              }`}
            />
          )}
        />

        <RiArrowDownSLine className={s.dropdownIcon} />
        {errorMessage && <RiErrorWarningFill className={s.errorIcon} />}
      </div>

      {(reserveErrorSpace || errorMessage) && (
        <ErrorMessage id={id} message={errorMessage || '-'} darkMode={darkMode} hidden={!errorMessage} />
      )}
    </div>
  );
};

export default DropdownWithSearch;
