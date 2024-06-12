import styled from 'styled-components';
import keySvg from '../assets/svg/LoginPage__1.svg';
import { AuthFormComponent } from '../components/AuthForm.tsx';

const Login = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px;
  gap: 25px;
  max-width: 1440px;
  flex: 1;
  box-sizing: border-box;
  @media (max-width: 960px) {
    flex-direction: column;
    padding: 30px;
  }
  @media (max-width: 600px) {
    padding: 14px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60%;
  gap: 14px;
  @media (max-width: 960px) {
    max-width: 100%;
  }
`;

const KeyDesktop = styled.img`
  display: block;
  width: fit-content;
  @media (max-width: 960px) {
    display: none;
  }
`;

const KeyMobile = styled.img`
  display: none;
  @media (max-width: 960px) {
    display: block;
    width: 100%;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-family: Ferry, Arial, sans-serif;
  font-size: 40px;
  font-weight: 900;
  line-height: 48px;
  letter-spacing: 0.02em;
  text-align: left;
  @media (max-width: 960px) {
    line-height: 36px;
    font-size: 30px;
  }
  @media (max-width: 600px) {
    font-size: 22px;
    line-height: 26px;
  }
`;

export const LoginPage = () => {
  return (
    <Login>
      <Content>
        <Title>
          Для оформления подписки на тариф, необходимо авторизоваться.
        </Title>
        <KeyDesktop src={keySvg} alt={'Key'} />
      </Content>
      <AuthFormComponent />
      <KeyMobile src={keySvg} alt={'Key'} />
    </Login>
  );
};
