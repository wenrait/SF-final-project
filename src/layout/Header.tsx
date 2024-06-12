import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { colors } from '../styles/globalStyles.ts';
import { LogoComponent } from '../components/Logo.tsx';
import { useAppSelector } from '../hooks.ts';
import { AccountComponent } from '../components/Account/Account.tsx';
import Hamburger from 'hamburger-react';
import { useContext } from 'react';
import { AppContext } from '../App.tsx';

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 93px;
  max-width: 1440px;
  padding: 0 60px;
  justify-content: space-between;
  align-items: center;
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

const AuthWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  flex: 1;
  @media (max-width: 960px) {
    display: none;
  }
`;

const RegLink = styled(NavLink)`
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

const HamburgerWrapper = styled.div`
  position: absolute;
  right: 30px;
  display: none;
  z-index: 11;
  > div {
    > div {
      height: 5px !important;
    }
  }
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
  const { isMenuOpen, setIsMenuOpen } = useContext(AppContext);
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
        </AccountWrapper>
      ) : (
        <AuthWrapper>
          <RegLink to={'/'}>Зарегистрироваться</RegLink>
          <LoginButton onClick={() => navigate('/login')}>Войти</LoginButton>
        </AuthWrapper>
      )}
      <HamburgerWrapper>
        <Hamburger
          size={30}
          duration={0.3}
          direction={'right'}
          distance={'sm'}
          color={isMenuOpen ? 'white' : colors.primary.teal}
          easing={'ease-out'}
          toggled={isMenuOpen}
          toggle={setIsMenuOpen}
        />
      </HamburgerWrapper>
    </Header>
  );
};
