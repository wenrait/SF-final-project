import styled from 'styled-components';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { ButtonComponent } from '../Buttons/Button.tsx';
import { validateDate, validateInn, validateLimit } from '../../utils/validators.ts';
import checkIcon from '../../assets/png/SearchForm__check.png';
import { useSearchParams } from 'react-router-dom';
import { getTonality } from '../../utils/helpers.ts';

const Form = styled.form`
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(199, 199, 199, 1);
  border-radius: 10px;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 30px;
  width: 100%;
  max-width: 872px;
  flex: 1;
  box-sizing: border-box;
  @media (max-width: 960px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    padding: 14px;
  }
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Checkboxes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: 18px;
  line-height: 21.78px;
  letter-spacing: 0.03em;
  text-align: left;
  margin-top: 20px;

  @media (max-width: 960px) {
    display: none;
  }
`;

const Main = styled.div`
  display: flex;
  gap: 30px;
  @media (max-width: 960px) {
    display: block;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  width: 100%;
`;

const CheckboxField = styled.div`
  display: flex;
  gap: 17px;
`;

const Label = styled.label`
  font-size: 18px;
  line-height: 21.78px;
  letter-spacing: 0.03em;
  text-align: left;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const LabelStar = styled.span`
  font-size: 25px;
  line-height: 30.26px;
`;

const Input = styled.input<{ $isError: boolean }>`
  position: relative;
  font-size: 16px;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.94px;
  letter-spacing: 0.03em;
  border: 1px solid
    ${(props) =>
      props.$isError ? 'rgba(255, 89, 89, 1)' : 'rgba(199, 199, 199, 1)'};
  box-shadow: ${(props) =>
    props.$isError
      ? '0 0 20px 0 rgba(255, 89, 89, 0.2)'
      : '0 0 20px 0 rgba(0, 0, 0, 0.05)'};

  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  border-radius: 5px;
  padding: 12px 19px;
  text-align: center;
  width: 100%;
  max-width: 242px;
  box-sizing: border-box;
  color: ${(props) => (props.$isError ? 'rgba(255, 89, 89, 1)' : 'black')};
  @media (max-width: 960px) {
    max-width: none;
  }

  &:focus {
    outline: 1px solid
      ${(props) =>
        props.$isError ? 'rgba(255, 89, 89, 1)' : 'rgba(199, 199, 199, 1)'};
  }
`;

const Checkbox = styled.input`
  display: none;

  & + label {
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.4;
  }

  &:disabled + label {
    opacity: 0.4;
  }

  & + label:before {
    content: '';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: 1px solid black;
    box-sizing: border-box;
    cursor: pointer;
  }

  &:disabled + label:before {
    opacity: 0.4;
    cursor: default;
  }

  &:checked + label:before {
    cursor: pointer;
    background: url(${checkIcon}) no-repeat center;
  }
`;

const ErrorMessage = styled.span`
  position: absolute;
  top: 100%;
  margin-top: 2px;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.94px;
  letter-spacing: 0.01em;
  color: rgba(255, 89, 89, 1);
`;

const ErrorMessageDate = styled.span`
  font-size: 14px;
  line-height: 16.94px;
  letter-spacing: 0.01em;
  color: rgba(255, 89, 89, 1);
`;

const TonalitySelect = styled.div<{ $dropdownVisible: boolean }>`
  position: relative;
  font-size: 16px;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.94px;
  letter-spacing: 0.03em;
  border: 1px solid rgba(199, 199, 199, 1);
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 12px 19px;
  text-align: left;
  width: 100%;
  max-width: 242px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  @media (max-width: 960px) {
    max-width: none;
  }

  & {
    svg {
      ${(props) => props.$dropdownVisible && 'transform: rotate(180deg);'}
      transition: 300ms;
      path {
        transition: 300ms;
      }
    }
  }

  &:hover {
    svg {
      path {
        fill: #818181;
      }
    }
  }
`;

const Dropdown = styled.div`
  position: absolute;
  margin-top: 5px;
  background: white;
  top: 100%;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.94px;
  letter-spacing: 0.03em;
  border: 1px solid rgba(199, 199, 199, 1);
  border-radius: 5px;
  text-align: left;
  width: 100%;
  max-width: 242px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  box-sizing: border-box;

  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const Option = styled.div`
  background: white;
  font-family: Inter;
  text-align: left;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 12px 19px;
  box-sizing: border-box;
  transition: 300ms;

  &:hover {
    background: rgba(217, 217, 217, 1);
  }

  &:first-child {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }

  &:last-child {
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
`;

const FooterInner = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 960px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const DateInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const DateInputs = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const InputDate = styled.input<{ $isError: boolean }>`
  font-size: 16px;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.94px;
  letter-spacing: 0.03em;
  border: 1px solid
    ${(props) =>
      props.$isError ? 'rgba(255, 89, 89, 1)' : 'rgba(199, 199, 199, 1)'};
  box-shadow: ${(props) =>
    props.$isError
      ? '0 0 20px 0 rgba(255, 89, 89, 0.2)'
      : '0 0 20px 0 rgba(0, 0, 0, 0.05)'};

  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  border-radius: 5px;
  padding: 12px 19px;
  text-align: center;
  width: 100%;
  max-width: 176px;
  max-height: 43px;
  box-sizing: border-box;
  color: ${(props) => (props.$isError ? 'rgba(255, 89, 89, 1)' : 'black')};
  @media (max-width: 960px) {
    max-width: none;
  }
  &:focus {
    outline: 1px solid
      ${(props) =>
        props.$isError ? 'rgba(255, 89, 89, 1)' : 'rgba(199, 199, 199, 1)'};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Warning = styled.div`
  font-size: 14px;
  line-height: 16.94px;
  letter-spacing: 0.03em;
  color: rgba(148, 148, 148, 1);
`;

export const SearchFormComponent = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [inn, setInn] = useState<number | null>(null);
  const [innError, setInnError] = useState<string>('');

  const [tonality, setTonality] = useState<string>('Любая');

  const [limit, setLimit] = useState<number | null>(null);
  const [limitError, setLimitError] = useState<string>('');

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string>('');

  const [maxFullness, setMaxFullness] = useState(true);
  const [inBusinessNews, setInBusinessNews] = useState(true);

  const [onlyMainRole, setOnlyMainRole] = useState(true);
  // const [onlyRiskFactors, setOnlyRiskFactors] = useState(true);

  const [excludeTechNews, setExcludeTechNews] = useState(true);
  const [excludeAnnouncements, setExcludeAnnouncements] = useState(true);
  const [excludeDigests, setExcludeDigests] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleOutsideClick = (e: globalThis.MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef?.current?.contains(e.target as HTMLElement) &&
      !selectRef?.current?.contains(e.target as HTMLElement)
    ) {
      setDropdownVisible(false);
    }
  };

  const handleKeyDown = (e: globalThis.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setDropdownVisible(false);
    }
  };

  const handleInnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInnError('');
    const error = validateInn(Number(e.target.value));
    if (error) {
      setInnError(error);
      return;
    }
    setInn(Number(e.target.value));
  };

  const handleLimitChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLimitError('');
    const error = validateLimit(e.target.value);
    if (error) {
      setLimitError(error);
    }
    setLimit(Number(e.target.value));
  };

  const handleTonaltyChange = (tonality: string) => {
    setTonality(tonality);
    setDropdownVisible(false);
  };

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDateError('');
    if (endDate) {
      const error = validateDate(e.target.value, endDate);
      if (error) {
        setDateError(error);
      }
    }
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDateError('');
    if (startDate) {
      const error = validateDate(startDate, e.target.value);
      if (error) {
        setDateError(error);
      }
    }
    setEndDate(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inn && limit && startDate && endDate) {
      setSearchParams({
        inn: inn.toString(),
        tonality: getTonality(tonality),
        limit: limit.toString(),
        startDate: startDate.toString(),
        endDate: endDate.toString(),
        maxFullness: maxFullness.toString(),
        inBusinessNews: inBusinessNews.toString(),
        onlyMainRole: onlyMainRole.toString(),
        excludeTechNews: excludeTechNews.toString(),
        excludeAnnouncements: excludeAnnouncements.toString(),
        excludeDigests: excludeDigests.toString(),
      });
    }
  };

  const tonalties = ['Любая', 'Позитивная', 'Нейтральная', 'Негативная'];

  const arrow = (
    <svg
      width="20"
      height="11"
      viewBox="0 0 20 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0.717529H19.4351L9.71753 10.4351L0 0.717529Z"
        fill="#D9D9D9"
      />
    </svg>
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropdownRef]);

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [dropdownVisible]);

  useEffect(() => {
    console.log('searchParams', searchParams.entries);
  }, [searchParams]);

  return (
    <Form onSubmit={handleSubmit}>
      <Main>
        <Inputs>
          <InputField>
            <Label htmlFor={'inn'}>
              ИНН компании<LabelStar>*</LabelStar>
            </Label>
            <Input
              $isError={innError.length > 0}
              placeholder={'10 цифр'}
              id={'inn'}
              type={'number'}
              onChange={handleInnChange}
            />
            {innError.length > 0 && <ErrorMessage>{innError}</ErrorMessage>}
          </InputField>
          <InputField>
            <Label htmlFor={'tonality'}>Тональность</Label>
            <TonalitySelect
              $dropdownVisible={dropdownVisible}
              ref={selectRef}
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              {tonality}
              {arrow}
            </TonalitySelect>
            {dropdownVisible && (
              <Dropdown ref={dropdownRef}>
                {tonalties.map((tonalty) => (
                  <Option
                    key={tonalty}
                    onClick={() => handleTonaltyChange(tonalty)}
                  >
                    {tonalty}
                  </Option>
                ))}
              </Dropdown>
            )}
          </InputField>
          <InputField>
            <Label htmlFor={'limit'}>
              Количество документов в выдаче
              <sup>*</sup>
            </Label>
            <Input
              $isError={limitError.length > 0}
              placeholder={'От 1 до 1000'}
              id={'limit'}
              type={'number'}
              onChange={handleLimitChange}
            />
            {limitError.length > 0 && <ErrorMessage>{limitError}</ErrorMessage>}
          </InputField>
        </Inputs>
        <Checkboxes>
          <CheckboxField>
            <Checkbox
              type="checkbox"
              id={'maxFullness'}
              defaultChecked={maxFullness}
              onClick={() => setMaxFullness(!maxFullness)}
            />
            <CheckboxLabel htmlFor={'maxFullness'}>
              Признак максимальной полноты
            </CheckboxLabel>
          </CheckboxField>
          <CheckboxField>
            <Checkbox
              type="checkbox"
              id={'inBusinessNews'}
              defaultChecked={inBusinessNews}
              onClick={() => setInBusinessNews(!inBusinessNews)}
            />
            <CheckboxLabel htmlFor={'inBusinessNews'}>
              Упоминания в бизнес-контексте
            </CheckboxLabel>
          </CheckboxField>
          <CheckboxField>
            <Checkbox
              type="checkbox"
              id={'onlyMainRole'}
              defaultChecked={onlyMainRole}
              onClick={() => setOnlyMainRole(!onlyMainRole)}
            />
            <CheckboxLabel htmlFor={'onlyMainRole'}>
              Главная роль в публикации
            </CheckboxLabel>
          </CheckboxField>
          <CheckboxField>
            <Checkbox type="checkbox" id={'onlyRiskFactors'} disabled />
            <CheckboxLabel htmlFor={'onlyRiskFactors'}>
              Публикации только с риск-факторами
            </CheckboxLabel>
          </CheckboxField>
          <CheckboxField>
            <Checkbox
              type="checkbox"
              id={'excludeTechNews'}
              defaultChecked={excludeTechNews}
              onClick={() => setExcludeTechNews(!excludeTechNews)}
            />
            <CheckboxLabel htmlFor={'excludeTechNews'}>
              Включать технические новости рынков
            </CheckboxLabel>
          </CheckboxField>
          <CheckboxField>
            <Checkbox
              type="checkbox"
              id={'excludeAnnouncements'}
              defaultChecked={excludeAnnouncements}
              onClick={() => setExcludeAnnouncements(!excludeAnnouncements)}
            />
            <CheckboxLabel htmlFor={'excludeAnnouncements'}>
              Включать анонсы и календари
            </CheckboxLabel>
          </CheckboxField>
          <CheckboxField>
            <Checkbox
              type="checkbox"
              id={'excludeDigests'}
              defaultChecked={excludeDigests}
              onClick={() => setExcludeDigests(!excludeDigests)}
            />
            <CheckboxLabel htmlFor={'excludeDigests'}>
              Включать сводки новостей
            </CheckboxLabel>
          </CheckboxField>
        </Checkboxes>
      </Main>
      <Footer>
        <InputField>
          <Label>Диапазон поиска</Label>
          <FooterInner>
            <DateInputsWrapper>
              <DateInputs>
                <InputDate
                  $isError={dateError.length > 0}
                  type={'date'}
                  placeholder={'Дата начала'}
                  id={'startDate'}
                  onChange={handleStartDateChange}
                />
                <InputDate
                  $isError={dateError.length > 0}
                  type={'date'}
                  placeholder={'Дата конца'}
                  id={'endDate'}
                  onChange={handleEndDateChange}
                />
              </DateInputs>
              {dateError.length > 0 && (
                <ErrorMessageDate>{dateError}</ErrorMessageDate>
              )}
            </DateInputsWrapper>

            <ButtonWrapper>
              <ButtonComponent
                font={'medium'}
                type={'submit'}
                width={'100%'}
                disabled={
                  !inn ||
                  !startDate ||
                  !endDate ||
                  !limit ||
                  innError.length > 0 ||
                  limitError.length > 0 ||
                  dateError.length > 0
                }
                text={'Поиск'}
              />
              <Warning>* Обязательные к заполнению поля</Warning>
            </ButtonWrapper>
          </FooterInner>
        </InputField>
      </Footer>
    </Form>
  );
};
