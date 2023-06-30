import './App.scss'
import { Routes, Route } from 'react-router-dom';
import LazyLoad from './LazyLoad'
import Navbars from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <div className='app_container'>
        <Navbars />
        <Routes>
          <Route path="" element={LazyLoad(() => import("@pages/Homes/Home"))()} />
          <Route path="/about" element={LazyLoad(() => import("@pages/Abouts/About"))()} >
            <Route path='my-infor' element={LazyLoad(() => import("@pages/Abouts/MyInfors/MyInfor"))()}></Route>
          </Route>
        </Routes>
      </div>

    </div>
  );
}

export default App;
