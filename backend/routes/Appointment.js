const router = require('express').Router();
let Appointment = require('../models/AppointmentDetails.model');

router.route('/').get((req, res) => {
  Appointment.find()
    .then(Appointment => res.json(Appointment))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/byDoctorId').post((req, res) => {
  const docId = req.body.docId
  Appointment.find({docId :docId})
    .then(Appointment => res.json(Appointment))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const docId = req.body.docId;
  const healthIssues = req.body.healthIssues;
  
  const date = Date.parse(req.body.date);

  const newAppointment = new Appointment({
    docId,
    healthIssues,
    date,
  });

  newAppointment.save()
  .then(() => res.json('Appointment Request Sent!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Appointment.findById(req.params.id)
    .then(Appointment => res.json(Appointment))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Appointment.findByIdAndDelete(req.params.id)
    .then(() => res.json('Appointment deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Appointment.findById(req.params.id)
    .then(Appointment => {
      Appointment.docId = req.body.docId;
      Appointment.healthIssues = req.body.healthIssues;
      
      Appointment.date = Date.parse(req.body.date);

      Appointment.save()
        .then(() => res.json('Appointment updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;