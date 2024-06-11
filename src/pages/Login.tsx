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
  padding: 0 60px;
  flex: 1;
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
        <Key src={KeySvg} alt={'Key'} />
      </Left>
      <Right>
        <Form onSubmit={handleSubmit}>
          <AuthButtons>
            <AuthButton>Войти</AuthButton>
            <AuthButton disabled>Зарегистрироваться</AuthButton>
          </AuthButtons>
          <Field>
            <Label htmlFor={'login'}>Логин или номер телефона:</Label>
            <Input
              name={'login'}
              type={'text'}
              onChange={(e) => setLogin(e.target.value)}
            />
          </Field>
          <Field>
            <Label htmlFor={'password'}>Пароль:</Label>
            <Input
              name={'password'}
              type={'password'}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <ButtonComponent
            text={'Войти'}
            font={'small'}
            width={'100%'}
            type={'submit'}
            disabled={isLoading || !(login.length > 0 && password.length > 0)}
          />
          <div>{log}</div>
        </Form>
      </Right>
    </Login>
  );
};
