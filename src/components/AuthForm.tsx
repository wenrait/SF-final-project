import lockSvg from '../assets/svg/LoginPage__2.svg';
import { ButtonComponent } from './Button.tsx';
import google from '../assets/svg/LoginPage__Google.svg';
import facebook from '../assets/svg/LoginPage__Facebook.svg';
import yandex from '../assets/svg/LoginPage__Yandex.svg';
import styled from 'styled-components';
import { colors } from '../styles/globalStyles.ts';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../redux/services/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { usePostAuthDataMutation } from '../redux/services/api/accountLoginApi.ts';
import { handleRTKQueryError } from '../redux/services/handleError.ts';
import { setAuthData } from '../redux/slices/authSlice.ts';

const Form = styled.form`
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(199, 199, 199, 1);
  border-radius: 10px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
  max-width: 40%;
  flex: 1;
  box-sizing: border-box;
  @media (max-width: 960px) {
    max-width: 100%;
    width: 100%;
    margin-top: 60px;
  }
`;

const Lock = styled.img`
  position: absolute;
  top: -50px;
  left: -50px;
  display: block;
  @media (max-width: 960px) {
    top: -70px;
    left: 100px;
  }
`;

const AuthModeButtons = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
`;

const AuthModeButton = styled.button`
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  color: ${colors.primary.teal};
  background: transparent;
  border: 0;
  border-bottom: 2px solid ${colors.primary.teal};
  padding: 8px;
  font-size: 16px;
  flex: auto;

  &:disabled {
    color: rgba(199, 199, 199, 1);
    border-bottom: 2px solid rgba(199, 199, 199, 1);
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 400;
  line-height: 19.36px;
  letter-spacing: 0.02em;
  color: rgba(148, 148, 148, 1);
`;

const Input = styled.input<{ $isError: boolean }>`
  font-size: 16px;
  font-weight: 400;
  line-height: 19.36px;
  letter-spacing: 0.02em;
  border: 1px solid
    ${(props) =>
      props.$isError ? 'rgba(255, 89, 89, 1)' : 'rgba(199, 199, 199, 1)'};
  box-shadow: ${(props) =>
    props.$isError
      ? '0 0 10px 0 rgba(255, 89, 89, 0.2)'
      : '0 0 20px 0 rgba(0, 0, 0, 0.05)'};

  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  border-radius: 5px;
  padding: 12px 19px;
`;

const Auth = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
`;

const RecoveryLink = styled.a`
  color: ${colors.secondary.blue};
  font-size: 14px;
  font-weight: 400;
  line-height: 16.94px;
  letter-spacing: 0.02em;
  text-align: center;
  text-decoration: underline;
`;

const ExternalAuth = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ExternalAuthButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ExternalAuthButton = styled.button`
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 31px;
  border-radius: 3px;
  border: 1px solid rgba(89, 112, 255, 0.51);
  flex: 1;
`;

const Text = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 19.36px;
  letter-spacing: 0.02em;
  color: rgba(148, 148, 148, 1);
`;

const ErrorMessage = styled.span`
  width: 100%;
  text-align: center;
  color: rgba(255, 89, 89, 1);
  font-size: 14px;
  line-height: 16.94px;
  letter-spacing: 0.01em;
  position: absolute;
  top: -25px;
`;

export const AuthFormComponent = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [postAuthData, { isLoading }] = usePostAuthDataMutation();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await postAuthData({ login, password });
      if (error) {
        const message = handleRTKQueryError(error);
        setIsError(true);
        setErrorMessage(message);
      } else {
        navigate('/');
        dispatch(
          setAuthData({
            ...data,
            isAuthenticated: true,
            tariff: 'beginner',
          }),
        );
      }
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      } else {
        setErrorMessage('Произошла неизвестная ошибка');
      }
    }
  };

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setPassword(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Lock src={lockSvg} />
      <AuthModeButtons>
        <AuthModeButton>Войти</AuthModeButton>
        <AuthModeButton disabled>Зарегистрироваться</AuthModeButton>
      </AuthModeButtons>
      <Field>
        <Label htmlFor={'login'}>Логин или номер телефона:</Label>
        <Input
          $isError={isError}
          id={'input-login'}
          name={'login'}
          type={'text'}
          onChange={(e) => handleLoginChange(e)}
        />
      </Field>
      <Field>
        <Label htmlFor={'input-password'}>Пароль:</Label>
        <Input
          $isError={isError}
          id={'input-password'}
          name={'password'}
          type={'password'}
          onChange={(e) => handlePasswordChange(e)}
        />
      </Field>
      <Auth>
        {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <ButtonComponent
          text={'Войти'}
          font={'medium'}
          width={'100%'}
          type={'submit'}
          disabled={isLoading || !(login.length > 0 && password.length > 0)}
        />
        <RecoveryLink>Восстановить пароль</RecoveryLink>
      </Auth>
      <ExternalAuth>
        <Text>Войти через:</Text>
        <ExternalAuthButtons>
          <ExternalAuthButton>
            <img src={google} alt={'Google'} />
          </ExternalAuthButton>
          <ExternalAuthButton>
            <img src={facebook} alt={'Facebook'} />
          </ExternalAuthButton>
          <ExternalAuthButton>
            <img src={yandex} alt={'Яндекс'} />
          </ExternalAuthButton>
        </ExternalAuthButtons>
      </ExternalAuth>
    </Form>
  );
};
