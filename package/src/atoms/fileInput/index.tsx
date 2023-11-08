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

const imageMimeType = ['image/webp', 'image/png', 'image/jpeg', 'image/jpg', 'image/heic'];
const documentMimeType = ['application/pdf'];

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
            if (fileType === FileType.IMAGE) return imageMimeType.some((imageType) => type.startsWith(imageType));
            else if (fileType === FileType.PDF) return documentMimeType.some((imageType) => type.startsWith(imageType));
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
            setValue(id, event.dataTransfer.files, { shouldValidate: true });
        }
    };

    // const downloadFileList = (fileList: FileList) => {
    //     Array.from(fileList).forEach((file) => {
    //         const url = URL.createObjectURL(file);
    //         const a = document.createElement('a');
    //         a.style.display = 'none';
    //         a.href = url;
    //         a.download = file.name;
    //         document.body.appendChild(a);
    //         a.click();
    //         document.body.removeChild(a);
    //         URL.revokeObjectURL(url);
    //     });
    // };

    const convertHeigToPng = async (fileList: FileList) => {
        if (typeof window !== 'undefined') {
            const ImageResizor = (await import('image-resizor')).default;

            const imagesWithoutHeic = await Promise.all(
                Array.from(fileList).map(async (file) => {
                    if (file.type === 'image/heic') {
                        const convertedImage = await new ImageResizor(file, { outputType: 'image/png' }).init();
                        const convertedBlob = await convertedImage.toBlob();
                        return new File([convertedBlob], `${file.name.replace('.heic', '')}.png`, {
                            type: 'image/png'
                        });
                    } else return file;
                })
            );

            const dataTransfer = new DataTransfer();
            imagesWithoutHeic.forEach((file) => dataTransfer.items.add(file));
            setValue(id, dataTransfer.files, { shouldValidate: true });
        }
    };

    const hasHeicFile = (fileList: FileList) => {
        return Array.from(fileList).some((file) => file.type === 'image/heic');
    };

    useEffect(() => {
        const subscription = watch(async (value) => {
            const fileList: FileList = value[id];
            if (hasHeicFile(fileList)) return convertHeigToPng(fileList);

            if (fileList && fileList.length > 0) {
                setFileName(fileList.length === 1 ? fileList[0].name : '');
                setNumberOfFiles(fileList.length);

                if (fileList.length === 1 && fileList[0].type.startsWith('image'))
                    setImage(URL.createObjectURL(fileList[0]));
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
                            if (type === FileType.IMAGE) return imageMimeType;
                            else if (type === FileType.PDF) return documentMimeType;
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
