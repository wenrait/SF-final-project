import styled from 'styled-components';
import { AccountInfoComponent } from './AccountInfo.tsx';
import { AccountUserComponent } from './AccountUser.tsx';

const Account = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 960px) {
    justify-content: center;
  }
`;

const InfoWrapper = styled.div``;

const UserWrapper = styled.div`
  @media (max-width: 960px) {
    display: none;
  }
`;

export const AccountComponent = () => {
  return (
    <Account>
      <InfoWrapper>
        <AccountInfoComponent />
      </InfoWrapper>
      <UserWrapper>
        <AccountUserComponent />
      </UserWrapper>
    </Account>
  );
};
