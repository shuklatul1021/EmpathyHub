import { BrowserRouter , Route, Routes } from 'react-router';
import Landing from './pages/Landing';
import Login from './pages/Login';

import {  } from "react-router-dom"
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';


function App() {
  return(
    <>  
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing></Landing>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        </Routes>
      </BrowserRouter>
    
    </>
  )

}

export default App;