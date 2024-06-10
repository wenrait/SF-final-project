import HeaderLogoLarge from '../assets/svg/logo__header.svg';
import FooterLogoLarge from '../assets/svg/logo__footer.svg';
import HeaderLogoSmall from '../assets/svg/logo__header--mobile.svg';
import FooterLogoSmall from '../assets/svg/logo__footer--mobile.svg';
import styled from 'styled-components';

const LogoLarge = styled.img`
  display: block;
  @media (max-width: 601px) {
    display: none;
  }
`;

const LogoSmall = styled.img`
  display: none;
  @media (max-width: 600px) {
    display: block;
  }
`;

export interface LogoComponentsProps {
  place: 'header' | 'footer';
}

export const LogoComponent = ({ place }: LogoComponentsProps) => {
  const logoLarge = place === 'header' ? HeaderLogoLarge : FooterLogoLarge;
  const logoSmall = place === 'header' ? HeaderLogoSmall : FooterLogoSmall;

  return (
    <>
      <LogoLarge src={logoLarge} alt="СКАН" />
      <LogoSmall src={logoSmall} alt="СКАН" />
    </>
  );
};
