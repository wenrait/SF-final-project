import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { colors } from '../styles/globalStyles.ts';
import { LogoComponent } from '../components/Logo.tsx';

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
      </HeaderContent>
    </HeaderWrapper>
  );
};
