import HeaderLogo from '../assets/svg/logo__header.svg';
import FooterLogo from '../assets/svg/logo__footer.svg';
import styled from 'styled-components';

const Logo = styled.img`
  display: block;
`;

export interface LogoComponentsProps {
  place: 'header' | 'footer';
}

export const LogoComponent = ({ place }: LogoComponentsProps) => {
  const logo = place === 'header' ? HeaderLogo : FooterLogo;

  return <Logo src={logo} alt={'СКАН'} />;
};
