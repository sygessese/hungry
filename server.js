const express = require('express');
const app = express();
const port = 3000;
// const yelpDev = require('./yelpAPI');
const db = require('./db/connection');
const request = require('request');

var headers = {
  'Authorization': 'Bearer Cltrz7Tt9bodyBWjZV7wzKKIQbpG_yg4XbHP-0KOiIzvP0eRKK-jNKyhwajRAAInJIV_7-NBFmUlykKJX-8worvIvpf40h5f9Jstlx-zkwOF4a3F2RvqpixbolnQXXYx',
  'Content-Type': 'application/graphql'
};

var dataString = '{ search( term:"food", latitude: 37.785834, longitude: -122.406417, open_now: true, limit: 5 ) { business { name rating review_count photos id categories { title } price } }}';

var options = {
  url: 'https://api.yelp.com/v3/graphql',
  method: 'POST',
  headers: headers,
  body: dataString
};

app.post('/api/newrestaurant/', (req, res) => {
  const info = req.query;
  db.Create(info)
    .then(success => res.send(success))
    .catch(error => res.send(error))
});

app.get('/api/restaurants/', (req, res) => {
  res.send(['Canlis', `Walrus and Carpenter`, 'El Borracho', 'Japonessa', 'Il Corvo', 'Le Pichet', 'Salumi', 'Macrina', 'Rocco', 'Mediterranean Mix', 'Poke Bar'])
  // db.Read()
  //   .then(restaurants => res.send(restaurants))
  //   .catch(error => res.send(error))
});

app.get('/test', (req, res) => {
  request(options, (error, response, body) => {
    if (error) {
      res.sendStatus(500)
    }
    res.send(body)
  })
})

app.put('/api/restaurants/', (req, res) => {
  const id = req.query.id;
  const liked = req.query.liked;
  db.Update(id, liked)
    .then(success => res.send(success))
    .catch(error => res.send(error))
});

app.delete('/api/restaurants/remove', (req, res) => {
  const id = req.query.id;
  db.Delete(id)
    .then(success => res.send(success))
    .catch(error => res.send(error))
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
