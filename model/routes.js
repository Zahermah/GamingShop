var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var router = express.Router();

var Product = require('./product');
var Wishlist = require('./wishlists');


//Create connection the mongodb on your local computer
var mongoDatabase = mongoose.connect('mongodb://localhost/one-tap');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));


router.post('/product', function(request, response){
    var product = new Product();
    product.title = request.body.title;
    product.price = request.body.price;
    product.save(function(err, saveProduct){
        if(err){
            response.status(500).send({error:"Cloud not save product"});
        }else{
            response.send(saveProduct);
        }
    });

});

router.get('/product', function(request, response){
   Product.find({},function(err,products){
       if(err){
           response.status(500).send({error:"Couldt not find products"});
       }else{
           response.send(products);
       }
   });

});


router.get('/wishlist', function(request, response){
   Wishlist.find({}).populate({path:'products', model:'product'}).exec(function(err,wishLists)
   {
       if(err){
           response.status(500).send({error:"Could not populate wishlist"});
       }else{
           response.send(wishLists);
       }
   });
      
});
   
   


router.post('/wishlist', function(request, response){
   var wishlist = new Wishlist();
   wishlist.title = request.body.title;

   wishlist.save(function(err,newWishlist){
       if(err){
           response.status(500).send({error:"Could not create list"});
       }else{
           response.send(newWishlist);
       }
   });

});

router.put('/wishlist/product/add',function(request,response){
   Product.findOne({_id: request.body.productId},function(err,product){
       if(err){
           response.status(500).send({error:"Could not add to wishlist"});
       }else{
           Wishlist.update({_id:request.body.wishListId},{$addToSet:{products:product._id}},
           function(err,wishList){
               if(err){
                   response.status(500).send({error:"Could not add item to wishlist"});
               }else{
                   response.send("Your wishlist has been updated");
               }
           }
           );
       }

   });

});

module.exports = router;