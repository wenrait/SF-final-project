import styled from 'styled-components';
// import { colors } from '../styles/globalStyles.ts';
import { ChangeEvent, FormEvent, useState } from 'react';
import {
  useSearchHistogramsMutation,
  useSearchMutation,
} from '../redux/services/api/searchApi.ts';
import { ButtonComponent } from './Button.tsx';
import { validateInn } from '../validators.ts';
import {useAppDispatch} from "../redux/services/hooks.ts";
import {setSearchData} from "../redux/slices/searchSlice.ts";

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

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 400;
  line-height: 19.36px;
  letter-spacing: 0.02em;
  color: rgba(148, 148, 148, 1);
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
`;
//
// const Auth = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
//   position: relative;
// `;
//
// const RecoveryLink = styled.a`
//   color: ${colors.secondary.blue};
//   font-size: 14px;
//   font-weight: 400;
//   line-height: 16.94px;
//   letter-spacing: 0.02em;
//   text-align: center;
//   text-decoration: underline;
// `;
//
// const ExternalAuth = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
// `;
//
// const ExternalAuthButtons = styled.div`
//   display: flex;
//   gap: 10px;
// `;
//
// const ExternalAuthButton = styled.button`
//   background: transparent;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 31px;
//   border-radius: 3px;
//   border: 1px solid rgba(89, 112, 255, 0.51);
//   flex: 1;
// `;
//
// const Text = styled.span`
//   font-size: 16px;
//   font-weight: 400;
//   line-height: 19.36px;
//   letter-spacing: 0.02em;
//   color: rgba(148, 148, 148, 1);
// `;
//
// const ErrorMessage = styled.span`
//   width: 100%;
//   text-align: center;
//   color: rgba(255, 89, 89, 1);
//   font-size: 14px;
//   line-height: 16.94px;
//   letter-spacing: 0.01em;
//   position: absolute;
//   top: -25px;
// `;

export const SearchFormComponent = () => {
  const [inn, setInn] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  // const [searchHistograms] = useSearchHistogramsMutation();
  // const [search] = useSearchMutation();

  const handleInnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInn(Number(e.target.value));
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(typeof e.target.value);
    setEndDate(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inn) {
      const { result, error } = validateInn(inn);
      if (!result) {
        console.log(error);
        return;
      }
    }

    if (!startDate || !endDate || endDate < startDate) {
      console.log(`Дата начала не должна превышать дату конца`);
      return;
    }

    dispatch(setSearchData({startDate, endDate, inn, limit, tonality}))

    // const reqPayload = {
    //   issueDateInterval: {
    //     startDate,
    //     endDate,
    //   },
    //   searchContext: {
    //     targetSearchEntitiesContext: {
    //       targetSearchEntities: [
    //         {
    //           type: 'company',
    //           sparkId: null,
    //           entityId: null,
    //           inn: inn,
    //           maxFullness: true,
    //           inBusinessNews: null,
    //         },
    //       ],
    //       onlyMainRole: true,
    //       tonality: 'any',
    //       onlyWithRiskFactors: false,
    //       riskFactors: {
    //         and: [],
    //         or: [],
    //         not: [],
    //       },
    //       themes: {
    //         and: [],
    //         or: [],
    //         not: [],
    //       },
    //     },
    //     themesFilter: {
    //       and: [],
    //       or: [],
    //       not: [],
    //     },
    //   },
    //   searchArea: {
    //     includedSources: [],
    //     excludedSources: [],
    //     includedSourceGroups: [],
    //     excludedSourceGroups: [],
    //   },
    //   attributeFilters: {
    //     excludeTechNews: true,
    //     excludeAnnouncements: true,
    //     excludeDigests: true,
    //   },
    //   similarMode: 'duplicates',
    //   limit: amount,
    //   sortType: 'sourceInfluence',
    //   sortDirectionType: 'desc',
    //   intervalType: 'month',
    //   histogramTypes: ['totalDocuments', 'riskFactors'],
    // };

    console.log()
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Inputs>
        <InputField>
          <Label htmlFor={'inn-input'}>ИНН компании *</Label>
          <Input
            $isError={false}
            placeholder={'10 цифр'}
            id={'inn-input'}
            type={'number'}
            onChange={handleInnChange}
          />
        </InputField>
        <InputField>
          <Label htmlFor={'amount-input'}>
            Количество документов в выдаче*
          </Label>
          <Input
            $isError={false}
            placeholder={'От 1 до 1000'}
            id={'amount-input'}
            type={'number'}
            onChange={handleAmountChange}
          />
        </InputField>
        <InputField>
          <Label>Диапазон поиска</Label>
          <DateInputs>
            <Input
              $isError={false}
              type={'date'}
              placeholder={'Дата начала'}
              id={'startDate-input'}
              onChange={handleStartDateChange}
            />
            <Input
              $isError={false}
              type={'date'}
              placeholder={'Дата конца'}
              id={'endDate-input'}
              onChange={handleEndDateChange}
            />
          </DateInputs>
        </InputField>
        <ButtonComponent
          font={'medium'}
          type={'submit'}
          width={'fit-content'}
          disabled={!inn || !startDate || !endDate || !amount}
          text={'Поиск'}
        />
      </Inputs>
    </Form>
  );
};
