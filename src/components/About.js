import React from 'react';
import commas from '../images/commas.png';
import Footer from './Footer';

function About() {
    document.title = "Hungrezy - About Us"
    return (
        <>
            <div className='container-fluid divAbout g-0'>
                <div className="conteiner-fluid px-5 pb-5" style={{ backgroundColor: '#F5851F' }}>
                    <img src={commas} alt="" className='mt-5 mx-5 pt-4' />
                    <p className='text-light h2 mx-5 pb-5 my-2'>Our mission is to elevate the quality of life for the urban consumer with unparalleled convenience. Convenience is what makes us tick. It's what makes us get out of bed and say, "Let's do this."</p>
                </div>
                <div className="container-fluid d-flex justify-content-between">
                    <div className='container-fluid' style={{ marginTop: '200px', marginLeft: '100px' }}>
                        <h2 className='mb-3'>Get in <strong>Touch</strong></h2>
                        <h1 className='mb-4' style={{ color: '#fc8000' }}>Head Office</h1>
                        <h5 className='font-weight-bold'>Hungrezy Pvt. Ltd.</h5>
                        <h5 className='font-weight-bold'>A-2, Lane No. 6, Ashok Chakra Society, Meera Nagar, Koregaon Park, Pune, Maharashtra</h5>
                    </div>
                    <div style={{ margin: '100px 150px' }}>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5559.833020842436!2d73.89663674260653!3d18.534203259024164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c157a09d406f%3A0xebbf801192e7520d!2sHUNGREZY!5e0!3m2!1sen!2sin!4v1659701780992!5m2!1sen!2sin" width="500" height="450" title='map' style={{ border: "0", borderRadius: '20px' }}></iframe>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default About