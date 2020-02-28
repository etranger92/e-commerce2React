//router is here to create a stream to be able to get post update and delete your datas from mongosDb.
const router = require('express').Router();

//We require the moongose model
let Shoes = require('../models/shoes.model');

//This is the first route to handle the http request.

router.route('/').get((req, res) => {
    //find is a moongose method that get the list from all shoes of mangos DB it return a promises.
    Shoes.find()
        .then(shoes => res.json(shoes))
        .catch(err => res.status(400).json(err));
});

router.route('/:id').get((req, res) => {
    Shoes.findById(req.params.id)
        .then(shoes => res.json(shoes))
        .catch(err => res.status(400).json(err));

});
//I used this for Insomnia to add some data instead of having to add them manually.

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const color = req.body.color;
    const size = Array(req.body.size);
    const quantityInitial = req.body.quantityInitial;
    const quantityAvailable = req.body.quantityAvailable;
    const gender = req.body.gender;
    const price = req.body.price;
    const newShoes = new Shoes({

        name,
        color,
        size,
        quantityInitial,
        quantityAvailable,
        gender,
        price
    });

    newShoes.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});
//This is a post request it means when the user write something that we want to save in our data based
router.route("/update/:id").post((req, res) => {
    Shoes.findByIdAndUpdate(req.params.id)
        .then(Shoes => {
            console.log(req.body.quantity, "amjade")
            Shoes.quantityAvailable = Number(req.body.quantity)
            Shoes.save()
                .then(() => res.json("Shoes updated!"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json(err));
});


//Here we export the router
module.exports = router;