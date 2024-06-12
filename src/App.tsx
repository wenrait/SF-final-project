import { HeaderComponent } from './layout/Header.tsx';
import { HomePage } from './pages/Home.tsx';
import { Routes, Route } from 'react-router-dom';
import { FooterComponent } from './layout/Footer.tsx';
import { LoginPage } from './pages/Login.tsx';
import { useAppSelector } from './hooks.ts';
import styled from 'styled-components';
import { colors } from './styles/globalStyles.ts';
import { MenuComponent } from './components/Menu.tsx';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
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

export interface AppContextProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextProps>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
});

function App() {
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated,
  );
  const ErrorMock = () => {
    return <div>Error</div>;
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <AppContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      <AppWrapper>
        <MenuComponent />
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
    </AppContext.Provider>
  );
}

export default App;
