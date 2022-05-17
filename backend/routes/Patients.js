const router = require('express').Router()
let PatientDetails = require('../models/PatientDetails.model')
const bcrypt = require('bcrypt')

router.route('/').get((req, res) => {
    PatientDetails.find()
      .then((PatientDetails) => res.json(PatientDetails))
      .catch((err) => res.status(400).json('Error: ' + err))
  })
  
router.route('/patient_details_by_email/:email').get((req, res) => {

    const email = req.params.email
    PatientDetails.find({email :email})
      .then((PatientDetails) => res.json(PatientDetails))
      .catch((err) => res.status(400).json('Error: ' + err))
  })



  router.route('/getIdByEmail/:email').get((req, res) => {

    console.log("patient was here")

    const email = req.params.email
    console.log("email")
    console.log(email)
  
    PatientDetails.find({email :email})
      .then(PatientDetails => res.json(PatientDetails[0]._id))
      .catch((err) => res.status(400).json('Error: ' + err))
  })




  
router.route('/add').post(async(req, res) => {
  const PatFName = req.body.PatFName
  const PatLName = req.body.PatLName
  const mobile = req.body.mobile
  const email = req.body.email
  const password = req.body.password
  console.log(email)
  
    const newPat = new PatientDetails({
      PatFName,
      PatLName,
      mobile,
      email,
      password,
    })

    const emailAlreadyExist = await PatientDetails.find({ email: email })
    const mobileAlreadyExist = await PatientDetails.find({ mobile: mobile })

    if(emailAlreadyExist.length > 0){
      return res.json({success: false, message: 'Email already in Use'})
    }
    else if(mobileAlreadyExist.length > 0){
      return res.json({success: false, message: 'Mobile Number Already Registered'})
    }
    else{
      newPat
      .save()
      .then(() => res.json('Patient Registered!'))
      .catch((err) => res.status(400).json('Error: ' + err))
    }
    

   
  })


  router.route('/find_name_by_id/:patient_id').get((req, res) => {
    const pat_id = req.params.patient_id
    console.log(pat_id)
    PatientDetails.find({_id:pat_id}) 
    .then(PatientDetails => res.json(PatientDetails[0].PatFName + " " + PatientDetails[0].PatLName))
    .catch((err) => res.status(400).json('Error: ' + err))

  })
    

  router.route('/comparePasswordByEmail').post(async (req, res) => {
    const email = req.body.email
    const password = req.body.password
  
      const actPass = await PatientDetails.find({ email: email })
      console.log(actPass.length)
      if(actPass.length==0){
        return res.json({success: false, message: 'Register Yourself!'})
      }
    console.log(actPass[0].password)
    console.log(password)
  
    bcrypt.compare(password,  actPass[0].password, function(err, response) {
      if (err){
        // handle error
        console.log(err)
        return res.json({success: false, message: 'Techniacl Issue! Try again later'})
      }
      if (response){
        // Send JWT
        return res.json({success: true, message: 'Passwords do  match!'});
      } 
      else {
        // response is OutgoingMessage object that server response http request
        return res.json({success: false, message: 'Passwords do not match'});
      }
    });
  
  
    const result = await bcrypt.compare(password, actPass[0].password)
    return result
    console.log(result)
    try {
    } catch (error) {
      console.log('Error while comparing password!', error.message)
    }
   
  })


  module.exports = router