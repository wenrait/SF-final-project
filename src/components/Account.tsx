import styled from 'styled-components';
import avatar from '../assets/svg/avatar.svg';
import { setAuthData } from '../redux/authSlice.ts';
import { useAppDispatch } from '../hooks.ts';
import { useGetAccountInfoQuery } from '../api/accountInfoApi.ts';

const Account = styled.div`
  display: flex;
  gap: 130px;
`;

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

const User = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  font-size: 14px;
  opacity: 70%;
`;

const Button = styled.button`
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  opacity: 40%;
  font-size: 10px;
  width: fit-content;
  margin-left: auto;
  line-height: 12px;
`;

const Avatar = styled.img`
  display: block;
`;

export const AccountComponent = () => {
  const dispatch = useAppDispatch();

  const { data, error } = useGetAccountInfoQuery({});
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log('User data: ', data.eventFiltersInfo);
  }

  const handleClick = () => {
    try {
      dispatch(
        setAuthData({
          accessToken: null,
          expire: null,
          isAuthenticated: false,
        }),
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Account>
      {data && (
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
      )}

      <User>
        <Content>
          <Username>Алексей А.</Username>
          <Button onClick={handleClick}>Выйти</Button>
        </Content>
        <Avatar src={avatar} alt={'Алексей А.'} />
      </User>
    </Account>
  );
};
