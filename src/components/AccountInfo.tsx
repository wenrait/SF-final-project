import { useGetAccountInfoQuery } from '../api/accountInfoApi.ts';
import styled from 'styled-components';

const Info = styled.div`
  padding: 12px;
  display: flex;
  gap: 7px;
  align-items: center;
  justify-content: center;
  background: rgba(217, 217, 217, 0.3);
  border-radius: 5px;
  line-height: 12px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Text = styled.span`
  display: flex;
  opacity: 40%;
  font-size: 10px;
  margin-left: auto;
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
  const { data, isLoading, error } = useGetAccountInfoQuery({});

  if (isLoading) {
    return <Info>Loading...</Info>;
  }

  if (error) {
    if ('status' in error) {
      const errorMsg =
        'error' in error ? error.error : JSON.stringify(error.data);
      return <Info>{errorMsg}</Info>;
    }
  }

  if (data) {
    return (
      <Info>
        <Container>
          <Text>Использовано компаний</Text>
          <Text>Лимит по компаниям</Text>
        </Container>
        <Container>
          <Count>{data.eventFiltersInfo.usedCompanyCount}</Count>
          <Limit>{data.eventFiltersInfo.companyLimit}</Limit>
        </Container>
      </Info>
    );
  }
};
