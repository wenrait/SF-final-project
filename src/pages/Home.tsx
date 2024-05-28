import styled from 'styled-components';
import { colors, fonts } from '../styles/globalStyles.ts';
import homeHeaderSvg from './../assets/svg/home__1.svg';

const HomeWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomeContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1320px;
  padding: 0 60px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HomeHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderTitle = styled.h1`
  font-family: ${fonts.Ferry};
  font-weight: 900;
  margin: 0;
  text-transform: uppercase;
`;

const HeaderDescription = styled.p`
  margin: 0;
  font-size: 20px;
`;

const HeaderButton = styled.button`
  background: ${colors.secondary.blue};
  color: ${colors.primary.white};
  font-family: ${fonts.Inter};
  cursor: pointer;
  border: 0;
  border-radius: 5px;
  padding: 16px 64px;
  width: fit-content;
`;

export const HomeComponent = () => {
  return (
    <HomeWrapper>
      <HomeContent>
        <HomeHeader>
          <HeaderLeft>
            <HeaderTitle>
              сервис по поиску
              <br /> публикаций
              <br /> о компании
              <br />
              по его ИНН
            </HeaderTitle>
            <HeaderDescription>
              Комплексный анализ публикаций, получение данных в формате PDF на
              электронную почту.
            </HeaderDescription>
            <HeaderButton>Запросить данные</HeaderButton>
          </HeaderLeft>
          <img src={homeHeaderSvg} alt={'ffdsf'} />
        </HomeHeader>
      </HomeContent>
    </HomeWrapper>
  );
};
