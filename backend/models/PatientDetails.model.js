const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema


const userSchema = new Schema(
    {
    PatFName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    PatLName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    },

)

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 8, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    }
});


// userSchema.methods.comparePassword = async function (password) {
//     if (!password) throw new Error('Password is mission, can not compare!');
  
//     try {
//       const result = await bcrypt.compare(password, this.password);
//       return result;
//     } catch (error) {
//       console.log('Error while comparing password!', error.message);
//     }
//   };
  
  const PatientDetails = mongoose.model('patientdetails', userSchema)
  
  module.exports = PatientDetails
