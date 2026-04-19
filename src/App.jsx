
import { Outlet } from 'react-router-dom';
import Header from './component/Header.jsx';
function App() {   
  return (
    <>
     <Header />
     <Outlet/>
    </>
  )
}

export default App

