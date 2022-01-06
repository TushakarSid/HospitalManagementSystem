const router = require('express').Router();
let DocDetails = require('../models/DocDetails.model');

router.route('/').get((req, res) => {
  DocDetails.find()
    .then(DocDetails => res.json(DocDetails))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const docFName = req.body.docFName;
  const docLName = req.body.docLName;
  const mobile = req.body.mobile;
  const email = req.body.email;
  const password = req.body.password;

  const newDoc = new DocDetails({
    docFName,
    docLName,
    mobile,
    email,
    password
  });

  newDoc.save()
    .then(() => res.json('Doctor Registered!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;