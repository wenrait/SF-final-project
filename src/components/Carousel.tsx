import carouselSvg1 from '../assets/svg/Home__Carousel--1.svg';
import carouselSvg2 from '../assets/svg/Home__Carousel--2.svg';
import carouselSvg3 from '../assets/svg/Home__Carousel--3.svg';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CarouselButtonComponent } from './Buttons/CarouselButton';

const Carousel = styled(Slider)`
  padding: 0 40px;
  position: relative;
`;

const CarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 0 15px 0 #00000033;
  padding: 30px 20px;
  font-size: 18px;
  border-radius: 10px;
  margin: 15px;
  box-sizing: border-box;
  min-height: 270px;
  @media (max-width: 600px) {
    padding: 30px 16px;
  }
`;

const Icon = styled.img`
  width: fit-content;
`;

const Text = styled.span`
  line-height: 22px;
`;

export const CarouselComponent = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    prevArrow: <CarouselButtonComponent direction='left' />,
    nextArrow: <CarouselButtonComponent direction='right' />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const items = [
    {
      id: 'carousel-1',
      icon: carouselSvg1,
      text: 'Высокая и оперативная скорость обработки заявки',
    },
    {
      id: 'carousel-2',
      icon: carouselSvg2,
      text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос',
    },
    {
      id: 'carousel-3',
      icon: carouselSvg3,
      text: 'Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству',
    },
    {
      id: 'carousel-4',
      icon: carouselSvg1,
      text: 'Высокая и оперативная скорость обработки заявки',
    },
    {
      id: 'carousel-5',
      icon: carouselSvg2,
      text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос',
    },
    {
      id: 'carousel-6',
      icon: carouselSvg3,
      text: 'Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству',
    },
  ];

  return (
    <Carousel {...settings}>
      {items.map((item) => (
        <div key={item.id}>
          <CarouselItem>
            <Icon src={item.icon} alt={''} />
            <Text>{item.text}</Text>
          </CarouselItem>
        </div>
      ))}
    </Carousel>
  );
};
