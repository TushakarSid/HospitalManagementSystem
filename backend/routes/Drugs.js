const router = require('express').Router();
let Drugs = require('../models/Drugs.model');

router.route('/').get((req,res) => {
    Drugs.find()
     .then((Drugs) => res.json(Drugs))
     .catch((err) => res.status(400).json('Error: '+ err))
})


router.route('/get_drug_names').get((req,res) => {
    Drugs.find()
     .then((Drugs) => {
         let all_drugs =[]
         Drugs.map(cur_drug =>{
             console.log(cur_drug.drugName)
             all_drugs.concat(cur_drug.drugName)
         })
         console.log(all_drugs)
         console.log(Drugs)
         res.json(Drugs)
     })
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