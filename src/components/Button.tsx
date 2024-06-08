import styled from 'styled-components';
import { colors } from '../styles/globalStyles.ts';

export interface ButtonComponentProps {
  font: 'small' | 'medium';
  width: 'fit-content' | '100%';
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

const Button = styled.button<{
  $font: 'small' | 'medium';
  $width: 'fit-content' | '100%';
}>`
  background: ${colors.secondary.blue};
  color: ${colors.primary.white};
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: ${(props) => (props.$font === 'medium' ? '22px' : '20px')};
  font-weight: ${(props) => (props.$font === 'medium' ? 500 : 400)};
  width: ${(props) => props.$width};
  cursor: pointer;
  border: 0;
  border-radius: 5px;
  padding: 16px 64px;

  &:disabled {
    opacity: 50%;
    cursor: default;
  }
`;

export const ButtonComponent = ({
  font,
  width,
  text,
  type,
  disabled,
}: ButtonComponentProps) => {
  return (
    <Button $font={font} $width={width} type={type} disabled={disabled}>
      {text}
    </Button>
  );
};
