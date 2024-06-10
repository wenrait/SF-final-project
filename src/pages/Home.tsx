import styled from 'styled-components';
import homeSvg1 from './../assets/svg/home__1.svg';
import homeSvg2 from './../assets/svg/home__2.svg';
import { TariffComponent } from '../components/Tariff.tsx';
import { ButtonComponent } from '../components/Button.tsx';
import { CarouselComponent } from '../components/Carousel.tsx';
import { useAppSelector } from '../hooks.ts';

const Home = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1440px;
  padding: 0 60px;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 100px;
  box-sizing: border-box;
  @media (max-width: 960px) {
    padding: 0 30px;
  }
  @media (max-width: 600px) {
    padding: 0 14px;
  }
`;

const Top = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 960px) {
    flex-wrap: wrap;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-family: Ferry, Arial, sans-serif;
  font-weight: 900;
  font-size: 60px;
  line-height: 72px;
  margin: 0;
  text-transform: uppercase;
  @media (max-width: 960px) {
    font-size: 45px;
    line-height: 54px;
  }
  @media (max-width: 600px) {
    font-size: 28px;
    line-height: 34px;
  }
`;

const Description = styled.p`
  font-size: 20px;
  margin: 0 0 50px;
  @media (max-width: 600px) {
    font-size: 18px;
    margin: 0;
  }
`;

const TopSvg = styled.img`
  width: 45%;
  @media (max-width: 960px) {
    width: 100%;
  }
`;

const ButtonDesktop = styled.div`
  display: block;
  @media (max-width: 601px) {
    display: none;
  }
`;

const ButtonMobile = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: block;
  }
`;

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 70px;
  @media (max-width: 600px) {
    gap: 30px;
  }
`;

const Subtitle = styled.h2`
  margin: 0;
  font-weight: 900;
  font-size: 45px;
  text-transform: uppercase;
  font-family: Ferry, Arial, sans-serif;
  @media (max-width: 960px) {
    font-size: 28px;
    line-height: 34px;
  }
`;

const Tariffs = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 100px;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    margin-bottom: 40px;
  }
`;

export const HomePage = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated,
  );

  return (
    <Home>
      <Content>
        <Top>
          <Text>
            <Title>
              сервис по поиску
              <br /> публикаций
              <br /> о компании
              <br />
              по его ИНН
            </Title>
            <Description>
              Комплексный анализ публикаций, получение данных <br /> в формате
              PDF на электронную почту.
            </Description>
            {isAuthenticated && (
              <>
                <ButtonDesktop>
                  <ButtonComponent
                    font={'medium'}
                    width={'fit-content'}
                    text={'Запросить данные'}
                  />
                </ButtonDesktop>
                <ButtonMobile>
                  <ButtonComponent
                    font={'small'}
                    width={'100%'}
                    text={'Запросить данные'}
                  />
                </ButtonMobile>
              </>
            )}
          </Text>
          <TopSvg src={homeSvg1} alt={''} />
        </Top>
        <Section>
          <Subtitle>Почему именно мы</Subtitle>
          <CarouselComponent />
          <img src={homeSvg2} alt={''} />
        </Section>
        <Section>
          <Subtitle>Наши тарифы</Subtitle>
          <Tariffs>
            <TariffComponent type={'beginner'} />
            <TariffComponent type={'pro'} />
            <TariffComponent type={'business'} />
          </Tariffs>
        </Section>
      </Content>
    </Home>
  );
};
