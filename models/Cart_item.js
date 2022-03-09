const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const cart_item = new Schema({
    
    itemTitle : {
        type : String,
        required : false
    },
    price : {
        type : Number,
        required : false
    },
    count : {
        type : Number,
        required : true
    },
})

const cart_itemObj = mongoose.model("cart_item", cart_item);
module.exports = cart_itemObj;
