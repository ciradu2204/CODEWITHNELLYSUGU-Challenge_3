const express = require('express'); 
const app = express();
const fetch = require("node-fetch");
const cors = require('cors');
const path = require('path');
let result = {};
const getData = async(id) =>{
    await fetch("https://jsonplaceholder.typicode.com/albums/" + id + "/photos")
    .then((resp) => {return resp.json()})
    .then((data) => { 
       result = data; 
   })
    .catch((error) => {return error})
}

/** End point  */

app.get('/api/albums/:id/photos', async(req, res) =>{
    let id = req.params.id;
     await getData(id);
      for(const property in result){
         delete result[property].url;
           delete result[property].id;
           delete result[property].albumId;
      }
       res.send(result);
});

const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://nameless-harbor-57237.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const port = process.env.port || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));