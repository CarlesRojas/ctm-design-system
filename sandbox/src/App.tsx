import {
  Body,
  Button,
  ButtonType,
  CheckButton,
  Checkbox,
  Dialog,
  Dropdown,
  DropdownOption,
  DropdownWithSearch,
  ErrorMessage,
  FileInput,
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
  dropdownWithSearch: string;
  radioButton: string;
  fileInput: FileList;
}

const randomOptions: DropdownOption[] = [
  { label: 'Barcelona', value: 'barcelona' },
  { label: 'Madrid', value: 'madrid' },
  { label: '', value: '', disabled: true },
  { label: 'Sevilla', value: 'sevilla' },
  { label: 'Valencia', value: 'valencia' },
  { label: 'Paris', value: 'paris', disabled: true },
  { label: 'Lyon', value: 'lyon' },
  { label: 'Marseille', value: 'marseille' },
  { label: 'Toulouse', value: 'toulouse' },
  { label: 'Nantes', value: 'nantes' },
  { label: 'Bordeaux', value: 'bordeaux' },
  { label: 'Lille', value: 'lille' },
  { label: 'Strasbourg', value: 'strasbourg' },
  { label: 'Montpellier', value: 'montpellier' },
  { label: 'Nice', value: 'nice' },
  { label: 'Nancy', value: 'nancy' },
  { label: 'Rennes', value: 'rennes' },
  { label: 'Grenoble', value: 'grenoble' },
  { label: 'Dijon', value: 'dijon' },
  { label: 'Angers', value: 'angers' },
  { label: 'Nimes', value: 'nimes' },
  { label: 'Le Havre', value: 'le havre' }
];

const Home = () => {
  const darkMode = false;
  const whiteBackground = false;
  const showIcon = true;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    console.log(data);
  };

  console.log(errors);
  const [dilogOpen, setDilogOpen] = useState(false);
  const getFormError = (name: keyof Inputs) => errors[name] && errors[name]?.message;

  return (
    <div className={`${s.app} ${darkMode ? s.darkMode : ''} ${whiteBackground ? s.whiteBackground : ''}`}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Input
          id={'input'}
          label={'Input test'}
          register={register('input', { required: 'This field is required' })}
          errorMessage={getFormError('input')}
          darkMode={darkMode}
          overWhite={whiteBackground}
          reserveErrorSpace
        />

        <Checkbox
          id={'checkbox'}
          register={register('checkbox', { required: 'This field is required' })}
          darkMode={darkMode}
          errorMessage={getFormError('checkbox')}
          reserveErrorSpace
        >
          <Body darkMode={darkMode}>Checkbox info</Body>
        </Checkbox>

        <div className={s.group}>
          <CheckButton
            register={register('checkButton', { required: 'This field is required' })}
            value={'cb1'}
            label={'checkbutton information'}
            darkMode={darkMode}
            overWhite={whiteBackground}
            showIcon={showIcon}
          />
          <CheckButton
            register={register('checkButton', { required: 'This field is required' })}
            value={'cb2'}
            label={'checkbutton information'}
            darkMode={darkMode}
            overWhite={whiteBackground}
            showIcon={showIcon}
          />
          <CheckButton
            register={register('checkButton', { required: 'This field is required' })}
            value={'cb3'}
            label={'checkbutton information'}
            darkMode={darkMode}
            overWhite={whiteBackground}
            showIcon={showIcon}
          />
          {getFormError('checkButton') && (
            <ErrorMessage id={'checkButtonError'} message={getFormError('checkButton') ?? ''} />
          )}
        </div>

        <div className={s.group}>
          <RadioButton
            label="RadioButton 1"
            register={register('radioButton', { required: 'This field is required' })}
            value={'rb1'}
            darkMode={darkMode}
            overWhite={whiteBackground}
            showIcon={showIcon}
          />
          <RadioButton
            label="RadioButton 2"
            register={register('radioButton', { required: 'This field is required' })}
            value={'rb2'}
            darkMode={darkMode}
            overWhite={whiteBackground}
            showIcon={showIcon}
          />
          <RadioButton
            label="RadioButton 3"
            register={register('radioButton', { required: 'This field is required' })}
            value={'rb3'}
            darkMode={darkMode}
            overWhite={whiteBackground}
            showIcon={showIcon}
          />
          {getFormError('radioButton') && (
            <ErrorMessage id={'checkButtonError'} message={getFormError('radioButton') ?? ''} />
          )}
        </div>

        <div className={s.fileInput}>
          <FileInput
            id={'fileInput'}
            label="File Input Test"
            overWhite={whiteBackground}
            register={register('fileInput', { required: 'This field is required' })}
            watch={watch}
            setValue={setValue}
            errorMessage={getFormError('fileInput')}
            onHelpClick={() => setDilogOpen(true)}
            darkMode={darkMode}
            reserveErrorSpace
            multiple
          />
        </div>

        <Dropdown
          id={'dropdown'}
          label="Dropdown test"
          dropdownOptions={randomOptions}
          register={register('dropdown', { required: 'This field is required' })}
          errorMessage={getFormError('dropdown')}
          darkMode={darkMode}
          overWhite={whiteBackground}
          reserveErrorSpace
        />

        <DropdownWithSearch
          id={'dropdownWithSearch'}
          label="Dropdown with search test"
          dropdownOptions={randomOptions}
          control={control}
          rules={{ required: 'This field is required' }}
          errorMessage={getFormError('dropdownWithSearch')}
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
