import styled from 'styled-components';
import { colors } from '../styles/globalStyles.ts';

export interface ButtonComponentProps {
  font?: 'small' | 'medium';
  width: 'fit-content' | '100%';
  color?: 'blue' | 'grey';
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = styled.button<{
  $font: 'small' | 'medium';
  $width: 'fit-content' | '100%';
  $color: 'blue' | 'grey';
}>`
  background: ${(props) =>
    props.$color === 'blue' ? colors.secondary.blue : 'rgba(210, 210, 210, 1)'};
  color: ${(props) =>
    props.$color === 'blue' ? colors.primary.white : 'black'};
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: ${(props) => (props.$font === 'medium' ? '22px' : '20px')};
  font-weight: ${(props) => (props.$font === 'medium' ? 500 : 400)};
  width: ${(props) => props.$width};
  cursor: pointer;
  border: 0;
  border-radius: 5px;
  padding: 16px;
  transition: 500ms;

  &:disabled {
    opacity: 50%;
    cursor: default;
  }

  @media (max-width: 600px) {
    font-size: 20px;
    width: 100%;
  }

  &:hover:not(:disabled) {
    background: ${(props) =>
      props.$color === 'blue'
        ? colors.secondary.blueHover
        : 'rgb(173,173,173)'};
  }
`;

export const ButtonComponent = ({
  font = 'small',
  width,
  text,
  type,
  color = 'blue',
  disabled,
  onClick,
}: ButtonComponentProps) => {
  return (
    <Button
      $font={font}
      $width={width}
      $color={color}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};
