const User = require('../../models/user.js');
const config = require('../../config/config')
const csurf=require("csurf");
const jwt=require('jsonwebtoken');
const Joi=require('joi');

let csrfProtection=csurf();
// app.use(csrfProtection);

const secret = 'mysecretsshhh';


//to protect routes custom middleware
const withAuth = function(req, res, next) {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.cookies.token;
    if (!token) {
      res.status(401).send('Unauthorized: No token provided');
    } else {
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          res.status(401).send('Unauthorized: Invalid token');
        } else {
          req.email = decoded.email;
          next();
        }
      });
    }
  }

// const schema = {
// email: Joi.string().email(),
// password: Joi.string()//.regex(
// //    new RegExp('^[a-zA-Z0-9]{8,32}$')
// // )
// }


module.exports=(app)=>{
    
    // POST route to register a user
    app.post('/register', function(req, res) {
        let { email, password } = req.body;
        User.find({
                email:email
            },(err,previousUsers)=>{
                if(err){
                    return res.send({
                        success:false,
                        message:"Error :server error"
                    });
                }else if(previousUsers.length>0){
                    return res.send({
                        success:false,
                        message:"User already exists!"
                    });
                }else{
                    const user = new User();
                    user.email=email;
                    user.password=user.generateHash(password);

                    user.save(function(err) {
                        if (err) {
                            res.status(500)
                            .send({
                                message:'Error registering new user please try again'
                            });
                        } else {
                            res.status(200).send({
                                message:'success'
                            });
                        }
                        });

                }
            })
    });

    // login route
    app.post('/login',(req,res,next)=>{
        let { email, password } = req.body;
        User.find({
                email:email
            },(err,previousUsers)=>{
                if(err){
                    return res.send({
                        success:false,
                        message:"Error :server error"
                    });
                }else if(previousUsers.length>0){
                    user=previousUsers[0];
                    if(user.validPassword(password)){
                    const token = jwt.sign(user.toJSON(), secret, {
                        expiresIn: '1h'
                    });
                    return res.cookie('token', token, { httpOnly: true }).send({
                        success:true,
                        message:'signed IN!'
                    });
                    }
                    return res.send({
                        success:false,
                        message:"wroong password!"
                    });
                }
            });
        });

        app.get('/checkToken', withAuth, function(req, res) {
            res.sendStatus(200);
        });

        app.get('/profile', withAuth, function(req, res) {
        return res.send({
            success:true,
            message:"welcome to profile",
        });
      });//
    
}