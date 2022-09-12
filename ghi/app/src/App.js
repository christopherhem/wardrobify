import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import NewHatForm from './NewHatForm';
import HatsList2 from './HatsList2';
import ShoeForm from './ShoeForm';
import ShoeList from './ShoeList';

function App(props) {
  if (props.hats === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
            <Route path="hats" element={<HatsList2 hats={props.hats}/>} />
            <Route path="hats/new" element={<NewHatForm />} />
            <Route path="shoes" element={<ShoeList shoes={props.shoes}/>} />
            <Route path="shoes/new" element={<ShoeForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
