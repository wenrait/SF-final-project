import { useEffect, useState } from "react";
import { useSearchHistogramsMutation } from "../redux/services/api/searchApi";
import { useAppSelector } from "../redux/services/hooks";
import { SearchHistogramsRes } from "../types";
import styled from "styled-components";
import { getDate } from "../utils/helpers";
import { CarouselButtonComponent } from "./Buttons/CarouselButton";
import Slider, { Settings } from "react-slick";

const StyledHistogramContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledDocumentsAmount = styled.p`
  font-size: 18px;
  line-height: 21.78px;
  letter-spacing: 0.02em;
  text-align: left;
  margin: 0;
  margin-bottom: 20px;
  color: rgba(148, 148, 148, 1);
`;

const StyledHisogramCarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledHistogram = styled.div`
  width: 100%;
  border: 2px solid rgba(2, 148, 145, 1);
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  position: relative;
  max-width: calc(100% - 80px);
`;

const StyledHistogramCarouselHeader = styled.div`
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  background:  rgba(2, 148, 145, 1);
  color: white;
  display: flex;
  flex-direction: column;
  padding: 18px 27px;
  gap: 25px;
  font-size: 18px;
  font-weight: 400;
  line-height: 21.78px;
  letter-spacing: 0.02em;
  text-align: left;
  box-sizing: border-box;
  width: 100%;
  max-width: 130px;
  min-width: 130px;
`;

const StyledWrapper = styled.div`
  width: 100%;
  overflow: hidden;

  & div.slick-slider {
    position: static;
  }

  & div.slick-slider div.slick-track div.slick-slide {
    margin: 18px 0;
    box-sizing: border-box;
    border-right: 2px solid rgba(148, 148, 148, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & div.slick-slider div.slick-track div.slick-slide:last-child {
    border: 0;
  }
`;

const StyledHistogramCarousel = styled(Slider)`
  display: flex;
  width: 100%;
  cursor: pointer
`;

const StyledCarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  font-size: 18px;
  font-weight: 400;
  line-height: 21.78px;
  letter-spacing: 0.02em;
  text-align: left;
  box-sizing: border-box;
  border-right: 2px solid rgba(148, 148, 148, 0.4);
  width: 100%;
  max-width: 130px;
  min-width: 130px;

  &:last-child {
    border: 0;
  }
`;


export const HistogramsCarouselComponent = () => {
  const searchReq = useAppSelector((state) => state.searchReducer)
  const [searchHistograms, { isLoading }] = useSearchHistogramsMutation();
  const [searchHistogramsRes, setSearchHistogramsRes] = useState<SearchHistogramsRes | null>(null);

  const [histograms, setHistograms] = useState<{date: string, total: number, risk: number}[] | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await searchHistograms(searchReq);
        if (result.data) {
          setSearchHistogramsRes(result.data)
        }
      } catch (e) {
        console.error(e)
      }
    };

    fetchData()
  }, [searchReq, searchHistograms]);

  useEffect(() => {
    if (searchHistogramsRes) {
      const sortedDates = searchHistogramsRes.data[0].data
        .map((item) => item.date)
        .sort((a, b) => new Date(a).valueOf() - new Date(b).valueOf());
      setHistograms(sortedDates.map((date) => ({
        date: getDate(date),
        total: Number(JSON.stringify(searchHistogramsRes.data[0].data.find((item) => (date === item.date))?.value)),
        risk: Number(JSON.stringify(searchHistogramsRes.data[1].data.find((item) => (date === item.date))?.value)),
      })))
    }
  }, [searchHistogramsRes, setHistograms]);

  useEffect(() => {
    if (histograms) {
      setSettings({
        infinite: false,
        speed: 500,
        slidesToShow: histograms.length >= 8 ? 8 : histograms.length,
        slidesToScroll: 1,
        swipeToSlide: true,
        prevArrow: <CarouselButtonComponent direction='left' $place="histogram" />,
        nextArrow: <CarouselButtonComponent direction='right' $place="histogram" />,
        responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: histograms.length >= 6 ? 6 : histograms.length,
          },
        },
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 650,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 450,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
      })
    }
  }, [histograms]);

  return (
    <StyledHistogramContainer>
      {searchHistogramsRes && (
      <StyledDocumentsAmount>
        Найдено {JSON.stringify(searchHistogramsRes.data[0].data.reduce((acc, curr) => acc + curr.value, 0))} вариантов
      </StyledDocumentsAmount>
    )}
    <StyledHisogramCarouselWrapper>
      <StyledHistogram>
          <StyledHistogramCarouselHeader>
            <div>Период</div>
            <div>Всего</div>
            <div>Риски</div>
          </StyledHistogramCarouselHeader>
          {isLoading && <div>Loading</div>}
          {searchHistogramsRes && histograms && (
            <StyledWrapper>
              <StyledHistogramCarousel key={JSON.stringify(settings)} {...settings}>
                {histograms.map((item) => (
                  <div key={`histogram-${item.date}`}>
                    <StyledCarouselItem>
                      <div>{item.date}</div>
                      <div>{item.total}</div>
                      <div>{item.risk}</div>
                  </StyledCarouselItem>
                  </div>
                ))}
              </StyledHistogramCarousel>
            </StyledWrapper>
            )}
        </StyledHistogram>
    </StyledHisogramCarouselWrapper>
    </StyledHistogramContainer>
  )
}