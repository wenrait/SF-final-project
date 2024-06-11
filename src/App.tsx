import { HeaderComponent } from './layout/Header.tsx';
import { HomePage } from './pages/Home.tsx';
import { Routes, Route } from 'react-router-dom';
import { FooterComponent } from './layout/Footer.tsx';
import { LoginPage } from './pages/Login.tsx';
import { useAppSelector } from './hooks.ts';
import styled from 'styled-components';
import { colors } from './styles/globalStyles.ts';

const AppWrapper = styled.body`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainWrapper = styled.main`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const FooterWrapper = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.primary.teal};
`;

function App() {
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated,
  );
  const ErrorMock = () => {
    return <div>Error</div>;
  };

  return (
    <AppWrapper>
      <HeaderWrapper>
        <HeaderComponent />
      </HeaderWrapper>
      <MainWrapper>
        <Routes>
          <Route path={'/'} element={<HomePage />} />
          {!isAuthenticated && (
            <Route path={'/login'} element={<LoginPage />} />
          )}
          <Route path={'/*'} element={<ErrorMock />} />
        </Routes>
      </MainWrapper>
      <FooterWrapper>
        <FooterComponent />
      </FooterWrapper>
    </AppWrapper>
  );
}

export default App;
