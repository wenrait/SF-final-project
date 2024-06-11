import styled from 'styled-components';
import keySvg from '../assets/svg/LoginPage__1.svg';
import { AuthFormComponent } from '../components/AuthForm.tsx';

const Login = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px;
  gap: 25px;
  max-width: 1440px;
  flex: 1;
  box-sizing: border-box;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60%;
  gap: 14px;
`;

const Key = styled.img`
  display: block;
  width: fit-content;
`;

const Title = styled.h1`
  margin: 0;
  font-family: Ferry, Arial, sans-serif;
  font-size: 40px;
  font-weight: 900;
  line-height: 48px;
  letter-spacing: 0.02em;
  text-align: left;
`;

export const LoginPage = () => {
  return (
    <Login>
      <Content>
        <Title>
          Для оформления подписки на тариф, необходимо <br />
          авторизоваться.
        </Title>
        <Key src={keySvg} alt={'Key'} />
      </Content>
      <AuthFormComponent />
    </Login>
  );
};
