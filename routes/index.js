module.exports=(app)=>{
    app.get('/',(req,res,next)=>{
        res.json('welcome to REST API');
    });
}