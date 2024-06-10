import styled from 'styled-components';
import { colors } from '../styles/globalStyles.ts';
import iconBeginner from '../assets/svg/Tariff__beginner.svg';
import iconPro from '../assets/svg/Tariff__pro.svg';
import iconBusiness from '../assets/svg/Tariff__business.svg';
import iconList from '../assets/svg/Tariff__list__icon.svg';
import { ButtonComponent } from './Button.tsx';

export interface TariffComponentProps {
  type: 'beginner' | 'pro' | 'business';
}

const tariffs = {
  beginner: {
    header: {
      icon: iconBeginner,
      title: 'Beginner',
      description: 'Для небольшого исследования',
    },
    content: {
      priceWithDiscount: 799,
      priceWithoutDiscount: 1200,
      installment: 'или 150 ₽/мес. при рассрочке на 24 мес.',
      features: [
        'Безлимитная история запросов',
        'Безопасная сделка',
        'Поддержка 24/7',
      ],
    },
  },
  pro: {
    header: {
      icon: iconPro,
      title: 'Pro',
      description: 'Для HR и фрилансеров',
    },
    content: {
      priceWithDiscount: 1299,
      priceWithoutDiscount: 2600,
      installment: 'или 279 ₽/мес. при рассрочке на 24 мес.',
      features: [
        'Все пункты тарифа Beginner',
        'Экспорт истории',
        'Рекомендации по приоритетам',
      ],
    },
  },
  business: {
    header: {
      icon: iconBusiness,
      title: 'Business',
      description: 'Для корпоративных клиентов',
    },
    content: {
      priceWithDiscount: 2379,
      priceWithoutDiscount: 3700,
      installment: '',
      features: [
        'Все пункты тарифа Pro',
        'Безлимитное количество запросов',
        'Приоритетная поддержка',
      ],
    },
  },
};

const Tariff = styled.div<TariffComponentProps>`
  border: ${(props) =>
    props.type === 'beginner' ? `2px solid ${colors.secondary.orange}` : 0};
  border-radius: 10px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  flex: 1;
  min-width: 405px;
`;

const Header = styled.div<TariffComponentProps>`
  background: ${(props) => {
    switch (props.type) {
      case 'beginner':
        return colors.secondary.orange;
      case 'pro':
        return colors.secondary.lightTeal;
      case 'business':
        return colors.primary.black;
    }
  }};
  color: ${(props) => props.type === 'business' && colors.primary.white};
  position: relative;
  padding: 30px;
  border-radius: 10px 10px 0 0;
`;

const Title = styled.h3`
  margin: 0;
  font-weight: 500;
  font-size: 30px;
`;

const Description = styled.span`
  font-size: 18px;
`;

const Icon = styled.img`
  position: absolute;
  top: 11px;
  right: 16px;
`;

const Content = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Price = styled.div`
  display: flex;
  gap: 20px;
  font-size: 30px;
  font-weight: 500;
`;

const WithDiscount = styled.span``;

const WithoutDiscount = styled.span`
  text-decoration: line-through;
  opacity: 50%;
`;

const Installment = styled.span`
  font-weight: 400;
  font-size: 18px;
  margin-right: -20px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ListTitle = styled.h4`
  margin: 0;
  font-weight: 500;
  font-size: 20px;
`;

const List = styled.ul`
  list-style: none;
  gap: 5px;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  position: relative;
  padding-left: 30px;
  font-size: 18px;
  &::before {
    width: 20px;
    height: 20px;
    content: url(${iconList});
    position: absolute;
    left: 0;
    top: 2px;
  }
`;

export const TariffComponent = ({ type }: TariffComponentProps) => {
  const { icon, title, description } = tariffs[type].header;
  const {
    priceWithDiscount: withDiscount,
    priceWithoutDiscount: withoutDiscount,
    installment,
    features,
  } = tariffs[type].content;

  return (
    <Tariff type={type}>
      <Header type={type}>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Icon src={icon} />
      </Header>
      <Content>
        <PriceContainer>
          <Price>
            <WithDiscount>{withDiscount} ₽</WithDiscount>
            <WithoutDiscount>{withoutDiscount} ₽</WithoutDiscount>
          </Price>
          {installment.length > 0 ? (
            <Installment>{installment}</Installment>
          ) : (
            <br />
          )}
        </PriceContainer>
        <ListContainer>
          <ListTitle>В тариф входит:</ListTitle>
          <List>
            {features.map((feature, index) => (
              <ListItem key={`tariff-feature-${index}`}>{feature}</ListItem>
            ))}
          </List>
        </ListContainer>
        <ButtonComponent font={'small'} width={'100%'} text={'Подробнее'} />
      </Content>
    </Tariff>
  );
};
