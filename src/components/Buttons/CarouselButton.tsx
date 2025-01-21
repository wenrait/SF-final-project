import styled, { css } from "styled-components";
import arrowLeft from '../../assets/svg/Home__Carousel__arrow--left.svg';
import arrowRight from '../../assets/svg/Home__Carousel__arrow--right.svg';

export interface CarouselButtonProps {
  onClick?: () => void;
  direction: 'left' | 'right';
  $place?: 'histogram';
}

const CarouselButtonCSS = css<{$place?: 'histogram'}>`
  padding: 0;
  background: transparent;
  border: 0;
  cursor: pointer;
  position: absolute;
  top: calc(50% - 20px);
  border-radius: 10px;
  transition: 500ms;

  &:hover {
    transform: scale(1.25, 1.25);
  }
`;

const StyledLeftButton = styled.button<{$place?: 'histogram'}>`
  ${CarouselButtonCSS};
  left: ${(props) => props.$place === 'histogram' ? '-40px' : '0'};
`;

const StyledRightButton = styled.button<{$place?: 'histogram'}>`
  ${CarouselButtonCSS};
  right: ${(props) => props.$place === 'histogram' ? '-40px' : '0'};
`;

const StyledIcon = styled.img`
  width: fit-content;
`;

export const CarouselButtonComponent = ({onClick, direction, $place}: CarouselButtonProps) => {
  switch (direction) {
    case 'left':
      return (
        <StyledLeftButton onClick={onClick} $place={$place}>
          <StyledIcon src={arrowLeft} alt={'Backwards'} />
        </StyledLeftButton>
      )
    case 'right':
      return (
        <StyledRightButton onClick={onClick} $place={$place}>
          <StyledIcon src={arrowRight} alt={'Backwards'} />
        </StyledRightButton>
      )
  }
}