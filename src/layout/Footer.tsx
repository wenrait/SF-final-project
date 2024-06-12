import styled from 'styled-components';
import { colors } from '../styles/globalStyles.ts';
import { LogoComponent } from '../components/Logo.tsx';

const Footer = styled.div`
  display: flex;
  width: 100%;
  height: 137px;
  max-width: 1440px;
  padding: 0 60px;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 14px;
  box-sizing: border-box;
  color: ${colors.primary.white};
`;

const LogoWrapper = styled.div`
  position: absolute;
  left: 60px;
`;

const Contacts = styled.div`
  position: absolute;
  right: 60px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: end;
`;

const Text = styled.div``;

const Copyright = styled.div`
  font-size: 12px;
`;

export const FooterComponent = () => {
  return (
    <Footer>
      <LogoWrapper>
        <LogoComponent type={'white'} />
      </LogoWrapper>
      <Contacts>
        <Text>
          <span>
            г. Москва, Цветной б-р, 40
            <br />
            +7 495 771 21 11
            <br />
            info@skan.ru
          </span>
        </Text>
        <Copyright>Copyright, 2022</Copyright>
      </Contacts>
    </Footer>
  );
};
