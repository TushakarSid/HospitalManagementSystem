import React, { Component, useEffect, useState } from "react";
import axios from "axios";




const Prescription = () => {    
  const [drugNames, setdrugNames] = useState();

  useEffect(() => {
    axios.get("http://localhost:5000/drugs").then((response) => {
      setdrugNames(response.data);

    console.log(response.data)

    });
  }, []);

console.log("drug")
console.log(drugNames)




  

  return (
    <div>
      <h3>Select Drug</h3>

     <form>
        <div className="form-group">
          <label>Prescription </label>
          <select
          multiple={true}
            required
            className="form-control"
            value={drugNames}
            
          >
            {drugNames === undefined ? <div></div>:
            drugNames.map(function (drugName) {
              return (
                <option key={drugName} value={drugName}>
                  {drugName}
                </option>
              );
            })}
          </select>
        </div>
      </form>  
    </div>
  );
};

export default Prescription;
