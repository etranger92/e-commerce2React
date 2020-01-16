//take the infos we need for our stripe
const express = require('express');
const uuid = require("uuid/v4");
var informations = require("../random");
const stripe = require('stripe')("sk_test_Q4G4XO257sfFTvhv4ob5DQeO");


//router is here to create a stream to be able to get post update and delete your datas from mongosDb.
const router = require('express').Router();

//We require the moongose model
let Transactions = require('../models/transactions.model');

//This is the first route to handle the http request.

router.route('/').get((req, res) => {
    Transactions.find()
        .then(Transactions => res.json(Transactions))
        .catch(err => res.status(400).json(err));
});

router.route('/:id').get((req, res) => {
    Transactions.findById(req.params.id)
        .then(Transactions => res.json(Transactions))
        .catch(err => res.status(400).json(err));
});

router.route('/charge').post(async (req, res) => {
    console.log("Request:", req.body);
    let error;
    let status;
    try {
        const {
            product,
            token
        } = req.body;

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const idempotency_key = uuid();
        const charge = await stripe.charges.create({
            amount: product.price * 100,
            currency: "gbp",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the `,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }
        }, {
            idempotency_key
        });
        console.log("Charge:", {
            charge
        });
        status = "success";

    } catch (error) {
        console.error("Error:", error);
        status = "failure";
    }

    res.json({
        error,
        status
    });
});

//This is a post request it means when the user write something that we want to save in our data based
router.route("/update/:id").post((req, res) => {

    Transactions.findByIdAndUpdate(req.params.id)
        .then(Transactions => {
            Transactions.quantityAvailable = Number(req.body.quantity)
            Transactions.save()
                .then(() => res.json("Transactions updated!"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: ta mere " + err));
});


module.exports = router;
//Here we export the router
//Model 1 (customise if I want to) if components/stripe is on (don't forget to uncomment components/finalCarte line 191)

/*const id = req.body.token.id;
 const address = req.body.token.card.address_city;
 stripe.charges.create({
     amount: req.body.amount,
     currency: 'gbp',
     source: 'tok_visa',
     description: 'My First Test Charge (created for API docs)',
 })
 //If I want to save it in my mongoDB datas
 const newTransactions = new Transactions({
     id,
     address
 })

 newTransactions.save()
     .then(() => res.json('User added!'))
     .catch(err => res.status(400).json('Error: ' + err)); */