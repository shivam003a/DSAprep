import './App.css';
import { HashRouter, Routes, Route, useRevalidator } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Error from './Components/Error'
import Register from './Components/Register';
import Login from './Components/Login';
import Questions from './Components/Practice';
import Logout from './Components/Logout';
import Footer from './Components/Footer';
import { createContext, useReducer } from 'react';
import { reducer, initialState } from './reducer/useReducer';

export const UseContext = createContext(initialState);

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    // Error getting backend data after reload or using url is solved by using HashRouter
    <UseContext.Provider value={{ state, dispatch }}>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='practice' element={<Questions />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='logout' element={<Logout />} />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </HashRouter>
    </UseContext.Provider>
  );
}

export default App;
