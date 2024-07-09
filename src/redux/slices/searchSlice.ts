import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISearchState {
  startDate: string | null;
  endDate: string | null;
  inn: number | null;
  maxFullness: boolean;
  inBusinessNews: boolean | null;
  onlyMainRole: boolean;
  tonality: 'any' | 'negative' | 'positive';
  onlyWithRiskFactors: boolean;
  similarMode: 'none' | 'duplicates';
  limit: number | null;
  sortType: 'sourceInfluence' | 'otherType';
  sortDirectionType: 'asc' | 'desc';
  intervalType: 'day' | 'week' | 'month' | 'quarter' | 'year';
  histogramTypes: ('totalDocuments' | 'riskFactors')[];
}

export const initialState: ISearchState = {
  startDate: null,
  endDate: null,
  inn: null,
  maxFullness: true,
  inBusinessNews: null,
  onlyMainRole: true,
  tonality: 'any',
  onlyWithRiskFactors: false,
  similarMode: 'duplicates',
  limit: null,
  sortType: 'sourceInfluence',
  sortDirectionType: 'desc',
  intervalType: 'month',
  histogramTypes: ['totalDocuments'],
};

export const searchSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setInn: (state, action: PayloadAction<number>) => {
      state.inn = action.payload;
    },
    setTonality: (
      state,
      action: PayloadAction<'any' | 'negative' | 'positive'>,
    ) => {
      state.tonality = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
  },
});

export const { setInn, setLimit, setEndDate, setStartDate, setTonality } =
  searchSlice.actions;
