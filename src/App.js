import './App.css';
import LandingPage from './Components/LandingPage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationChoice from './Components/RegistrationChoice';
import LoginChoice from './Components/LoginChoice';
import UserRegistration from './Components/User/UserRegistration';
import UserLoginPage from './Components/User/UserLogin';
import HomePage from './Components/HomePage';
import SellerRegistration from './Components/Seller/SellerRegistration';
import SellerLogin from './Components/Seller/SellerLogin';
import Edit from './Components/User/Edit';
import AddProduct from './Components/Seller/AddProduct';
import DeleteProduct from './Components/Seller/DeleteProduct';
import UpdateProduct from './Components/Seller/UpdateProduct';
import HeaderMessage from './Components/HeaderMessage';

function App() {
  return (
    <>
     <div className="overlay"></div>
     <div className="App">
     <HeaderMessage/>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/registration-choice" element={<RegistrationChoice />} />
        <Route path="/register/user" element={<UserRegistration />} /> 
        <Route path="/register/seller" element={<SellerRegistration />} /> 

        <Route path="/login-choice" element={<LoginChoice/>} />
        <Route path="/login-user" element={<UserLoginPage />} />
        <Route path="/login-seller" element={<SellerLogin />} />

        <Route path="/user-Home" element={<HomePage />} />
        <Route path="/user-edit" element={<Edit/>} /> 

        <Route path="/add-product" element={<AddProduct/>}/>
        <Route path="/delete-product" element={<DeleteProduct/>}/>
        <Route path="/update-product" element={<UpdateProduct/>}/>

      </Routes>
    </Router>
    </div>
    </>
  );
}

export default App;
