const { exists } = require('../model/model');
var UserDB = require('../model/model');

// create & save user 
exports.create = (req, res)=>{
    // checking for khali body
    if( !req.body ){
        res.status(400).send({message:" kuch toh info do!"});
        return;
    }

    // make new user
    const user = new UserDB({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status

    });

    // save user to DB 
    user
        .save(user)
        .then(data => {res.redirect('/add-user')} )
        .catch(err =>{
            res.status(500).send({message: err.message || "error while creating "})
        })
}

// retrieve and return user 
exports.find = (req, res)=>{
    // single user
    if(req.query.id){
        const id = req.query.id; 

        UserDB.findById(id)
            .then(data =>{
                if(!data)
                    res.status(404).send({message:"user not found"})
                else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"error while retrieving "})
            })
    }
    // all users
    else{
        UserDB.find()
            .then(user => {res.send(user)} )
            .catch(err => {
                res.status(500).send({message: err.message || "error while retrieving "})
            })
    }
}

// update user
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message:"emtpy data kaise update hoga bhaiya? "})
    }

    const id = req.params.id;
    UserDB.findByIdAndUpdate(id, req.body)
        .then(data =>{
            if(!data){
                res.status(400).send({message: "cannot update"})
            }
            else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message: "error while updating "})
        })
}

// delete user
exports.delete = (req, res)=>{
    const id = req.params.id;

    UserDB.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: "can't delete with this id"})
            }
            else{
                res.send({message: "user ka khatma ho gaya"})
            }
        })
        .catch(err=>{  
            res.status(500).send({message:"could not delete with this id"})
        })
}