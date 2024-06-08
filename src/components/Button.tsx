import styled from 'styled-components';
import { colors, fonts } from '../styles/globalStyles.ts';

export interface ButtonComponentProps {
  fontSize: '20px' | '22px';
  text: string;
}

const Button = styled.button<Partial<ButtonComponentProps>>`
  background: ${colors.secondary.blue};
  color: ${colors.primary.white};
  font-family: ${fonts.Inter};
  font-size: ${(props) => props.fontSize};
  cursor: pointer;
  border: 0;
  border-radius: 5px;
  padding: 16px 64px;
  width: fit-content;
`;

export const ButtonComponent = ({ fontSize, text }: ButtonComponentProps) => {
  return <Button fontSize={fontSize}>{text}</Button>;
};
