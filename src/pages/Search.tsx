import { SearchFormComponent } from '../components/SearchForm.tsx';
import styled from 'styled-components';

const Search = styled.div`
  width: 100%;
  max-width: 1440px;
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60%;
  gap: 14px;
  @media (max-width: 960px) {
    max-width: 100%;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-family: Ferry, Arial, sans-serif;
  font-size: 40px;
  font-weight: 900;
  line-height: 48px;
  letter-spacing: 0.02em;
  text-align: left;
  @media (max-width: 960px) {
    line-height: 36px;
    font-size: 30px;
  }
  @media (max-width: 600px) {
    font-size: 22px;
    line-height: 26px;
  }
`;

const Description = styled.div`
  font-size: 20px;
  font-weight: 400;
  line-height: 24.2px;
  letter-spacing: 0.02em;
  text-align: left;
`;

export const SearchPage = () => {
  return (
    <Search>
      <Content>
        <Title>
          Найдите необходимые<br /> данные в пару кликов.
        </Title>
        <Description>
          Задайте параметры поиска.
          Чем больше заполните, тем точнее поиск
        </Description>
        <SearchFormComponent />
      </Content>

    </Search>
  );
};
