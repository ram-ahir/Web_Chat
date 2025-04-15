
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './component/Home'
import Home2 from './component/Home2'
import Signup from "./component/Sign/Signup";
import Login from "./component/Sign/Login";
import { ToastContainer } from 'react-toastify';

function App() {


  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home2 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
