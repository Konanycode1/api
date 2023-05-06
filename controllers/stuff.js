const Thing = require("../models/thing");
const fs = require('fs')


exports.createThing = (req,res,next)=>{
    const thingObjet = JSON.parse(req.body.thing);
    delete thingObjet._id
    delete thingObjet.userId
    const thing = new Thing({
        ...thingObjet,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()
    .then(()=> res.status(201).json({msg: "Enregistrement effectuée !!"}))
    .catch((error)=> res.status(400).json({error: error}))
};
exports.updateThing = (req,res,next)=>{
    const thingObjet = req.file ? {
        ...JSON.parse(req.body),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }: {...req.body}
    delete thingObjet.userId
    Thing.updateOne({_id: req.params.id})
    .then((thing)=> {
        if(thing.userId != req.auth.userId){
            res.status(401).json({msg:'non autorisé'})
        }
        else{
            Thing.updateOne({_id:req.params.id},{...thingObjet, _id:req.params.id})
            .then(()=>res.status(200).json({msg: 'objet modifié!!'}))
            .catch(()=> res.status(401).json({error: error.message}));
        }

    })
    .catch((error)=> res.status(400).json({error:error.message}))
};

exports.deleteThing = (req,res,next)=>{

    Thing.findOne({_id:req.body.id})
    .then((thing)=>{
        if(thing.userId != req.auth.userId){
            res.status(401).json({msg: 'non autorisé'});
        }
        else{
            const filename = thing.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, ()=>{
                Thing.deleteOne({_id: req.params.id})
                .then(()=> res.status(200).json({message: 'Objet supprimé !'}))
                .catch((error)=> res.status(401).json({error: error.message}))
            })

        }
    })
    .catch((error)=> res.status(400).json({error: error}))
};

exports.addAll = (req,res,next)=>{
    Thing.find()
    .then((data)=> res.status(200).json({data}))
    .catch((error)=> res.status(400).json({error: error}))
};
exports.addId=(req,res, next)=>{
    Thing.findOne({_id: req.params.id})
    .then((things) => res.status(200).json({things}))
    .catch((error)=> res.status(404).json({error:error}))
};
