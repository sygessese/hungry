const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hungry', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('success db'))
  .catch(err => console.log(err))

var Restaurant = new mongoose.Schema({
  name: String,
  image: String,
  liked: Boolean,
});

var Restaurants = mongoose.model('Restaurants', Restaurant);

function Create(info) {
  var newRestaurant = new Restaurants(info);
  return newRestaurant.save()
}

function Read() {
  return Restaurants.find()
}

function Update(id, liked) {
  return Restaurants.findByIdAndUpdate(id, { liked: liked })
}

function Delete(id) {
  return Restaurants.findByIdAndDelete(id)
}

module.exports.Create = Create;
module.exports.Read = Read;
module.exports.Update = Update;
module.exports.Delete = Delete;
