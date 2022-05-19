const router = require('express').Router();
let Appointment = require('../models/AppointmentDetails.model');

router.route('/').get((req, res) => {
  Appointment.find()
    .then(Appointment => res.json(Appointment))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getPatientIdByAppointmentId/:id').get((req,res)=>{
  console.log("working")

  const id = req.params.id;
  console.log(id);
  Appointment.find({_id:id})
    .then(Appointment => res.json(Appointment[0].patientId))
     .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/byDoctorId/:docId').get((req, res) => {
  const docId = req.params.docId
  console.log(docId)
  Appointment.find({docId :docId})
    .then(Appointment => res.json(Appointment))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/byPatientId/:patientId').get((req, res) => {
  const patientId = req.params.patientId
  console.log(patientId)
  Appointment.find({patientId :patientId})
    .then(Appointment => res.json(Appointment))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/findByDoctorId').get((req, res) => {
  const docId = req.body.docId
  console.log(docId)
  Appointment.find({docId :docId})
    .then(Appointment => res.json(Appointment))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/findByPatientId').get((req, res) => {
  const docId = req.body.patientId
  console.log(patientId)
  Appointment.find({patientId :patientId})
    .then(Appointment => res.json(Appointment))
    .catch(err => res.status(400).json('Error: ' + err));
});


//adding appointment details. 
router.route('/add').post((req, res) => {

  const docId = req.body.docId;
  const patientId = req.body.patientId;
  const patientName = req.body.patientName;
  const docName = req.body.docName;
  const healthIssues = req.body.healthIssues;
  const medicinesPrescribed = req.body.medicinesPrescribed;
  const doctorsRemark = req.body.doctorsRemark;
  const date = Date.parse(req.body.date);
  
  const newAppointment = new Appointment({
    docId,
    patientId,
    patientName,
    docName,
    healthIssues,
    medicinesPrescribed,
    doctorsRemark,
    date,
  });

  newAppointment.save()
  .then(() => res.json('Appointment Request Sent!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update_precription').post((req, res) => {

  const medicinesPrescribed = req.body.medicinesPrescribed;
  const doctorsRemark = req.body.doctorsRemark;
  const appoint_Id = req.body.appoint_Id;
  

  console.log(appoint_Id)
  console.log(medicinesPrescribed)
  console.log(doctorsRemark)
  Appointment.findByIdAndUpdate(appoint_Id , {
    $set:{
      medicinesPrescribed : medicinesPrescribed,
      doctorsRemark : doctorsRemark
    }} , {useFindAndModify:false})
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
      Appointment.patientId = req.body.patientId;
      Appointment.healthIssues = req.body.healthIssues;
      
      Appointment.date = Date.parse(req.body.date);

      Appointment.save()
        .then(() => res.json('Appointment updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;