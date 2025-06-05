import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { mockUsers } from '../data/mockData';
import { BACKEND_URL } from '../config';
import { isRecoilValue, useRecoilValue, useSetRecoilState } from 'recoil';
import { IsAuthicated, IsLoading, UserDetails } from '../State/ComponetState';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const SetData = useSetRecoilState(UserDetails);
  const Data = useRecoilValue(UserDetails);
  const SetIsAuth = useSetRecoilState(IsAuthicated);
  const setisLaoding = useSetRecoilState(IsLoading);
  const currentUser = mockUsers[0];

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
  };

  const GetDetails = async()=>{
    try{
      setisLaoding(true);
      const Resposne = await fetch(`${BACKEND_URL}/api/v1/user/userdetails`, {
        method : "GET",
        headers : {
          token : localStorage.getItem('token') || '',
          "Content-Type" : "application/json"
        },
      })
      const json = await Resposne.json();
      if(Resposne.ok){
        SetData(json.User);
        setisLaoding(false);
      }
    }catch(e){
      console.log(e);
    }
  }

  const UserVerified = async()=>{
    try{
      const Res = await fetch(`${BACKEND_URL}/api/v1/user/verify` , {
        method : "GET",
        headers : {
          token : localStorage.getItem('token') || '',
          "Content-Type" : "application/json"
        }
      })
      if(Res.ok){
        SetIsAuth(true);
      }
    }catch(e){
      console.log(e);
      alert("Internal Server Error")
    }
  }

  useEffect(()=>{
    UserVerified();
    GetDetails();
  },[])
  console.log(Data);
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header 
        currentUser={currentUser} 
        onNavToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        firstname={Data.firstname}
        latname={Data.latname}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          onNavigate={handleNavigation}
          currentPath={currentPath}
        />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;