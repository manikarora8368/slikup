const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.signinLogin =async function(req,res){
    try{
        let user = await User.findOne({username: req.body.username});
        if(!user|| user.password!= req.body.password){
        return res.json(422 ,{
            message: "invalid username/password"
        })
        }
        return res.json(200 , {
            message: "sign in successful",
            data:{
                token: jwt.sign(user.toJSON(), 'codeial' , {expiresIn: '100000'})
            }
        })

    }catch(err){
        return res.json(500 , {
            message: 'internal server error'
        });
    }
    
}