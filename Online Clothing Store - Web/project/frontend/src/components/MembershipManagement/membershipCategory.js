import React from 'react'
import '../../css/membership.css'
import {Link} from 'react-router-dom'

export default function MembershipCategory() {
    return (
        <div className="container">

            <div className='row my-5 ml-5'>
                <div className='col-md-3 full-container'>
                    <div className='one-container m-container bg-danger text-white'>
                        <h3 className='h-container'>5% Off</h3>
                    </div>
                    <div className='down-container bg-light'>
                        <h3 className='bronze-head'>Bronze</h3>
                        <h4 className='from-head'>From Rs 1000.00</h4>
                        <p className='sub-descripition'>Get a 5% Discount on your purchase</p>
                        <Link to='../membership-form'><button className='get-btn'>Get Started</button></Link>
                    </div>
                </div>
                <div className='col-md-3 full-container '>
                    <div className='two-container m-container bg-danger text-white'>
                        <h3 className='h-container'>10% Off</h3>
                    </div>
                    <div className='down-container bg-light'>
                        <h3 className='silver-head'>Silver</h3>
                        <h4 className='from-head'>From Rs 2500.00</h4>
                        <p className='sub-descripition'>Get a 10% Discount on your purchase</p>
                        <Link to='../membership-form'><button className='get-btn'>Get Started</button></Link>
                    </div>
                </div>
                <div className='col-md-3 full-container'>
                    <div className='three-container m-container bg-danger text-white'>
                        <h3 className='h-container'>15% Off</h3>

                    </div>
                    <div className='down-container bg-light'>
                        <h3 className='platinum-head'>Platinum</h3>
                        <h4 className='from-head'>From Rs 5000.00</h4>
                        <p className='sub-descripition'>Get a 15% Discount on your purchase</p>
                        <Link to='../membership-form'><button className='get-btn'>Get Started</button></Link>
                    </div>
                </div>
                <div className='col-md-3 full-container'>
                    <div className='four-container m-container bg-danger text-white'>
                        <h3 className='h-container'>20% Off</h3>

                    </div>
                    <div className='down-container bg-light'>
                        <h3 className='gold-head'>Gold</h3>
                        <h4 className='from-head'>From Rs 10000.00</h4>
                        <p className='sub-descripition'>Get a 20% Discount on your purchase</p>
                        <Link to='../membership-form'><button className='get-btn'>Get Started</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
