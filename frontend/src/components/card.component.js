import React, { Component } from 'react'
import { Link } from 'react-router-dom';



function Card(props) {
    const link = `/${props.doctorId}/create`;
    return (
      
      <div className="card"> 
        <div className="card__body" style={{
          // textAlign:"center",
          margin:"30px 30px"}}>
          <img style={{    width: "100%" ,display: "block" ,margin: "auto"}}
           src='https://media.istockphoto.com/photos/team-of-doctors-and-nurses-in-hospital-picture-id1307543618?b=1&k=20&m=1307543618&s=170667a&w=0&h=hXpYmNYXnhdD36C-8taPQvdpM9Oj-woEdge8nvPrsZY='
            class="card__image" />
            <br />
            <div style={{display :"flex"}}>
                <h6 className="card__title"><b>{props.docFName} &nbsp; {props.docLName}</b></h6>
                <h6><b>Allergy & Clinical Immunology.</b></h6>
            </div>
            <div >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, id quas itaque deleniti similique dolorem totam a quia, ipsam, iusto numquam? Ad delectus sunt laudantium nobis adipisci a ipsam, qui et, quis beatae impedit, possimus placeat provident est maxime ullam atque. Necessitatibus iusto eveniet debitis, at repellendus rerum repellat alias?



            </div>
          <p>

          </p>
          
        </div>
        <button className="card__btn">
          <Link to={link}>BOOK</Link></button>
      </div>

    );
  }


  export default Card;