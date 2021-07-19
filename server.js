const express = require('express'); 
const {createServer} = require('http');
const compression = require('compression')
const morgan = require('morgan')
const app = express();
const fetch = require("node-fetch");
const path = require('path');
const dev = app.get('env') !== 'production'
const normalisePort = port => parseInt(port, 10);
const PORT = normalisePort(process.env.PORT || 8080);

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

 

if(!dev){
  app.disable('x-powered-by')
  app.use(compression())
  app.use(morgan('common'))

  app.use(express.static(path.resolve(__dirname, 'build')))
  app.use('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  })
}

if(dev){
  app.use(morgan('dev'))
}

const server = createServer(app)
server.listen(PORT, err => {
 if(err) throw err;

 console.log('Server Started');
});