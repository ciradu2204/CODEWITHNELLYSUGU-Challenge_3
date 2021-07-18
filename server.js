const express = require('express'); 
const app = express();
const fetch = require("node-fetch");
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


const port = process.env.port || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));