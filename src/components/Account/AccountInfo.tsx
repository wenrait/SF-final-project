import { useGetAccountInfoQuery } from '../../api/accountInfoApi.ts';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks.ts';
import { handleRTKQueryError } from '../../redux/handleError.ts';

const Info = styled.div`
  padding: 12px;
  display: flex;
  gap: 8px;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  background: rgba(217, 217, 217, 0.3);
  border-radius: 5px;
  line-height: 12px;
  @media (max-width: 600px) {
    align-items: flex-start;
    padding: 5px 10px;
  }
`;

const Container = styled.div`
  display: flex;
  gap: 7px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Text = styled.span`
  display: flex;
  opacity: 40%;
  font-size: 10px;
  margin-left: auto;
  white-space: nowrap;
  @media (max-width: 600px) {
    font-size: 8px;
  }
`;

const Count = styled.span`
  font-weight: 700;
  font-size: 14px;
`;

const Limit = styled.span`
  font-weight: 700;
  font-size: 14px;
  color: rgba(138, 197, 64, 1);
`;

export const AccountInfoComponent = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated,
  );
  const { data, isLoading, error } = useGetAccountInfoQuery(
    {},
    { skip: !isAuthenticated },
  );

  if (isLoading) {
    return <Info>Loading...</Info>;
  }

  if (error) {
    if ('status' in error) {
      const message = handleRTKQueryError(error);
      return <Info>{message}</Info>;
    }
  }

  if (data) {
    return (
      <Info>
        <Container>
          <Text>Использовано компаний</Text>
          <Count>{data.eventFiltersInfo.usedCompanyCount}</Count>
        </Container>
        <Container>
          <Text>Лимит по компаниям</Text>
          <Limit>{data.eventFiltersInfo.companyLimit}</Limit>
        </Container>
      </Info>
    );
  }
};
