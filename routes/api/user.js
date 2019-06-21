const User = require('../../models/user.js');



module.exports=(app)=>{
    //sign up
    
    app.post('/api/account/signup',(req,res,next)=>{
        const {body}=req;
        const {password}=body;
        let {email}=body;

        if(!email){
            return res.send({
                success:false,
                message:"Error :Email can't be blank."
            })
        }

        if(!password){
            return res.send({
                success:false,
                message:"Error :Password can't be blank."
            })
        }
        
        email=email.toLowerCase();
        email=email.trim();

        // Steps:
        // 1.verify emial doesn't exits
        // 2. save it
        User.find({
            email:email
        },(err,previousUsers)=>{
            if(err){
                return res.send({
                    success:false,
                    message:"Error :server error"
                })
            }
            else if(previousUsers.length>0){
                return res.send({
                    success:false,
                    message:"Error :accout already exists."
                });
            }

            // save the new user
            const newUser=new User();
            newUser.email=email;
            newUser.password=newUser.generateHash(password);
            newUser.save((err,user)=>{
                if(err){
                    return res.send({
                        success:false,
                        message:"Error :server error"
                    });
                }
                return res.send({
                    success:true,
                    message:'Signed up'
                });
            }); 
        });


    });

// sign in
    app.post('/api/account/signin',(req,res,next)=>{
        const {body}=req;
        const {password}=body;
        let {email}=body;

        if(!email){
            return res.send({
                success:false,
                message:"Error :Email can't be blank."
            })
        }

        if(!password){
            return res.send({
                success:false,
                message:"Error :Password can't be blank."
            })
        }
        
        email=email.toLowerCase();
        email=email.trim();

        // Steps:
        // 1.verify emial doesn't exits
        // 2. save it
        User.find({
            email:email
        },(err,previousUsers)=>{
            if(err){
                return res.send({
                    success:false,
                    message:"Error :server error"
                })
            }
            else if(previousUsers.length>0){

                return res.send({
                    success:true,
                    message:"Signed In"
                });
            }

        });


    });



    
}