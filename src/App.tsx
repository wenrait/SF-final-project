import { HeaderComponent } from './layout/Header.tsx';
import { HomeComponent } from './pages/Home.tsx';
import { Routes, Route } from 'react-router-dom';
import { FooterComponent } from './layout/Footer.tsx';

function App() {
  const ErrorMock = () => {
    return <div>Error</div>;
  };

  return (
    <>
      <HeaderComponent />
      <Routes>
        <Route path={'/'} element={<HomeComponent />} />
        <Route path={'/*'} element={<ErrorMock />} />
      </Routes>
      <FooterComponent />
    </>
  );
}

export default App;
