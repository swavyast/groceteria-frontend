import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserHome from './pages/UserHome';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users/*' element={<UserHome />} />
      </Routes>
    </div>
  );
}

export default App;
