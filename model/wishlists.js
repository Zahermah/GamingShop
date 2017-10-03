var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObejctId = mongoose.Schema.Types.ObjectId;

//Creating a relationship with product tabell
var wishlist =  new Schema({
    title:{type:String,default:"Nice Wish List"},
    products:[{type:ObejctId,ref:'Product'}]
});


module.exports= mongoose.model('Wishlist',wishlist);