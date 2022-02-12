const router = require('express').Router()
let DocDetails = require('../models/DocDetails.model')
const bcrypt = require('bcrypt')

router.route('/').get((req, res) => {
  DocDetails.find()
    .then(DocDetails => res.json(DocDetails))
    .catch((err) => res.status(400).json('Error: ' + err))
})



router.route('/add').post((req, res) => {
  const docFName = req.body.docFName
  const docLName = req.body.docLName
  const mobile = req.body.mobile
  const email = req.body.email
  const password = req.body.password

  const newDoc = new DocDetails({
    docFName,
    docLName,
    mobile,
    email,
    password,
  })

  newDoc
    .save()
    .then(() => res.json('Doctor Registered!'))
    .catch((err) => res.status(400).json('Error: ' + err))
})



router.route('/comparePasswordByEmail').post(async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  console.log(email)
  // var actpass
  // try{
    const actPass = await DocDetails.find({ email: email })
    console.log(actPass.length)
    if(actPass.length==0){
      return res.json({success: false, message: 'Try Signing In'})

    }
  // }
  // catch{
  //   console.log("no such email in db")
  // }
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
  // const newDoc = new DocDetails({
  //   email,
  //   password
  // });

  // newDoc.save()
  //   .then(() => res.json('Doctor Registered!'))
  //   .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router
