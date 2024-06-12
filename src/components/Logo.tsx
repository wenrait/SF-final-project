import coloredLogo from '../assets/svg/logo--colored.svg';
import whiteLogo from '../assets/svg/logo--white.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Logo = styled.img`
  width: 141px;
  height: 93px;
  cursor: pointer;
  display: block;
  object-fit: cover;
  @media (max-width: 961px) {
    width: 111px;
  }
`;

export interface LogoComponentsProps {
  type: 'colored' | 'white';
}

export const LogoComponent = ({ type }: LogoComponentsProps) => {
  const navigate = useNavigate();
  return (
    <Logo
      src={type === 'colored' ? coloredLogo : whiteLogo}
      alt="СКАН"
      onClick={() => navigate('/')}
    />
  );
};
