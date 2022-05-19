import React, { useContext, useState, useEffect } from 'react'
import UserContext from './UserContext'
import axios from 'axios'
import { Carousel } from 'react-bootstrap'
import Image from './Image'



const FrontPage = () => {

    return (
        <div style={{ display: 'flex', backgroundColor: 'white' }}>


            <nav className='w3-sidebar w3-hide-medium w3-hide-small' style={{ width: '40%' }}>
                <div className='bgimg'>
                    <img style={{ width: "607.67px", height: "796px" }}
                        src="https://s3-ap-southeast-1.amazonaws.com/site.uploads/image/2022/05/41831652988280-699.jpg" alt="" srcset="" />
                </div>
            </nav>

            <div className='w3-main w3-padding-large' >

                <header className='w3-container w3-center' style={{ padding: '128px 16px' }} id="home">
                    <h1 className='w3-jumbo'
                        style={{
                            fontSize: '62px',
                            margin: 'auto',
                            display: 'block',
                            textAlign: 'center'

                        }}
                    ><b>NITJ's DISPENSARY</b></h1>
                    <p
                        style={{ textAlign: 'center' }}
                    >an initiative to make it paperless</p>
                    <button className='w3-button w3-light-grey w3-padding-large w3-margin-top' style={{display: 'block',margin: 'auto'}}>
                        <i ></i> Let's Explore
                    </button>
                </header>


                <div className='w3-content w3-justify w3-text-grey w3-padding-32' id="about" style={{paddingLeft:'99px'}}>
                    <h2>About</h2>
                    <hr className='w3-opacity' />
                    <p>The Health Centre is having well established pathological lab facilities where blood, urine tests are done. The other facilities are ECG, pulse oxymeter, nebulizer, oxygen support, o2 masks.

                        The laboratory is equipped with hematology analyzer, Biochemistry analyzer, urine analyzer, hot air oven ,R-8C laboratory centrifuge ,Blood mixer,binocular microscope. All the routine blood tests(Hemogram, LFT, RFT, lipid profile, thyroid profile) are done.
                    </p>

                </div>



                

            </div>

        </div>
    )
}

export default FrontPage
