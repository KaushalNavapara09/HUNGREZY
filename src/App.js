import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import ButtonRef from './context/button/ButtonRef';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import UserState from './context/user/UserState';
import Changepwd from './components/Changepwd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductState from './context/product/ProductState';
import CartState from './context/cart/CartState'
import Cart from './components/Cart';
import ConfirmOrder from './components/ConfirmOrder';
import Orders from './components/Orders';

function App() {
  return (
    <>
      <Router>
        <ToastContainer
          position="bottom-right"
          autoClose={1500}
          hideProgressBar
          newestOnTop
          closeOnClick={false}
          rtl={false}
          draggable
          // pauseOnHover
          toastStyle={{ backgroundColor: "#fc8000", color: "white", fontSize: "17px", marginRight: "15px", padding:"10px 30px" }}
        />
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Landing />}></Route>
          <Route exact path='/home' element={<Home />}></Route>
          <Route exact path='/about' element={<About />}></Route>
          <Route exact path='/cart' element={<Cart />}></Route>
          <Route exact path='/orders' element={<Orders />}></Route>
        </Routes>
        <Login />
        <Signup />
        <Changepwd />
        <ConfirmOrder/>
      </Router>
      <UserState />
      <CartState/>
      <ProductState/>
      <ButtonRef />
    </>
  );
}

export default App;
