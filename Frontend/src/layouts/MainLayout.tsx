import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { mockUsers } from '../data/mockData';
import { BACKEND_URL } from '../config';


interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const [user , setuser ] = useState({});
  
  // Use the first user as the current user for the demo
  const currentUser = mockUsers[0];

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
  };

  const GetDetails = async()=>{
    try{
      const Resposne = await fetch(`${BACKEND_URL}/api/v1/user/userdetails`, {
        method : "GET",
        headers : {
          token : localStorage.getItem('token') || '',
          "Content-Type" : "application/json"
        },
      })
      const json = await Resposne.json();
      if(Resposne.ok){
        setuser(json.User);
      }
    }catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
    GetDetails();
  },[])
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header 
        currentUser={currentUser} 
        onNavToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        firstname={user.firstname}
        latname={user.latname}
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