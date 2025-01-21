import { useEffect, useState } from 'react';
import {
  useSearchMutation,
} from '../../redux/services/api/searchApi.ts';
import { useAppSelector } from '../../redux/services/hooks.ts';
import { SearchRes } from '../../types.ts';
import styled from 'styled-components';
import resultIcon from '../../assets/svg/Result__1.svg';
import { HistogramsCarouselComponent } from '../../components/HistogramsCarousel.tsx';
import { DocumentsComponent } from '../../components/Documents.tsx';

const StyledResults = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledResultsTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledResultsText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const StyledResultsTitle = styled.h1`
  margin: 0;
  padding: 0;
  font-family: Ferry;
  font-size: 40px;
  font-weight: 900;
  line-height: 48px;
  letter-spacing: 0.05em;
  text-align: left;
`;

const StyledResultsDescription = styled.p`
  margin: 0;
  padding: 0;
  font-size: 20px;
  line-height: 24.2px;
  letter-spacing: 0.02em;
  text-align: left;
`;

const StyledResultsPicture = styled.img`
  display: block;
  width: 100%;
  max-width: 553px;
`;

const StyledResultsSubtitle = styled.h2`
  font-family: Ferry;
  font-size: 30px;
  font-weight: 900;
  line-height: 36px;
  letter-spacing: 0.02em;
`;

const StyledHistogramsCarouselComponentWrapper = styled.div`
  display: flex;
`;

const StyledResultsDocumentsWrapper = styled.div`
  display: flex;
`;

export const ResultComponent = () => {
  // const [search] = useSearchMutation();
  // const searchReq = useAppSelector((state) => state.searchReducer)
  // const [searchRes, setSearchRes] = useState<SearchRes | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await search(searchReq);
  //       if (result.data) {
  //         setSearchRes(result.data);
  //       }
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   };

  //   fetchData()
  // }, [searchReq, search]);

  return (
    <StyledResults>
      <StyledResultsTop>
        <StyledResultsText>
          <StyledResultsTitle>
            Ищем. Скоро <br />будут результаты
          </StyledResultsTitle>
          <StyledResultsDescription>
            Поиск может занять некоторое время, <br />просим сохранять терпение.
          </StyledResultsDescription>
        </StyledResultsText>
        <StyledResultsPicture src={resultIcon} alt="Someone's looking at you" />
      </StyledResultsTop>
      <StyledResultsSubtitle>Общая сводка</StyledResultsSubtitle>
      <StyledHistogramsCarouselComponentWrapper>
        <HistogramsCarouselComponent />
      </StyledHistogramsCarouselComponentWrapper>
      <StyledResultsSubtitle>Список документов</StyledResultsSubtitle>
      <StyledResultsDocumentsWrapper>
        <DocumentsComponent />
      </StyledResultsDocumentsWrapper>
    </StyledResults>
  )
}