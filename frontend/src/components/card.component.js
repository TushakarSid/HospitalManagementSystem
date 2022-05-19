import React, { Component } from 'react'
import { Link } from 'react-router-dom';



function Card(props) {
    const link = `/${props.doctorId}/create`;
    return (
      
      <div className="card"style={{margin:'0% 1% '}}> 
        <div className="card__body" style={{
          margin:"1% 1%" , fontSize: '80%'}}>
          <img style={{    width: "60%" ,display: "block" ,margin: "auto" , borderRadius: '64%' , marginTop: '2%'}}
           src="https://elixirclinictcr.com/wp-content/uploads/2021/07/doctor-character-background_1270-84.jpeg"
            class="card__image" />
            <br />
            <div style={{display :"flex"}}>
                <h6 className="card__title" style={{display:'block' , margin:'auto' , marginBottom:'2%'}}><b>Dr. {props.docFName} &nbsp; {props.docLName}</b></h6>
                {/* <h6 style={{flexDirection:'row-reverse'}}><b>Allergy & Clinical Immunology.</b></h6> */}
            </div>
            <div  style={{textAlign:'center'}}>
            Dr. Sunny Soni has completed Endodontics from DAPM RV Dental College and Hospital. He is updated with the latest advances in the field of Dentistry, he expertise's in advanced rotary Endodontics, Micro-Endodontics, re-treatment, rehabilitation of badly broken teeth.


            </div>
          <p>

          </p>
          
        </div>
          <Link to={link}>
        <button className="card__btn" style={{display:'block' , margin:'auto' , marginBottom:'2%'}}>BOOK</button>
            
            </Link>
      </div>

    );
  }


  export default Card;