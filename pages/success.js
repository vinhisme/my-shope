import React, { useEffect } from 'react'
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runSchoolpride } from '../lib/utils';

const Successpayment = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

    useEffect(() =>{
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runSchoolpride();
    }, [])
    return (
        <div className='success-wrapper'>
            <div className="success">
                <p className="icon">
                    <BsBagCheckFill/>
                </p>
                <h2>Thank you for your purchase!</h2>
                <p className="email-msg">Check your email inbox for the receipt.</p>
                <p className="description">
                    If you have any question, please email
                    <a href="mailto:vinhp8q@gmail.com" className="email">vinhp8q@gmail.com</a>
                </p>
                <Link href='/'>
                    <button type="button" width="300px" className='btn'>Continue Shopping</button>
                </Link>
            </div>
        </div>
    )
}

export default Successpayment