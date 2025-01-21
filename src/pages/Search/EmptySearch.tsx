import styled from "styled-components";
import documentIcon from '../../assets/svg/Search__document.svg';
import foldersIcon from '../../assets/svg/Search__folders.svg';
import backgroundSVG from '../../assets/svg/Search__group.svg';
import { SearchFormComponent } from "../../components/SearchForm/SearchForm";

const StyledEmptySearch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  @media (max-width: 960px) {
    max-width: 100%;
  }
`;

const StyledEmptySearchTitle = styled.h1`
  position: relative;
  margin: 0;
  font-family: Ferry, Arial, sans-serif;
  font-size: 40px;
  font-weight: 900;
  line-height: 48px;
  letter-spacing: 0.02em;
  text-align: left;
  z-index: 2;
  @media (max-width: 960px) {
    line-height: 36px;
    font-size: 30px;
  }
  @media (max-width: 600px) {
    font-size: 22px;
    line-height: 26px;
  }
`;

const StyledDocumentIcon = styled.img`
  position: absolute;
  top: 80%;
  left: 105%;
  @media (max-width: 960px) {
    top: 50%;
    left: 90%;
  }
  @media (max-width: 600px) {
    max-width: 60px;
    top: 50%;
    left: 90%;
  }
`;

const StyledFoldersIcon = styled.img`
  position: absolute;
  top: 80%;
  left: 140%;
  @media (max-width: 960px) {
    display: none;
  }
`;

const StyledEmptySearchDescription = styled.span`
  font-family: Inter;
  font-size: 20px;
  font-weight: 400;
  line-height: 24.2px;
  letter-spacing: 0.03em;
  text-align: left;

  @media (max-width: 600px) {
    font-size: 18px;
    font-family: Inter;
    line-height: 21.78px;
  }
`;

const StyledSearchFormWrapper = styled.div`
  margin: 25px 0 25px -7px;
  position: relative;
  @media (max-width: 960px) {
    margin-left: 0;
  }

  @media (max-width: 600px) {
    margin: 0;
  }
`;

const StyledBackgroundImage = styled.img`
  position: absolute;
  top: 10%;
  right: -60%;
  @media (max-width: 960px) {
    display: none;
  }
`;

export const EmptySearchComponent = () => {
  return (
    <StyledEmptySearch>
      <StyledEmptySearchTitle>
        Найдите необходимые
        <br /> данные в пару кликов.
        <StyledDocumentIcon src={documentIcon} />
        <StyledFoldersIcon src={foldersIcon} />
      </StyledEmptySearchTitle>
      <StyledEmptySearchDescription>
        Задайте параметры поиска.
        <br />
        Чем больше заполните, тем точнее поиск
      </StyledEmptySearchDescription>
      <StyledSearchFormWrapper>
        <SearchFormComponent />
        <StyledBackgroundImage src={backgroundSVG} />
      </StyledSearchFormWrapper>
    </StyledEmptySearch>
  )
}