import React, { DetailedHTMLProps, SelectHTMLAttributes, useEffect, useMemo, useRef, useState } from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import { RiArrowDownSLine, RiErrorWarningFill } from 'react-icons/ri';
import { Body, Label } from '../../tokens/typography';
import ErrorMessage from '../errorMessage';
import Input from '../input';
import s from './searchableDropdown.module.scss';

interface DropdownOption {
  value: string;
  label: string;
}

export interface SearchableDropdownProps
  extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  id: string;
  label?: string;
  dropdownOptions: DropdownOption[];
  defaultOption?: DropdownOption;
  errorMessage?: string;
  success?: boolean;
  control?: Control<any, any>;
  rules?: RegisterOptions;
  isDisabled?: boolean;
  darkMode?: boolean;
  overWhite?: boolean;
  reserveErrorSpace?: boolean;
  noOptionsMessage?: string;
}

const SearchableDropdown = ({
  id,
  label,
  dropdownOptions,
  defaultOption,
  errorMessage,
  success,
  control,
  rules,
  isDisabled,
  darkMode,
  overWhite,
  reserveErrorSpace,
  noOptionsMessage
}: SearchableDropdownProps) => {
  const {
    field: { ref, onChange, onBlur }
  } = useController({ name: id, control, rules });

  const inputRef = useRef<HTMLInputElement | null>();

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(defaultOption?.label ?? '');
  const [selectedOption, setSelectedOption] = useState(defaultOption ?? null);
  const [hoveredOption, setHoveredOption] = useState(0);
  const restartInput = useRef('');

  const filteredOptions = useMemo(
    () => dropdownOptions.filter(({ label }) => label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1),
    [dropdownOptions, inputValue]
  );

  const selectOption = (index: number) => {
    if (index < 0 || index >= filteredOptions.length) return;
    setSelectedOption(filteredOptions[index]);
  };

  useEffect(() => {
    const hoveredOptionElement = document.getElementById(`dropdownHoveredOption_${id}`);
    hoveredOptionElement?.scrollIntoView({ block: 'nearest', inline: 'start' });
  }, [id, hoveredOption]);

  useEffect(() => {
    onChange(selectedOption?.value ?? undefined);
  }, [onChange, selectedOption]);

  useEffect(() => {
    setHoveredOption(0);

    if (open) setInputValue(restartInput.current.length > 0 ? restartInput.current : '');
    else setInputValue(selectedOption?.label ?? '');

    restartInput.current = '';
  }, [open, selectedOption]);

  return (
    <div
      className={`${s.searchableDropdown} ${isDisabled ? s.disabled : ''} ${darkMode ? s.darkMode : ''} ${
        overWhite ? s.overWhite : ''
      }`}
    >
      {label && (
        <Label htmlFor={`searchableDropdown_${id}`} darkMode={darkMode}>
          {label}
        </Label>
      )}

      <div className={s.container}>
        <Input
          className={errorMessage ? s.dropdownInputError : ''}
          success={success}
          darkMode={darkMode}
          overWhite={overWhite}
          innerRef={(el) => {
            ref(el);
            inputRef.current = el;
          }}
          id={`searchableDropdown_${id}`}
          value={inputValue}
          onChange={(e) => {
            if (open) setInputValue(e.target.value);
            else {
              restartInput.current = e.target.value.slice(-1);
              setOpen(true);
            }

            setHoveredOption(0);
          }}
          onClick={() => setOpen((prev) => !prev)}
          onBlur={async () => {
            onBlur();
            await new Promise((resolve) => setTimeout(resolve, 100));
            setOpen(false);
          }}
          onSubmit={(e) => {
            e.preventDefault();
            selectOption(hoveredOption);
            setOpen(false);
          }}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === 'Tab') && open) {
              e.preventDefault();
              selectOption(hoveredOption);
              setOpen(false);
            }

            if ((e.key === ' ' || e.key === 'Space') && (inputValue === '' || !open)) {
              e.preventDefault();
              selectOption(hoveredOption);
              setOpen((prev) => !prev);
            }

            if (e.key === 'ArrowDown') {
              e.preventDefault();
              if (hoveredOption < dropdownOptions.length - 1) setHoveredOption(hoveredOption + 1);
              else setHoveredOption(0);
            }

            if (e.key === 'ArrowUp') {
              e.preventDefault();
              if (hoveredOption > 0) setHoveredOption(hoveredOption - 1);
              else setHoveredOption(dropdownOptions.length - 1);
            }

            if (e.key === 'Escape') {
              e.preventDefault();
              setOpen(false);
            }
          }}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-haspopup="true"
          aria-owns={`searchableDropdownMenu_${id}`}
        />

        {open && (
          <div className={s.options} id={`searchableDropdownMenu_${id}`}>
            <div className={s.optionsScroll} style={{ colorScheme: darkMode ? 'dark' : 'light' }}>
              {filteredOptions.map((option, i) => (
                <Body
                  darkMode={darkMode}
                  className={`${s.option} ${selectedOption?.value === option.value ? s.selected : ''}  ${
                    hoveredOption === i ? s.hovered : ''
                  }`}
                  id={hoveredOption === i ? `dropdownHoveredOption_${id}` : ''}
                  key={`${option.value}_${i}`}
                  onMouseEnter={() => setHoveredOption(i)}
                  onMouseLeave={() => setHoveredOption(0)}
                  onClick={(e) => {
                    e.preventDefault();
                    selectOption(i);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </Body>
              ))}

              {filteredOptions.length === 0 && noOptionsMessage && <Body className={s.option}>{noOptionsMessage}</Body>}
            </div>
          </div>
        )}

        <RiArrowDownSLine className={s.dropdownIcon} />
        {errorMessage && <RiErrorWarningFill className={s.errorIcon} />}
      </div>

      {(reserveErrorSpace || errorMessage) && (
        <ErrorMessage id={id} message={errorMessage || '-'} darkMode={darkMode} hidden={!errorMessage} />
      )}
    </div>
  );
};

export default SearchableDropdown;
