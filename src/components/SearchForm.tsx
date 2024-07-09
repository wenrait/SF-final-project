import styled from 'styled-components';
import { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks.ts';
import { ButtonComponent } from './Button.tsx';
import {
  useSearchHistogramsMutation,
  useSearchMutation,
} from '../redux/services/api/searchApi.ts';
import { validateInn } from '../validateInn.ts';
import {
  setEndDate,
  setInn,
  setLimit,
  setStartDate,
} from '../redux/slices/searchSlice.ts';

const Form = styled.form`
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(199, 199, 199, 1);
  border-radius: 10px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
  max-width: 100%;
  flex: 1;
  box-sizing: border-box;
  @media (max-width: 960px) {
    max-width: 100%;
    width: 100%;
    margin-top: 60px;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 400;
  line-height: 21.78px;
  letter-spacing: 0.02em;
`;

const Input = styled.input<{ $isError: boolean }>`
  font-size: 16px;
  font-weight: 400;
  line-height: 19.36px;
  letter-spacing: 0.02em;
  border: 1px solid
    ${(props) =>
      props.$isError ? 'rgba(255, 89, 89, 1)' : 'rgba(199, 199, 199, 1)'};
  box-shadow: ${(props) =>
    props.$isError
      ? '0 0 10px 0 rgba(255, 89, 89, 0.2)'
      : '0 0 20px 0 rgba(0, 0, 0, 0.05)'};

  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  border-radius: 5px;
  padding: 12px 19px;
`;

const DateInputs = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;

export const SearchFormComponent = () => {
  const dispatch = useAppDispatch();

  const [search] = useSearchMutation();
  const [searchHistograms] = useSearchHistogramsMutation();

  const searchState = useAppSelector((state) => state.searchReducer);
  const inn = useAppSelector((state) => state.searchReducer.inn);
  const limit = useAppSelector((state) => state.searchReducer.limit);
  const startDate = useAppSelector((state) => state.searchReducer.startDate);
  const endDate = useAppSelector((state) => state.searchReducer.endDate);

  const handleChangeInn = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setInn(Number(e.target.value)));
    console.log(searchState);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateInn(inn!)) {
      console.log('Введенный ИНН некорректен');
      return;
    }

    if (limit! < 1 || limit! > 1000) {
      console.log('Лимит должен быть от 1 до 1000');
      return;
    }

    const now = new Date().toISOString().split('T')[0];
    if (startDate! > endDate!) {
      console.log('Дата начала не должна превышать дату конца');
      return;
    } else if (startDate! > now || endDate! > now) {
      console.log('Даты не могут быть больше текущей даты');
      return;
    }

    const searchPayload = {
      issueDateInterval: {
        startDate,
        endDate,
      },
      searchContext: {
        targetSearchEntitiesContext: {
          targetSearchEntities: [
            {
              type: 'company',
              sparkId: null,
              entityId: null,
              inn,
              maxFullness: true,
              inBusinessNews: null,
            },
          ],
          onlyMainRole: true,
          tonality: 'any',
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
        excludeTechNews: true,
        excludeAnnouncements: true,
        excludeDigests: true,
      },
      similarMode: 'duplicates',
      limit,
      sortType: 'sourceInfluence',
      sortDirectionType: 'desc',
      intervalType: 'month',
      histogramTypes: ['totalDocuments', 'riskFactors'],
    };

    try {
      const { data: objectsData, error: objectsError } =
        await search(searchPayload);
      const { data: histogramsData, error: histogramsError } =
        await searchHistograms(searchPayload);
      if (objectsError) {
        console.log('objectsError', objectsError);
      } else {
        console.log('objectsData', objectsData);
      }
      if (histogramsError) {
        console.log('histogramsError', histogramsError);
      } else {
        console.log('histogramsData', histogramsData);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      } else {
        console.log('Произошла неизвестная ошибка');
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor={'login'}>ИНН компании*</Label>
        <Input
          $isError={false}
          id={'input-login'}
          name={'inn'}
          type={'number'}
          placeholder={'10 цифр'}
          onChange={(e) => handleChangeInn(e)}
        />
      </Field>
      <Field>
        <Label htmlFor={'input-limit'}>Количество документов в выдаче*</Label>
        <Input
          $isError={false}
          id={'input-limit'}
          name={'limit'}
          type={'number'}
          placeholder={'От 1 до 1000'}
          onChange={(e) => dispatch(setLimit(Number(e.target.value)))}
        />
      </Field>
      <Label>Диапазон поиска*</Label>
      <DateInputs>
        <Input
          $isError={false}
          id={'input-startDate'}
          name={'startDate'}
          type={'date'}
          onChange={(e) => dispatch(setStartDate(e.target.value))}
        />
        <Input
          $isError={false}
          id={'input-endDate'}
          name={'endDate'}
          type={'date'}
          onChange={(e) => dispatch(setEndDate(e.target.value))}
        />
      </DateInputs>
      <ButtonComponent
        width={'fit-content'}
        text={'Поиск'}
        disabled={!inn || !limit || !startDate || !endDate}
      />
    </Form>
  );
};
