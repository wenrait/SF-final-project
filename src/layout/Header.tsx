import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { colors } from '../styles/globalStyles.ts';
import { LogoComponent } from '../components/Logo.tsx';
import { useAppSelector } from '../hooks.ts';
import { AccountComponent } from '../components/Account.tsx';
import { AccountInfoComponent } from '../components/AccountInfo.tsx';

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 93px;
  max-width: 1440px;
  padding: 0 60px;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-size: 14px;
  box-sizing: border-box;
  @media (max-width: 960px) {
    padding: 0 30px;
  }
  @media (max-width: 600px) {
    padding: 0 14px;
  }
`;

const LogoWrapper = styled.div`
  display: block;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex: 0;
  }
`;

const NavWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  @media (max-width: 960px) {
    display: none;
  }
`;

const AccountWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

const Nav = styled.nav`
  align-items: center;
  display: flex;
  gap: 50px;
`;

const Link = styled(NavLink)`
  font-size: 14px;
  text-decoration: none;
  color: ${colors.primary.black};
`;

const Auth = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const RegLink = styled.a`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.4);
  padding: 0 18px;
  border-right: 2px solid ${colors.primary.teal};
`;

const LoginButton = styled.button`
  border: 0;
  color: ${colors.primary.black};
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  background-color: ${colors.secondary.lightTeal};
  cursor: pointer;
  border-radius: 5px;
  padding: 5px 10px;
  font-weight: 500;
  font-size: 14px;
  transition: 500ms;
  &:hover {
    background: ${colors.secondary.lightTealHover};
  }
`;

const AccountInfoWrapper = styled.div`
  display: none;
  @media (max-width: 960px) {
    display: flex;
    flex: 1;
    justify-content: center;
  }
  @media (max-width: 600px) {
    flex: 0;
  }
`;

const Menu = styled.div`
  display: none;
  @media (max-width: 960px) {
    display: flex;
    flex: 1;
    justify-content: end;
  }
  @media (max-width: 600px) {
    flex: 0;
  }
`;

export const HeaderComponent = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated,
  );
  const navigate = useNavigate();

  return (
    <Header>
      <LogoWrapper>
        <LogoComponent type={'colored'} />
      </LogoWrapper>
      <NavWrapper>
        <Nav>
          <Link to={'/'}>Главная</Link>
          <Link to={'/'}>Тарифы</Link>
          <Link to={'/'}>FAQ</Link>
        </Nav>
      </NavWrapper>
      {isAuthenticated ? (
        <AccountWrapper>
          <AccountComponent />
        ) : (
          <Auth>
            <RegLink href={'/'}>Зарегистрироваться</RegLink>
            <LoginButton onClick={() => navigate('/login')}>Войти</LoginButton>
          </Auth>
        )}
      </Right>
      {isAuthenticated && (
        <AccountInfoWrapper>
          <AccountInfoComponent />
        </AccountInfoWrapper>
      )}
      <Menu>Menu</Menu>
    </Header>
  );
};
