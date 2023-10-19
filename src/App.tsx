import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Header from './components/header';
import MainPage from './pages/main';
import AddCitizen from './pages/addCitizen';

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/add-citizen" element={<AddCitizen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
