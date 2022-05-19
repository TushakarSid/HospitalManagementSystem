const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentsSchema = new Schema({
  docId: { type: String, required: true },
  patientId :{type:String,required:true},
  patientName :{type:String,required:true},
  docName :{type:String,required:true},
  healthIssues: { type: String, required: true },
  medicinesPrescribed: { type: [{name:'' , key:''}], required: false  , default:'none'},
  doctorsRemark: { type: String, required: false , default:'none'},
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Appointments = mongoose.model('appointments', appointmentsSchema);

module.exports = Appointments;