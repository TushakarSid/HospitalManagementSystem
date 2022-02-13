import React, { Component, useEffect, useState } from "react";
import axios from "axios";

const prescription = () => {
  return (
    <div>
      <h3>Enter Appointment Details</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Prescription </label>
          <input
            type="text"
            required
            className="form-control"
            value={healthIssues}
            onChange={onChangeHealthIssues}
          />
        </div>
      </form>
    </div>
  );
};
