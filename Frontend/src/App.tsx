import { BrowserRouter , Route, Routes } from 'react-router';
import Landing from './pages/Landing';
import Login from './pages/Login';

import {  } from "react-router-dom"
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MainLayout from './layouts/MainLayout';
import Messages from './pages/Messages';
import Community from './pages/Community';
import FindSupport from './pages/FindSupport';
import ResourceCard from './components/ResourceCard';
import Resources from './pages/Resources';
import { RecoilRoot } from 'recoil';


function App() {
  return(
    <>  
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing></Landing>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='/dashboard' element={<RecoilRoot><MainLayout children={<Dashboard></Dashboard>}></MainLayout></RecoilRoot>}></Route>
          <Route path='/messages' element={<MainLayout children={<Messages></Messages>}></MainLayout>}></Route>
          <Route path='/community' element={<MainLayout children={<Community></Community>}></MainLayout>}></Route>
          <Route path='/find-support' element={<MainLayout children={<FindSupport></FindSupport>}></MainLayout>}></Route>
          <Route path='/resources' element={<MainLayout children={<Resources></Resources>}></MainLayout>}></Route>
        </Routes>
      </BrowserRouter>
    
    </>
  )

}

export default App;