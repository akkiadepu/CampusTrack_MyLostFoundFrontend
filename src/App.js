import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './Components/LoginComponent/LoginPage';
import RegisterUser from './Components/LoginComponent/RegisterUser';
import AdminMenu from './Components/LoginComponent/AdminMenu';
import StudentMenu from './Components/LoginComponent/StudentMenu';
import LostItemEntry from './Components/ItemComponent/LostItemEntry';
import FoundItemEntry from './Components/ItemComponent/FoundItemEntry';
import LostItemReport from './Components/ItemComponent/LostItemReport';
import FoundItemReport from './Components/ItemComponent/FoundItemReport';
    import 'bootstrap/dist/css/bootstrap.min.css';
import StudentList from './Components/LoginComponent/StudentList';
import StudentProfile from './Components/LoginComponent/StudentProfile';
import ChatMessage from './Components/MessageComponent/ChatMessage';
import MatchItemSearch from './Components/ItemComponent/MatchItemSearch';
import MatchItemReport from './Components/ItemComponent/MatchItemReport';


function App() {
  return (
    <>
    <BrowserRouter>
         <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/Register' element={<RegisterUser/>}/>
          <Route path='/AdminMenu' element={<AdminMenu/>}/>
          <Route path='/StudentMenu' element={<StudentMenu/>}/>
          <Route path='/StudentList' element={<StudentList/>}/>
          <Route path='/StudentProfile' element={<StudentProfile/>}/>
          <Route path='/lost-entry' element={<LostItemEntry/>}/>
          <Route path='/lost-report' element={<LostItemReport/>}/>
           <Route path='/found-entry' element={<FoundItemEntry/>}/>
          <Route path='/found-report' element={<FoundItemReport/>}/>
          <Route path='/match-report' element={<MatchItemReport/>}/>
           <Route path='/chat-msg' element={<ChatMessage/>}/>
           <Route path="/match-search/:pid" element={<MatchItemSearch />} />
        </Routes>
       </BrowserRouter>
     
    </>
  );
}

export default App;
