import React, { DetailedHTMLProps, DialogHTMLAttributes, ReactNode, useCallback, useEffect, useRef } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { H3 } from '../../tokens/typography';
import Button, { ButtonType } from '../button';
import s from './dialog.module.scss';

export interface DialogProps extends DetailedHTMLProps<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement> {
  id: string;
  children: ReactNode;
  darkMode?: boolean;
  open: boolean;
  title: string;
  onClose: () => void;
}

const Dialog = ({ id, children, title, darkMode, open, onClose, ...rest }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeDialog = useCallback(() => {
    dialogRef.current?.close();
    onClose();
  }, [onClose]);

  const onDialogClick = (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    if (!open || !dialogRef.current) return;

    const dialogDimensions = dialogRef.current.getBoundingClientRect();

    if (
      event.clientX < dialogDimensions.left ||
      event.clientX > dialogDimensions.right ||
      event.clientY < dialogDimensions.top ||
      event.clientY > dialogDimensions.bottom
    )
      closeDialog();
  };

  useEffect(() => {
    if (open && !dialogRef.current?.open) dialogRef.current?.showModal();
    else if (!open && dialogRef.current?.open) closeDialog();
  }, [closeDialog, open]);

  return (
    <dialog
      onClick={onDialogClick}
      className={`${s.dialog} ${darkMode ? s.darkMode : ''}`}
      ref={dialogRef}
      onClose={closeDialog}
      data-testid={`dialog_${id}`}
      {...rest}
    >
      <H3>{title}</H3>

      {children}

      <Button
        id="closeModal"
        className={s.closeButton}
        buttonType={ButtonType.MINIMAL}
        type="button"
        onClick={closeDialog}
        icon={<RiCloseLine />}
      />
    </dialog>
  );
};

export default Dialog;
