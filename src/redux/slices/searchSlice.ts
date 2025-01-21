import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISearchDate {
  startDate: string | null;
  endDate: string | null;
}

export enum ISearchTonality {
  Any = 'any',
  Positive = 'positive',
  Neutral = 'neutral',
  Negative = 'negative',
}

export interface ISearchState {
    issueDateInterval: ISearchDate;
    searchContext: {
      targetSearchEntitiesContext: {
        targetSearchEntities: [
          {
            type: 'company' | 'suggestedPersons';
            sparkId: number | null;
            entityId: number | null;
            inn: number | null;
            maxFullness: boolean;
            inBusinessNews: boolean;
          },
        ];
        onlyMainRole: boolean;
        tonality: ISearchTonality;
        onlyWithRiskFactors: boolean;
        riskFactors: {
          and: [];
          or: [];
          not: [];
        };
        themes: {
          and: [];
          or: [];
          not: [];
        };
      };
      themesFilter: {
        and: [];
        or: [],
        not: [],
      };
    };
    searchArea: {
      includedSources: [];
      excludedSources: [];
      includedSourceGroups: [];
      excludedSourceGroups: [];
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
}

export interface ISearchReqPayload {
  inn: number;
  tonality: ISearchTonality;
  limit: number;
  issueDateInterval: ISearchDate;
  maxFullness: boolean;
  inBusinessNews: boolean;
  onlyMainRole: boolean;
  excludeTechNews: boolean;
  excludeAnnouncements: boolean;
  excludeDigests: boolean;
}


const initialState: ISearchState = {
  issueDateInterval: {
    startDate: null,
    endDate: null,
  },
  searchContext: {
    targetSearchEntitiesContext: {
      targetSearchEntities: [
        {
          type: 'company',
          sparkId: null,
          entityId: null,
          inn: null,
          maxFullness: true,
          inBusinessNews: true,
        },
      ],
      onlyMainRole: true,
      tonality: ISearchTonality.Any,
      onlyWithRiskFactors: false,
      riskFactors: {
        and: [],
        or: [],
        not: [],
      },
      themes: {
        and: [],
        or: [],
        not: [],
      },
    },
    themesFilter: {
      and: [],
      or: [],
      not: [],
    },
  },
  searchArea: {
    includedSources: [],
    excludedSources: [],
    includedSourceGroups: [],
    excludedSourceGroups: [],
  },
  attributeFilters: {
    excludeTechNews: false,
    excludeAnnouncements: false,
    excludeDigests: false,
  },
  similarMode: 'duplicates',
  limit: null,
  sortType: 'sourceInfluence',
  sortDirectionType: 'desc',
  intervalType: 'month',
  histogramTypes: ['totalDocuments', 'riskFactors'],
};

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    setSearchReq: (state, action: PayloadAction<ISearchReqPayload>) => {
      const {
        inn,
        tonality,
        limit,
        issueDateInterval,
        maxFullness,
        inBusinessNews,
        onlyMainRole,
        excludeTechNews,
        excludeAnnouncements,
        excludeDigests,
      } = action.payload;
      state.searchContext.targetSearchEntitiesContext.targetSearchEntities[0].inn = inn;
      state.searchContext.targetSearchEntitiesContext.tonality = tonality;
      state.limit = limit;
      state.issueDateInterval = issueDateInterval;
      state.searchContext.targetSearchEntitiesContext.targetSearchEntities[0].maxFullness = maxFullness;
      state.searchContext.targetSearchEntitiesContext.targetSearchEntities[0].inBusinessNews = inBusinessNews;
      state.searchContext.targetSearchEntitiesContext.onlyMainRole = onlyMainRole;
      state.attributeFilters.excludeTechNews = excludeTechNews;
      state.attributeFilters.excludeAnnouncements = excludeAnnouncements;
      state.attributeFilters.excludeDigests = excludeDigests;
    },
  },
});

export const { setSearchReq } = searchSlice.actions;
