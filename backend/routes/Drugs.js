const router = require('express').Router();
let Drugs = require('../models/Drugs.model');

router.route('/').get((req,res) => {
    console.log("drugshere")
    Drugs.find()
     .then((Drugs) => res.json(Drugs))
     .catch((err) => res.status(400).json('Error: '+ err))
})

router.route('/add').post((req,res) =>{
    const drugName = req.body.drugName;
    console.log(req.body.drugName)

    const newDrug = new Drugs({
        drugName
    });

    newDrug.save()
    .then(()=> res.json('New Drug Added!'))
    .catch((err) => res.status(400).json('Error: '+ err))
});

module.exports = router;