import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import ResetPwd from './Components/ResetPwd';
import ForgotPwd from './Components/ForgotPwd';
import ForgotPwdAuth from './Components/ForgotPwdAuth';
import AddProduct from './Components/AddProduct';
import MyOrders from './Components/MyOrders';
import EditProduct from './Components/EditProduct';
import DeleteProduct from './Components/DeleteProduct';
import Cart from './Components/Cart';

function App() {

  return(
    <div className='App'> 
    <Header />
     <Routes>
     <Route path='/' element={ <Home />} />
      <Route path='/login' element={ <Login />} />
      <Route path='/signup' element={ <Signup />} />
      <Route path='/profile' element={ <Profile />} />
      <Route path='/my-orders' element={ <MyOrders />} />
      <Route path='/reset-pwd/:id/:token' element={ <ResetPwd />}></Route> 
      <Route path='/forgot-password' element={ <ForgotPwd />}></Route> 
      <Route path='/forgotpwd/authorize' element={ <ForgotPwdAuth />}></Route> 
     
      <Route path='/cart' element={ <Cart />}></Route> 
      <Route path='/add-product' element={ <AddProduct />}></Route> 
      <Route path='/edit-product/:product_ID' element={ <EditProduct />}></Route> 
      <Route path='/delete-product/:product_ID' element={ <DeleteProduct />}></Route> 
   
      <Route path='*' element={ <h3>404 : Page not found</h3>} />
     </Routes>
    </div>
  )
}

export default App;
