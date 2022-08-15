import React from 'react';
import { useContext, useEffect } from 'react';
import homeimg1 from '../images/homeimg1.webp'
import homeimg2 from '../images/homeimg2.jpg'
import homeimg3 from '../images/homeimg3.webp'
import homeimg4 from '../images/homeimg4.webp'
import Footer from './Footer';
import Products from './Products';
import UserContext from '../context/user/UserContext';
import Navbar from './Navbar';

function Home() {
  const usercontext = useContext(UserContext);
  let { getUserData } = usercontext;
  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, [])

  return (
    <>
    <Navbar/>
      <div className='container-fluid d-flex justify-content-center divHome text-light g-0'>
        <div className="container row mx-3 d-flex justify-content-center">
          <img className='col-md-3 homeimg mx-3 my-5' src={homeimg1} alt="" />
          <img className='col-md-3 homeimg mx-3 my-5' src={homeimg2} alt="" />
          <img className='col-md-3 homeimg mx-3 my-5' src={homeimg3} alt="" />
          <img className='col-md-3 homeimg mx-3 my-5' src={homeimg4} alt="" />
        </div>
      </div>
      <div className='container g-0 my-5'>
        <Products />
      </div>
      <Footer />
    </>
  )
}

export default Home