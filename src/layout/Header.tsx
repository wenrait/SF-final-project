import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { colors } from '../styles/globalStyles.ts';
import { LogoComponent } from '../components/Logo.tsx';
import authDivider from '../assets/svg/auth__divider.svg';

const HeaderWrapper = styled.header`
  width: 100%;
  height: 93px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1320px;
  padding: 0 60px;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 14px;
`;

const HeaderNav = styled.nav`
  align-items: center;
  display: flex;
  gap: 50px;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 14px;
  text-decoration: none;
  color: ${colors.primary.black};
`;

const LogoWrapper = styled.div`
  position: absolute;
  left: 60px;
`;

const AuthContainer = styled.div`
  position: absolute;
  right: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const AuthLink = styled.a`
  text-decoration: none;
  color: ${colors.primary.black};
  opacity: 0.4;
`;

const AuthButton = styled.button`
  border: 0;
  color: ${colors.primary.black};
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  background-color: ${colors.secondary.lightTeal};
  cursor: pointer;
  border-radius: 5px;
  padding: 5px 10px;
  font-weight: 500;
  font-size: 14px;
`;

const AuthDivider = styled.img`
  display: block;
`;

export const HeaderComponent = () => {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <LogoWrapper>
          <LogoComponent place={'header'} />
        </LogoWrapper>
        <HeaderNav>
          <StyledNavLink to={'/'}>Главная</StyledNavLink>
          <StyledNavLink to={'/'}>Тарифы</StyledNavLink>
          <StyledNavLink to={'/'}>FAQ</StyledNavLink>
        </HeaderNav>
        <AuthContainer>
          <AuthButtons>
            <AuthLink href={'/'}>Зарегистрироваться</AuthLink>
            <AuthDivider src={authDivider} alt={''} />
            <AuthButton>Войти</AuthButton>
          </AuthButtons>
        </AuthContainer>
      </HeaderContent>
    </HeaderWrapper>
  );
};
