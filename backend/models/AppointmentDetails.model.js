const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentsSchema = new Schema({
  docName: { type: String, required: true },
  healthIssues: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Appointments = mongoose.model('appointments', appointmentsSchema);

module.exports = Appointments;