import styled, {css} from "styled-components";
import {colors} from "../styles/globalStyles.ts";
import iconBeginner from '../assets/svg/Tariff__beginner.svg';
import iconPro from '../assets/svg/Tariff__pro.svg';
import iconBusiness from '../assets/svg/Tariff__business.svg';


const Tariff = styled.div<{  type: 'beginner' | 'pro' | 'business' }>`
  border: ${props => props.type === 'beginner' ? `2px solid ${colors.secondary.orange}` : 0};
`;

const TariffHeader = styled.div<{  type: 'beginner' | 'pro' | 'business' }>`
    background: ${props => {
        switch (props.type) {
          case 'beginner':
              return colors.secondary.orange;
          case 'pro':
              return colors.secondary.lightTeal;
          case 'business':
              return colors.primary.black;
        }
    }}
`;

export interface TariffComponentProps {
    type: 'beginner' | 'pro' | 'business';
}

export const TariffComponent = ({type}: TariffComponentProps) => {

    const getIcon = () => {
        switch (type) {
            case 'beginner':
                return <img src={iconBeginner} alt={'beginner'} />
            case 'pro':
                return <img src={iconPro} alt={'pro'} />
            case 'business':
                return <img src={iconBusiness} alt={'business'} />
        }
    }
    
    return (
        <Tariff type={type}>
            <TariffHeader type={}
        </Tariff>
    )
}