import './App.css';
import { HashRouter, Routes, Route} from 'react-router-dom';
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Error from './Components/Error'
import Register from './Components/Register';
import Login from './Components/Login';
import Questions from './Components/Practice';
import Logout from './Components/Logout';


function App() {
  return (

    // Error getting backend data after reload or using url is solved by using HashRouter
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='practice' element={ <Questions /> } />
        <Route path='login' element={ <Login /> } />
        <Route path='register' element={ <Register /> } />
        <Route path='logout' element={ <Logout /> } />
        <Route path='*' element={ <Error /> } />
      </Routes>
    </HashRouter>
  );
}

export default App;
