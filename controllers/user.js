const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req,res,next)=>{
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(()=> res.status(200).json({msg: "utilisateur crée !!"}))
        .catch((error)=> res.status(400).json({error:error}))
    })
    .catch((error)=> res.status(500).json({error: error}));

}
exports.login = (req,res,next)=>{
    User.findOne({email: req.body.email})
    .then((user)=>{
        if(!user){
            return res.status(401).json({msg: 'email incorrecte'})
        }
        bcrypt.compare(req.body.password, user.password)
        .then((valid)=>{
            if(!valid){
                return res.status(401).json({msg: 'mot de passe incorrect'})
            }
            res.status(200).json({
                userId : user.id,
                token: jwt.sign({userId: user._id},
                    'RANDOM_TOKEN_KEY',
                    {expiresIn: '24h'})
            });
        })
        .catch((error)=>{
            res.status(500).json({error: error.message})
            console.log(error)
        })

    })
    .catch((error)=>res.status(500).json({error: error.message}))

}
exports.user = (req, res, next)=>{
    User.find()
    .then(user => res.status(201).json({user}))
    .catch((error)=> res.status(404).json({error: error.message}))
}

exports.userId = (req,res,next)=>{
    User.findOne({_id: req.params.id})
    .then(userId => res.status(201).json({userId}))
    .catch((error)=> res.status(404).json({error: error.message}))
}