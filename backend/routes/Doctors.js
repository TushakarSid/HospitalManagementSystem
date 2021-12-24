const router = require('express').Router();
let DocDetails = require('../models/DocDetails.model');

router.route('/').get((req, res) => {
  DocDetails.find()
    .then(DocDetails => res.json(DocDetails))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const docName = req.body.docName;
  const mobile = req.body.mobile;
  const password = req.body.password;

  const newDoc = new DocDetails({
    docName,
    mobile,
    password
  });

  newDoc.save()
    .then(() => res.json('Doctor Registered!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;