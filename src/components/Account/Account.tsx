import styled from 'styled-components';
import { AccountInfoComponent } from './AccountInfo.tsx';
import { AccountUserComponent } from './AccountUser.tsx';

const Account = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AccountComponent = () => {
  return (
    <Account>
      <AccountInfoComponent />
      <AccountUserComponent />
    </Account>
  );
};
