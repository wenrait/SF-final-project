import styled from 'styled-components';
import avatar from '../assets/svg/avatar.svg';
import { setAuthData } from '../redux/authSlice.ts';
import { useAppDispatch } from '../hooks.ts';
import { AccountInfoComponent } from './AccountInfo.tsx';

const Account = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
      <AccountInfoComponent />
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
