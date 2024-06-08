import styled, { css } from 'styled-components';
import { colors, fonts } from '../styles/globalStyles.ts';
import homeSvg1 from './../assets/svg/home__1.svg';
import homeSvg2 from './../assets/svg/home__2.svg';
import carouselSvg1 from './../assets/svg/Home__Carousel--1.svg';
import carouselSvg2 from './../assets/svg/Home__Carousel--2.svg';
import carouselSvg3 from './../assets/svg/Home__Carousel--3.svg';
import arrowLeft from './../assets/svg/Home__Carousel__arrow--left.svg';
import arrowRight from './../assets/svg/Home__Carousel__arrow--right.svg';
import { TariffComponent } from '../components/Tariff.tsx';
// import { usePostAuthDataMutation } from '../api/login-api.ts';

const HomeWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1320px;
  padding: 0 60px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HomeHeader = styled.section`
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
  font-size: 60px;
  line-height: 72px;
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

const CarouselContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 70px;
`;

const CarouselTitle = styled.h2`
  margin: 0;
  font-weight: 900;
  font-size: 45px;
`;

const Carousel = styled.div`
  width: 100%;
  display: flex;
  padding: 0 40px;
  gap: 30px;
  position: relative;
  box-sizing: border-box;
`;

const CarouselItem = styled.div`
  box-shadow: 0 0 20px 0 #00000033;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 20px;
  font-size: 18px;
  border-radius: 10px;
  flex: 1;
`;

const StyledImage = styled.img`
  width: fit-content;
`;

const CarouselButtonCSS = css`
  padding: 0;
  background: transparent;
  border: 0;
  cursor: pointer;
  position: absolute;
  top: calc(50% - 20px);
`;

const LeftButton = styled.button`
  ${CarouselButtonCSS};
  left: 0;
`;

const RightButton = styled.button`
  ${CarouselButtonCSS};
  right: 0;
`;

const TariffsContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 70px;
`;

const TariffsTitle = styled.h2`
  margin: 0;
  font-weight: 900;
  font-size: 45px;
  text-transform: uppercase;
`;

const Tariffs = styled.div`
  display: flex;
  gap: 30px;
`;

export const HomeComponent = () => {
  // const [postAuthData] = usePostAuthDataMutation();
  //
  // let token = '';
  //
  // const handleClick = async () => {
  //   try {
  //     const { data, error } = await postAuthData({
  //       login,
  //       password,
  //     });
  //     if (error) {
  //       console.error(error.data.message);
  //     }
  //     if (data) {
  //       token = data.accessToken;
  //       console.log(token);
  //     }
  //   } catch (error) {
  //     console.log(`Error: ${error}`);
  //   }
  // };

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
          <img src={homeSvg1} alt={''} />
        </HomeHeader>
        <CarouselContainer>
          <CarouselTitle>Почему именно мы</CarouselTitle>
          <Carousel>
            <LeftButton>
              <StyledImage src={arrowLeft} alt={'Backwards'} />
            </LeftButton>
            <CarouselItem>
              <StyledImage src={carouselSvg1} alt={''} />
              <span>Высокая и оперативная скорость обработки заявки</span>
            </CarouselItem>
            <CarouselItem>
              <StyledImage src={carouselSvg2} alt={''} />
              <span>
                Огромная комплексная база данных, обеспечивающая объективный
                ответ на запрос
              </span>
            </CarouselItem>
            <CarouselItem>
              <StyledImage src={carouselSvg3} alt={''} />
              <span>
                Защита конфиденциальных сведений, не подлежащих разглашению по
                федеральному законодательству
              </span>
            </CarouselItem>
            <RightButton>
              <StyledImage src={arrowRight} alt={'Forwards'} />
            </RightButton>
          </Carousel>
          <img src={homeSvg2} alt={''} />
        </CarouselContainer>
        <TariffsContainer>
          <TariffsTitle>Наши тарифы</TariffsTitle>
          <Tariffs>
            <TariffComponent type={'beginner'} />
            <TariffComponent type={'pro'} />
            <TariffComponent type={'business'} />
          </Tariffs>
        </TariffsContainer>
      </HomeContent>
    </HomeWrapper>
  );
};
