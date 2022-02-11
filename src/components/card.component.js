import React, { Component } from 'react'
import { Link } from 'react-router-dom';



function Card(props) {
    console.log(props)



    const link = `/${props.docFName + props.docLName}/create`;

    return (
      <div className="card">
        <div className="card__body">
          <img src='https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id474001958?s=612x612' class="card__image" />
          <h2 className="card__title">{props.docFName}</h2>
          <p className="card__description">{props.docLName}</p>
        </div>
        <button className="card__btn"><Link to={link}>BOOK</Link></button>
      </div>

    );
  }


  export default Card;