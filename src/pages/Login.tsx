import { FormEvent, useState } from 'react';
import { usePostAuthDataMutation } from '../api/accountLoginApi.ts';
import { setAuthData } from '../redux/authSlice.ts';
import { ButtonComponent } from '../components/Button.tsx';
import { useAppDispatch } from '../hooks.ts';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import KeySvg from '../assets/svg/LoginPage__1.svg';
import { colors } from '../styles/globalStyles.ts';
// import LockSvg from '../assets/svg/LoginPage__2.svg';

const Login = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px;
  max-width: 1440px;
  flex: 1;
  box-sizing: border-box;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const Key = styled.img`
  display: block;
  width: fit-content;
`;

const Title = styled.h2`
  font-family: Ferry, Arial, sans-serif;
  font-size: 40px;
  font-weight: 900;
  line-height: 48px;
  letter-spacing: 0.02em;
  text-align: left;
`;

const Right = styled.div``;

const Form = styled.form`
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(199, 199, 199, 1);
  border-radius: 10px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
`;

const Lock = styled.img`
  position: absolute;
  top: -50px;
  left: -50px;
  display: block;
`;

const AuthButtons = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
`;

const AuthButton = styled.button`
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  color: ${colors.primary.teal};
  background: transparent;
  border: 0;
  border-bottom: 2px solid ${colors.primary.teal};
  padding: 8px 50px;
  font-size: 16px;

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

const Input = styled.input`
  font-size: 16px;
  font-weight: 400;
  line-height: 19.36px;
  letter-spacing: 0.02em;
  border: 1px solid rgba(199, 199, 199, 1);
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
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

// const LoginViaButton = styled.button`
//   background: transparent;
//   display: flex;
//   place-items: center;
//   width: 96px;
//   height: 31px;
//   border-radius: 3px;
//   border: 1px solid rgba(89, 112, 255, 0.51);
// `;

export const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [log, setLog] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [postAuthData, { isLoading }] = usePostAuthDataMutation();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (login.length > 0 && password.length > 0) {
      try {
        const { data, error } = await postAuthData({ login, password });
        if (error) {
          if ('status' in error) {
            const errorMsg =
              'error' in error ? error.error : JSON.stringify(error.data);
            setLog(errorMsg);
          }
        } else {
          dispatch(setAuthData({ ...data, isAuthenticated: true }));
          navigate('/');
        }
      } catch (e) {
        setLog((e as Error).message);
      }
    } else {
      setLog(`Одно из полей не заполнено`);
    }
  };

  return (
    <Login>
      <Left>
        <Title>
          Для оформления подписки <br />
          на тариф, необходимо <br />
          авторизоваться.
        </Title>
        <Key src={keySvg} alt={'Key'} />
      </Left>
      <Right>
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
              onChange={(e) => setLogin(e.target.value)}
            />
          </Field>
          <Field>
            <Label htmlFor={'password'}>Пароль:</Label>
            <Input
              $isError={isError}
              id={'input-password'}
              name={'password'}
              type={'password'}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Auth>
            {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <ButtonComponent
              text={'Войти'}
              font={'small'}
              width={'100%'}
              type={'submit'}
              disabled={isLoading || !(login.length > 0 && password.length > 0)}
            />
            <RecoveryLink>Восстановить пароль</RecoveryLink>
          </Auth>
          <ExternalAuth>
            <Text>Войти через:</Text>
            <ExternalAuthButtons>
              <img src={google} alt={'Google'} />
              <img src={facebook} alt={'Facebook'} />
              <img src={yandex} alt={'Яндекс'} />
            </ExternalAuthButtons>
          </ExternalAuth>
        </Form>
      </Right>
    </Login>
  );
};
