import React from 'react';
import Navbar from "../components/Navbar";

function Contact(props) {
    return (
        <div>
            <Navbar activeItem={'home'} color={'#0B0B0D'}/>
            <div className={'container-fluid euw'}>
                <div className={'row'}>
                    <div className={'col-xl-2 ug col-lg-2 col-md-1 col-sm-1 col-1'}></div>
                    <div className={'col-xl-8 ug col-lg-8 col-md-10 col-sm-10 col-10'}>
                        <h1>Contact Us</h1>
                        <p>Please submit your inquiry using the form below and we will get in touch with you
                            shortly.</p>
                        <input type={'text'} placeholder={'Your Email'}/>
                        <input type={'text'} placeholder={'Subject'}/>
                        <h4>Message</h4>
                        <textarea placeholder={'Type here'}></textarea>
                        <button>Submit</button>
                    </div>
                    <div className={'col-xl-2 ug col-lg-2 col-md-1 col-sm-1 col-1'}></div>
                </div>
            </div>
        </div>
    );
}

export default Contact;