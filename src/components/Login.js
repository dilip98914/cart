import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import lifecycle from 'react-pure-lifecycle';


const useStyles = makeStyles(theme => ({
container: {
    display: 'flex',
    flexWrap: 'wrap',
},
textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
},
dense: {
    marginTop: theme.spacing(2),
},
menu: {
    width: 200,
},
button: {
  margin: theme.spacing(1),
},
}));

const methods={
    componentDidMount(props){
    }
}



function Login() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        signInError:'',
        email:'',
        password:'',
    });
  


    const handleEmail = name => event => {
      setValues({ ...values, email: event.target.value });
    };

    const handlePassword = name => event => {
        setValues({ ...values, password: event.target.value });
      };
  


    const sendPostRequest=(state)=>{
        let {email,password}=state;

        fetch('http://localhost:8080/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept': 'application/json'

            },
            body:JSON.stringify({
                email:email,
                password:password,
            }),
        }).then((res)=>res.json())
            .then((json)=>{
                console.log('json:-',json);
                if(json.success){

                    setValues({
                        email:'',
                        password:'',
                        signInError:json.message,
                    });

                }else{
                    alert('Error loggin in pleass try again..');
                    setValues({
                        email:'',
                        password:'',
                        signInError:json.message,
                    });

                }
        });


    }


    const onLogin=(e)=>{
      console.log('login...');
        e.preventDefault();
        sendPostRequest(values);

    }
      
  


    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
                label="Email"
                className={classes.textField}
                type="email"
                name="email"
                margin="normal"
                variant="outlined"
                onChange={handleEmail()}
                value={values.email}
            />
        <TextField
                label="Password"
                className={classes.textField}
                type="password"
                name="password"
                margin="normal"
                variant="outlined"
                onChange={handlePassword()}
                value={values.password}

            />
        <Button variant="contained" color="primary" className={classes.button}
        onClick={onLogin}>
          login
        </Button>


      </form>
    );
  }
  
export default lifecycle(methods)(Login);