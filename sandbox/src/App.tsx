import {
  Body,
  Button,
  ButtonType,
  Checkbox,
  CheckButton,
  Dialog,
  Dropdown,
  ErrorMessage,
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
}

const Home = () => {
  const darkMode = false;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    setError('input', { type: 'manual', message: 'Error message' });
    setError('dropdown', { type: 'manual', message: 'Error message' });
    console.log(data);
  };

  const [dilogOpen, setDilogOpen] = useState(false);
  const getFormError = (name: keyof Inputs) => errors[name] && errors[name]?.message;

  return (
    <div className={`${s.app} ${darkMode ? s.darkMode : ''}`}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Input
          id={'input'}
          label={'Input test'}
          register={register('input')}
          errorMessage={getFormError('input')}
          darkMode={darkMode}
        />

        <Checkbox id={'checkbox'} register={register('checkbox')} darkMode={darkMode}>
          <Body darkMode={darkMode}>Checkbox info</Body>
        </Checkbox>

        <div className={s.group}>
          <CheckButton register={register('checkButton')} value={'cb1'} label={'checkbutton information'} />
          <CheckButton register={register('checkButton')} value={'cb2'} label={'checkbutton information'} />
          <CheckButton register={register('checkButton')} value={'cb3'} label={'checkbutton information'} />
        </div>

        <div className={s.group}>
          <RadioButton label="RadioButton 1" register={register('radioButton')} value={'rb1'} />
          <RadioButton label="RadioButton 2" register={register('radioButton')} value={'rb2'} />
          <RadioButton label="RadioButton 3" register={register('radioButton')} value={'rb3'} />
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
