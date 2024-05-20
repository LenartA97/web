import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage"
import Post from "./Post";
import Header from "./Header";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from './UserContext';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage/> } />
          <Route path="/login" element = {<LoginPage/>}/>
          <Route path="/register" element = {<RegisterPage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
   
  );
}

export default App;
