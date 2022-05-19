const router = require('express').Router()
let DocDetails = require('../models/DocDetails.model')
const bcrypt = require('bcrypt')

router.route('/').get((req, res) => {
  DocDetails.find()
    .then(DocDetails => res.json(DocDetails))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/doctor_details_by_email/:email').get((req, res) => {

  const email = req.params.email

  DocDetails.find({email :email})
    .then((DocDetails) => res.json(DocDetails))
    .catch((err) => res.status(400).json('Error: ' + err))
})


router.route('/doctor_details_by_id/:id').get((req,res) =>{

  const id = req.params.id

  console.log(id)
  DocDetails.find({_id:id})
    .then(DocDetails => res.json(DocDetails))
    .catch((err) => res.status(400).json('Error: ' +err))
})

router.route('/getIdByEmail/:email').get((req, res) => {
  const email = req.params.email
  console.log("email")
  console.log(email)

  DocDetails.find({email :email})
    .then(DocDetails => res.json(DocDetails[0]._id))
    .catch((err) => res.status(400).json('Error: ' + err))
})


router.route('/add').post(async(req, res) => {
  const docFName = req.body.docFName
  const docLName = req.body.docLName
  const mobile = req.body.mobile
  const email = req.body.email
  const password = req.body.password
  const pic = req.body.pic

  const newDoc = new DocDetails({
    docFName,
    docLName,
    mobile,
    email,
    password,
    pic
  })

  const emailAlreadyExist = await DocDetails.find({ email: email })
  const mobileAlreadyExist = await DocDetails.find({ mobile: mobile })

    if(emailAlreadyExist.length > 0){
      return res.json({success: false , message: 'Email already in Use'})
    }
    else if(mobileAlreadyExist.length > 0){
      return res.json({success: false, message: 'Mobile Number Already Registered'})
    }
    else{
      newDoc
      .save()
      .then(() => res.json('Doctor Registered!'))
      .catch((err) => res.status(400).json('Error: ' + err))
    }
})

router.route('/getDetailsByEmail').post( async(req, res) => {
  const email = req.body.email
  // const password = req.body.password
  const detail = await DocDetails.find({ email: email })
  if(detail.length ==0){
    return res.json({success: false, message: "no record with this Email"})
  }
  return res.json(detail)
})



router.route('/comparePasswordByEmail').post(async (req, res) => {
  const email = req.body.email
  const password = req.body.password

    const actPass = await DocDetails.find({ email: email })
    if(actPass.length==0){
      return res.json({success: false, message: 'Register Yourself'})

    }

  bcrypt.compare(password,  actPass[0].password, function(err, response) {
    if (err){
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
