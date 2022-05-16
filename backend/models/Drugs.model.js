const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const drugsSchema = new Schema({
    drugName : {type:String,required:true}
},{
    timestamps: true,
    }
);

const Drugs = mongoose.model('Drugs',drugsSchema);

module.exports = Drugs;