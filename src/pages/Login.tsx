import { FormEvent, useState } from 'react';
import { usePostAuthDataMutation } from '../api/login-api.ts';
import { setAuthData } from '../redux/authSlice.ts';
import { ButtonComponent } from '../components/Button.tsx';
import { useAppDispatch } from '../hooks.ts';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoginWrapper = styled.div`
  display: flex;
  flex: 1;
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
    <LoginWrapper>
      <form onSubmit={handleSubmit}>
        <label htmlFor={'login'}>Login</label>
        <input
          name={'login'}
          type={'text'}
          onChange={(e) => setLogin(e.target.value)}
        />
        <label htmlFor={'password'}>Password</label>
        <input
          name={'password'}
          type={'password'}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ButtonComponent
          text={'Войти'}
          font={'small'}
          width={'fit-content'}
          type={'submit'}
          disabled={isLoading}
        />
        <div>{log}</div>
      </form>
    </LoginWrapper>
  );
};
