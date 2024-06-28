import { Search } from '../../types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISearchState {
  issueDateInterval: Search.DateInterval;
  searchContext: {
    targetSearchEntitiesContext: {
      targetSearchEntities: [
        {
          type: 'company';
          sparkId: null;
          entityId: null;
          inn: number | null; // TODO
          maxFullness: boolean;
          inBusinessNews: boolean | null;
        },
      ];
      onlyMainRole: boolean;
      tonality: 'any' | 'negative' | 'positive'; // TODO
      onlyWithRiskFactors: boolean;
    };
    attributeFilters: {
      excludeTechNews: boolean;
      excludeAnnouncements: boolean;
      excludeDigests: boolean;
    };
    similarMode: 'none' | 'duplicates';
    limit: number | null;
    sortType: 'issueDate' | 'sourceInfluence';
    sortDirectionType: 'desc' | 'asc';
    intervalType: 'day' | 'week' | 'month' | 'quarter' | 'year';
    histogramTypes: ('totalDocuments' | 'riskFactors')[];
  };
}

const initialState: ISearchState = {
  issueDateInterval: {
    startDate: '', // TODO
    endDate: '', // TODO
  },
  searchContext: {
    targetSearchEntitiesContext: {
      targetSearchEntities: [
        {
          type: 'company',
          sparkId: null,
          entityId: null,
          inn: null, // TODO
          maxFullness: true,
          inBusinessNews: null,
        },
      ],
      onlyMainRole: true,
      tonality: 'any', // TODO
      onlyWithRiskFactors: false,
    },
    attributeFilters: {
      excludeTechNews: true,
      excludeAnnouncements: true,
      excludeDigests: true,
    },
    similarMode: 'duplicates',
    limit: null, // TODO
    sortType: 'sourceInfluence',
    sortDirectionType: 'desc',
    intervalType: 'month',
    histogramTypes: ['totalDocuments', 'riskFactors'],
  },
};

export interface ISearchPayload {
  startDate: string;
  endDate: string;
  inn: number;
  tonality: 'any' | 'negative' | 'positive';
  limit: number;
}

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    setSearchData: (state, action: PayloadAction<ISearchPayload>) => {
      state.issueDateInterval.startDate = action.payload.startDate;
      state.issueDateInterval.endDate = action.payload.endDate;
      state.searchContext.targetSearchEntitiesContext.targetSearchEntities[0].inn =
        action.payload.inn;
      state.searchContext.targetSearchEntitiesContext.tonality =
        action.payload.tonality;
      state.searchContext.limit = action.payload.limit;
      state.issueDateInterval.startDate = action.payload.startDate;
    },
  },
});

export const { setSearchData } = searchSlice.actions;
