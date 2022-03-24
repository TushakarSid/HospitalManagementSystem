import React, { Component, useEffect, useState } from "react";
import axios from "axios";

const Prescription = () => {

  const [drugNames,setdrugNames] = useState();

  useEffect(()=>{
    axios.get('http://localhost:5000/drugs')
     .then(response =>{
       setdrugNames(response.data)
     })
  },[])

  // return (
  //   <div>
  //     <h3>Select Drug</h3>
  //     <form onSubmit={onSubmit}>
  //       <div className="form-group">
  //         <label>Prescription </label>
  //         <select
  //             ref="userInput"
  //             required
  //             className="form-control"
  //             value={drugNames}
  //             //onChange={this.onChangeDocName}
  //           >
  //             {drugNames.map(function (drugName) {
  //               return (
  //                 <option key={drugName} value={drugName}>
  //                   {drugName}
  //                 </option>
  //               );
  //             })}
  //           </select>
  //       </div>
  //     </form>
  //   </div>
  // );
};



export default Prescription
