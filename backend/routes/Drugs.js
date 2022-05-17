const router = require('express').Router();
let Drugs = require('../models/Drugs.model');

router.route('/').get((req,res) => {
    Drugs.find()
     .then((Drugs) => res.json(Drugs))
     .catch((err) => res.status(400).json('Error: '+ err))
})

router.route('/add').post((req,res) =>{
    const drugName = req.body.drugName;
    const drugQuantity = req.body.drugQuantity;

    const newDrug = new Drugs({
        drugName,
        drugQuantity
    });

    newDrug.save()
    .then(()=> res.json('New Drug Added!'))
    .catch((err) => res.status(400).json('Error: '+ err))
});

module.exports = router;