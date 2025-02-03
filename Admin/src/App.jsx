import React from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import {Route, Routes} from'react-router-dom';
import Add from './Pages/Add/Add.jsx';
import List from './Pages/List/List.jsx';
import Order from './Pages/Order/Order.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
   const url="http://localhost:4000";
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="web-content">
        <Sidebar />
        <div className="route-content">
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/order" element={<Order  url={url}/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
