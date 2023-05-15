const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path')
app.use(express.json());
const mongoose = require('mongoose');
const bodyParse = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/images',express.static(path.join(__dirname,'images')));

const glorRoute = require("./router/stuff");
const authenUser = require("./router/user")




mongoose.connect("mongodb+srv://konany:konanycode@cluster0.yf1czwi.mongodb.net/?retryWrites=true&w=majority",
{ useNewUrlParser: true,useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



  app.use('/api/stuff', glorRoute);
  app.use('/api/auth', authenUser);

// app.post('/api/stuff', async (req, res, next)=>{
//     delete req.body._id;
//     const thing = new Thing({
//         ...req.body
//     });
//     await thing.save()
//     .then(()=>{
//         res.status(200).json({ msg:'objet enregistré !!'})
//     })
//     .catch(error =>{
//         res.status(400).json({error})
//     })
//   });

// app.get('/api/stuff', async(req, res)=>{
//   await Thing.find()
//   .then(thing=> res.status(201).json({thing}))
//   .catch(error => res.status(404).json({error}))
// })
// app.get('/api/stuff:id', (req, res)=>{
//   console.log(req.params.id);
//   Thing.findOne({_id: req.params.id})
//   .then(thing => res.status(200).json({thing}))
//   .catch(error => res.status(404).json({error}))
// })

// app.put('/api/stuff/:id', (req, res, next)=>{
//   console.log("gjgjgjg",req.body);
//   Thing.updateOne({_id:req.params.id}, {...req.body, _id:req.params.id})
//   .then(()=> res.status(200).json({msg:'modification effectuée !!!'}))
//   .catch(error => res.status(400).json({error}));
// })

// app.delete('/api/stuff/:id',(req, res,next)=>{
//   Thing.deleteOne({_id:req.params.id})
//   .then(()=> res.status(200).json({msg: 'Element supprimé !!'}))
//   .catch(error => res.status(400).json({error}))
// });


module.exports = app;