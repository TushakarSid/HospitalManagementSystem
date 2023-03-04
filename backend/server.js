const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
console.log(uri)

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})


const appointmentRouter = require('./routes/Appointment');
const doctorRouter = require('./routes/Doctors');
const patientRouter = require('./routes/Patients');
const drugRouter = require('./routes/Drugs');


app.use('/appointment', appointmentRouter);
app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter);
app.use('/drugs', drugRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});