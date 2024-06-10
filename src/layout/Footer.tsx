import styled from 'styled-components';
import { colors } from '../styles/globalStyles.ts';
import { LogoComponent } from '../components/Logo.tsx';

const FooterWrapper = styled.footer`
  width: 100%;
  height: 137px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.primary.teal};
  color: ${colors.primary.white};
`;

const FooterContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1440px;
  padding: 0 60px;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 14px;
  box-sizing: border-box;
`;

const LogoWrapper = styled.div`
  position: absolute;
  left: 60px;
`;

const FooterRight = styled.div`
  position: absolute;
  right: 60px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: end;
`;

const Contacts = styled.div``;

const Copyright = styled.div`
  font-size: 12px;
`;

export const FooterComponent = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <LogoWrapper>
          <LogoComponent place={'footer'} />
        </LogoWrapper>
        <FooterRight>
          <Contacts>
            <span>
              г. Москва, Цветной б-р, 40
              <br />
              +7 495 771 21 11
              <br />
              info@skan.ru
            </span>
          </Contacts>
          <Copyright>Copyright, 2022</Copyright>
        </FooterRight>
      </FooterContent>
    </FooterWrapper>
  );
};
