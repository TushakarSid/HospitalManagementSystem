const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentsSchema = new Schema({
  docId: { type: String, required: true },
  patientId :{type:String,required:true},
  healthIssues: { type: String, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Appointments = mongoose.model('appointments', appointmentsSchema);

module.exports = Appointments;