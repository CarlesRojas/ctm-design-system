import {
  Body,
  Button,
  ButtonType,
  Checkbox,
  CheckButton,
  Dialog,
  Dropdown,
  ErrorMessage,
  FileInput,
  FileType,
  H2,
  Input,
  Link,
  Loading,
  RadioButton,
  SuccessMessage
} from 'ctm-design-system';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import s from './app.module.scss';

interface Inputs {
  input: string;
  checkbox: string;
  checkButton: string;
  dropdown: string;
  radioButton: string;
  fileInput: FileList;
}

const Home = () => {
  const darkMode = false;
  const whiteBackground = false;
  const showIcon = true;

  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    setError('input', { type: 'manual', message: 'Error message' });
    setError('dropdown', { type: 'manual', message: 'Error message' });
    setError('fileInput', { type: 'manual', message: 'Error message' });
    setError('checkbox', { type: 'manual', message: 'Error message' });

    console.log(data);
  };

  const [dilogOpen, setDilogOpen] = useState(false);
  const getFormError = (name: keyof Inputs) => errors[name] && errors[name]?.message;

  return (
    <div className={`${s.app} ${darkMode ? s.darkMode : ''} ${whiteBackground ? s.whiteBackground : ''}`}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Input
          id={'input'}
          label={'Input test'}
          register={register('input')}
          errorMessage={getFormError('input')}
          darkMode={darkMode}
          overWhite={whiteBackground}
          reserveErrorSpace
        />

        <Checkbox
          id={'checkbox'}
          register={register('checkbox')}
          darkMode={darkMode}
          errorMessage={getFormError('checkbox')}
          reserveErrorSpace
        >
          <Body darkMode={darkMode}>Checkbox info</Body>
        </Checkbox>

        <div className={s.group}>
          <CheckButton
            register={register('checkButton')}
            value={'cb1'}
            label={'checkbutton information'}
            darkMode={darkMode}
            overWhite={whiteBackground}
            showIcon={showIcon}
          />
          <CheckButton
            register={register('checkButton')}
            value={'cb2'}
            label={'checkbutton information'}
            darkMode={darkMode}
            overWhite={whiteBackground}
            showIcon={showIcon}
          />
          <CheckButton
            register={register('checkButton')}
            value={'cb3'}
            label={'checkbutton information'}
            darkMode={darkMode}
            overWhite={whiteBackground}
            showIcon={showIcon}
          />
        </div>

        <div className={s.group}>
          <RadioButton
            label="RadioButton 1"
            register={register('radioButton')}
            value={'rb1'}
            darkMode={darkMode}
            overWhite={whiteBackground}
            showIcon={showIcon}
          />
          <RadioButton
            label="RadioButton 2"
            register={register('radioButton')}
            value={'rb2'}
            darkMode={darkMode}
            overWhite={whiteBackground}
            showIcon={showIcon}
          />
          <RadioButton
            label="RadioButton 3"
            register={register('radioButton')}
            value={'rb3'}
            darkMode={darkMode}
            overWhite={whiteBackground}
            showIcon={showIcon}
          />
        </div>

        <div className={s.third}>
          <FileInput
            id={'fileInput'}
            fileTypes={[FileType.IMAGE]}
            label="File Input Test"
            overWhite={whiteBackground}
            register={register('fileInput')}
            watch={watch}
            setValue={setValue}
            errorMessage={getFormError('fileInput')}
            onHelpClick={() => setDilogOpen(true)}
            darkMode={darkMode}
            reserveErrorSpace
          />
        </div>

        <Dropdown
          id={'dropdown'}
          label="Dropdown test"
          dropdownOptions={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' }
          ]}
          register={register('dropdown')}
          errorMessage={getFormError('dropdown')}
          darkMode={darkMode}
          overWhite={whiteBackground}
          reserveErrorSpace
        />

        <Dialog
          darkMode={darkMode}
          id={'dialog'}
          open={dilogOpen}
          title={'Title of Dialog'}
          onClose={() => setDilogOpen(false)}
        >
          <H2 darkMode={darkMode}>Content of dialog</H2>
        </Dialog>

        <div className={s.group}>
          <Button id={'testButton'} label="Submit" />

          <Button
            id={'testButton'}
            type="button"
            label="Open dialog"
            buttonType={ButtonType.POSITIVE}
            onClick={() => setDilogOpen(true)}
          />
        </div>

        <ErrorMessage darkMode={darkMode} id={'errorMessage'} message="Error message" />

        <SuccessMessage darkMode={darkMode} id={'successMessage'} message="Success message" />

        <Link id={'link'} href={'https://example.com'} target="_blank">
          <Body darkMode={darkMode}>Link</Body>
        </Link>

        <Loading />
      </form>
    </div>
  );
};

export default Home;
