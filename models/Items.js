const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const itemSchema = new Schema({

    itemTitle: {
        type: String,
        required: true,
        index: true
    },
    price:{
        type: Number, 
        required: true, 
    },
    type: {
        type: String,
        required: true
    }
}).index({ itemTitle: 'text', price: 'text'});


const Item = mongoose.model("item", itemSchema);
Item.createIndexes();
module.exports = Item;