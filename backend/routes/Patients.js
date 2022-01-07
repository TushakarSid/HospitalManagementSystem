const router = require('express').Router()
let PatientDetails = require('../models/PatientDetails.model')
const bcrypt = require('bcrypt')

router.route('/').get((req, res) => {
    PatientDetails.find()
      .then((PatientDetails) => res.json(PatientDetails))
      .catch((err) => res.status(400).json('Error: ' + err))
  })


  
router.route('/add').post((req, res) => {
    const PatFName = req.body.docFName
    const PatLName = req.body.docLName
    const mobile = req.body.mobile
    const email = req.body.email
    const password = req.body.password
  
    const newDoc = new DocDetails({
      PatFName,
      PatLName,
      mobile,
      email,
      password,
    })
  
    newDoc
      .save()
      .then(() => res.json('Patient Registered!'))
      .catch((err) => res.status(400).json('Error: ' + err))
  })


  