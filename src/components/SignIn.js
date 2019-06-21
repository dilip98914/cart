import React, { Component } from 'react';
import {Form,FormGroup,Label,Input,Button} from 'reactstrap';


class SignIn extends Component {
    state={
        isLoading:true,
        token:'',
        signInError:'',
        email:'',
        password:'',
        password2:'',
    };

    componentDidMount() {
        this.setState({
          isLoading: false
        });
     }

    onTextboxChangeEmail=(e)=>{
        this.setState({
            email:e.target.value
        });        
    }

    onTextboxChangePassword=(e)=>{
        this.setState({
            password:e.target.value
        });        
    }


    sendPostRequest(state){
        const {email,password}=state;

        fetch('http://localhost:8080/api/account/signin',{
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
                console.log('json',json);
                if(json.success){
                    this.setState({
                        signInError:json.message,
                        isLoading:false,
                        email:'',
                        password:'',
                    });
                }else{
                    this.setState({
                        signUpError:json.message,
                        isLoading:false,
                    });
                }
        });


    }


    onSignIn=(e)=>{
        e.preventDefault();
        

        this.setState({
            isLoading: true,
        });
        
        this.sendPostRequest(this.state);

    }
    
    

    render() {
        const {
            isLoading,
            token,
            email,
            password,
            signInError,
          } = this.state;


          if(isLoading){
              return (<div><p>Laoding....</p></div>);
          }

          if(!token){
              return(

                <Form>
                    <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input 
                        type="email" 
                        name="email"
                        value={email}
                        onChange={this.onTextboxChangeEmail}
                        id="exampleEmail"
                        placeholder="Enter your Email" 
                        required/>
                    </FormGroup>
                    <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input 
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.onTextboxChangePassword}
                        placeholder="password placeholder"
                        required />
                    </FormGroup>
                    
                    <Button 
                    color="primary"
                    onClick={this.onSignUp}
                    >Sign In</Button>

                <div>
                    <strong><p>not a user <a href="/signup">SignUp </a></p></strong>
                </div>

                </Form>



              )
          }


    }
}

export default SignIn;