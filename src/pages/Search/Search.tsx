import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { validateDate, validateInn, validateLimit, validateTonality } from '../../utils/validators.ts';
import { EmptySearchComponent } from './EmptySearch.tsx';
import { ResultComponent } from './Result.tsx';
import { useAppDispatch } from '../../redux/services/hooks.ts';
import { ISeachTonality, setSearchReq } from '../../redux/slices/searchSlice.ts';

const Search = styled.div`
  width: 100%;
  max-width: 1440px;
  display: flex;
  justify-content: space-between;
  padding: 0 60px;
  box-sizing: border-box;
  @media (max-width: 960px) {
    padding: 30px;
    display: block;
  }
  @media (max-width: 600px) {
    padding: 14px;
  }
`;

export const SearchPage = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const inn = Number(searchParams.get('inn'));
  const tonality = searchParams.get('tonality');
  const limit = searchParams.get('limit');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const maxFullness = Boolean(searchParams.get('maxFullness'));
  const inBusinessNews = Boolean(searchParams.get('inBusinessNews'));
  const onlyMainRole = Boolean(searchParams.get('onlyMainRole'));
  const excludeTechNews = Boolean(searchParams.get('excludeTechNews'));
  const excludeAnnouncements = Boolean(searchParams.get('excludeAnnouncements'));
  const excludeDigests = Boolean(searchParams.get('excludeDigests'));

  useEffect(() => {
    if (
      !inn || 
      validateInn(inn) || 
      !tonality || 
      validateTonality(tonality) || 
      !limit || 
      validateLimit(limit) || 
      !startDate || 
      !endDate || validateDate(startDate, endDate) ||
      !maxFullness ||
      !inBusinessNews ||
      !onlyMainRole ||
      !excludeTechNews ||
      !excludeAnnouncements ||
      !excludeDigests
    ) {
      navigate('/search')
    } else {
      dispatch(setSearchReq({
        inn, tonality: tonality as ISeachTonality, limit: Number(limit),
        issueDateInterval: {
          startDate, 
          endDate
        },
        maxFullness,
        inBusinessNews,
        onlyMainRole,
        excludeTechNews,
        excludeAnnouncements,
        excludeDigests,
      }))
  }}, [inn, validateInn, tonality, validateTonality, limit, validateLimit, maxFullness]);

  return (
    <Search>
      {searchParams.size > 0 ? (
        <ResultComponent />
      ) : (
        <EmptySearchComponent />
      )}
    </Search>
  );
};
