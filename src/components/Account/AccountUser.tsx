import avatar from '../../assets/svg/avatar.svg';
import { setAuthData } from '../../redux/authSlice.ts';
import { useAppDispatch } from '../../hooks.ts';
import styled from 'styled-components';

const User = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  @media (max-width: 960px) {
    flex-direction: column;
  }
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
  @media (max-width: 960px) {
    margin: auto;
  }
`;

const Avatar = styled.img`
  display: block;
`;

export const AccountUserComponent = () => {
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
    <User>
      <Content>
        <Username>Алексей А.</Username>
        <Button onClick={handleClick}>Выйти</Button>
      </Content>
      <Avatar src={avatar} alt={'Алексей А.'} />
    </User>
  );
};
