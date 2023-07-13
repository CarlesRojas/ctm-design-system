import React, { DetailedHTMLProps, DragEvent, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { UseFormRegisterReturn, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { RiAddCircleLine, RiFileList2Line, RiImageLine, RiQuestionLine } from 'react-icons/ri';
import { Caption, H2, Label } from '../../tokens/typography';
import ErrorMessage from '../errorMessage';
import s from './fileInput.module.scss';

export enum FileType {
  IMAGE = 'image',
  PDF = 'pdf'
}

export interface FileInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  fileTypes?: FileType[];
  label?: string;
  errorMessage?: string;
  onHelpClick?: () => void;
  isDisabled?: boolean;
  darkMode?: boolean;
  overWhite?: boolean;
  setValue?: UseFormSetValue<any>;
  register?: UseFormRegisterReturn;
  watch?: UseFormWatch<any>;
  reserveErrorSpace?: boolean;
}

const FileInput = ({
  id,
  label,
  fileTypes = [FileType.IMAGE, FileType.PDF],
  errorMessage,
  onHelpClick,
  isDisabled,
  darkMode,
  overWhite,
  register,
  watch,
  setValue,
  reserveErrorSpace,
  ...rest
}: FileInputProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');
  const [image, setImage] = useState('');
  const [numberOfFiles, setNumberOfFiles] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const matchType = (type: string) => {
    return fileTypes.some((fileType) => {
      if (fileType === FileType.IMAGE) return type.startsWith('image/png') || type.startsWith('image/jpeg');
      else if (fileType === FileType.PDF) return type.startsWith('application/pdf');
      else return false;
    });
  };

  const handleDragEnter = function (event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = function (event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = function (event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    if (event.dataTransfer.files && event.dataTransfer.files[0] && matchType(event.dataTransfer.files[0].type)) {
      // @ts-ignore
      setValue(id, event.dataTransfer.files, { shouldValidate: true });
    }
  };

  useEffect(() => {
    const subscription = watch((value) => {
      const fileList: FileList = value[id];

      if (fileList && fileList.length > 0) {
        setFileName(fileList.length === 1 ? fileList[0].name : '');
        setNumberOfFiles(fileList.length);

        if (fileList.length === 1 && fileList[0].type.startsWith('image')) setImage(URL.createObjectURL(fileList[0]));
        else setImage('');
      } else {
        setFileName('');
        setNumberOfFiles(0);
        setImage('');
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, fileName, id]);

  return (
    <div
      className={`${s.fileInput} ${isDisabled ? s.disabled : ''} ${darkMode ? s.darkMode : ''} ${
        overWhite ? s.overWhite : ''
      }`}
    >
      {(label || onHelpClick) && (
        <div className={s.labelContainer}>
          {label && (
            <Label htmlFor={id} darkMode={darkMode}>
              {label}
            </Label>
          )}
          {onHelpClick && <RiQuestionLine onClick={onHelpClick} />}
        </div>
      )}

      <div className={`${s.dropContainer} ${dragActive ? s.dragging : ''}`}>
        <input
          type="file"
          data-testid={`fileInput_${id}`}
          value={undefined}
          id={id}
          name={id}
          accept={fileTypes
            .map((type) => {
              if (type === FileType.IMAGE) return ['image/png', 'image/jpeg'];
              else if (type === FileType.PDF) return ['application/pdf'];
              else return [];
            })
            .join(', ')}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          ref={inputRef}
          {...rest}
          {...register}
        />

        <div className={`${s.border} ${errorMessage ? s.error : ''} ${image.length > 0 ? s.hasImage : ''}`}>
          {image && (
            <div className={s.image}>
              <img src={image} alt="uploaded image" />
            </div>
          )}

          {fileName && (
            <div className={s.fileName}>
              {!image && <RiFileList2Line />}
              <Caption className={s.small} darkMode={darkMode}>
                {fileName}
              </Caption>
            </div>
          )}

          {numberOfFiles > 1 && (
            <div className={s.numberOfFiles}>
              <H2 darkMode={darkMode}>{numberOfFiles}</H2>
              <RiImageLine />
            </div>
          )}

          {numberOfFiles <= 0 && <RiAddCircleLine />}
        </div>
      </div>

      {(reserveErrorSpace || errorMessage) && (
        <ErrorMessage id={id} message={errorMessage || '-'} darkMode={darkMode} hidden={!errorMessage} />
      )}
    </div>
  );
};

export default FileInput;
