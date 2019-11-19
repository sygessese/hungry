const express = require('express');
const app = express();
const port = 3000;
// const yelpDev = require('./yelpAPI');
const db = require('./db/connection');

app.post('/api/newrestaurant/', (req, res) => {
  const info = req.query;
  db.Create(info)
    .then(success => res.send(success))
    .catch(error => res.send(error))
});

app.get('/api/restaurants/', (req, res) => {
  res.send(['Restaurant one', 'Restaurant two', 'Restaurant three', 'Restaurant four', 'Restaurant five', 'Restaurant six', 'Restaurant seven', 'Restaurant eight', 'Restaurant nine', 'Restaurant ten'])
  // db.Read()
  //   .then(restaurants => res.send(restaurants))
  //   .catch(error => res.send(error))
});

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
