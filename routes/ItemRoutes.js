const router = require('express').Router();

//models import
const Item = require('../models/Item');
const Cart = require('../models/Cart');
const Cart_Item = require('../models/Cart_item');

require('dotenv').config();


//add new item
router.post('/create', async (req, res) => {
    try{
        const data = await Item.create({
            itemTitle : req.body.itemTitle,
            price : req.body.price,
            type : req.body.type
        })
        res.json({status:200, message:'Item Created successfully!!'})
    }
    catch(err){
        console.log(err);
    }

});

//get all items
router.get('/', async (req, res) => {
    const data = await Item.find({})
    res.send(data)
});

//get items regarding the item type
router.get('/:type', async (req, res) => {
    const data = await Item.find({type : _req.params.type})

    res.send(data)
});


//add item to the cart
router.post('/cart-item', async (req, res, _next) => {

    const data = await Cart_Item.create({
        itemTitle : req.body.itemTitle,
        price : req.body.price,
        count : req.body.count
    })

    const updateCart = await Cart.findOneAndUpdate({user_id : req.body.userId}, {$push : {items : data._id}})

    res.status(200).send(data)
});


//get cart items from the cart fro logged in user
router.get('/get-cart-items/:id',async (req,res) =>{
    
    try {
        const items = await Cart.findOne({user_id : req.params.id}).populate('items')
        console.log(items);

        res.status(200).send(items['items'])
    } catch (error) {
        res.status(500).send(error)
    }

});


module.exports = router;