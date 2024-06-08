import { HeaderComponent } from './layout/Header.tsx';
import { HomePage } from './pages/Home.tsx';
import { Routes, Route } from 'react-router-dom';
import { FooterComponent } from './layout/Footer.tsx';
import { LoginPage } from './pages/Login.tsx';
import { useAppSelector } from './hooks.ts';

function App() {
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated,
  );
  const ErrorMock = () => {
    return <div>Error</div>;
  };

  return (
    <>
      <HeaderComponent />
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        {!isAuthenticated && <Route path={'/login'} element={<LoginPage />} />}
        <Route path={'/*'} element={<ErrorMock />} />
      </Routes>
      <FooterComponent />
    </>
  );
}

export default App;
