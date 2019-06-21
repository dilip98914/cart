import React, { Component } from 'react';
import {Form,FormGroup,Label,Input,Button} from 'reactstrap';


class Signup extends Component {
    state={
        isLoading:true,
        token:'',
        signUpError:'',
        email:'',
        password:'',
        password2:'',
        passMatch:true,
        ready:false,
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

    onTextboxChangePassword2=(e)=>{
        this.setState({
            password2:e.target.value
        });        
    }

    checkPassMatch=(pass1,pass2)=>{
        if (pass1==pass2){
            return true;
        }else{
            return false;
        }
    }
    sendPostRequest(state){
        const {email,password}=state;

        fetch('http://localhost:8080/api/account/signup',{
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
                        signUpError:json.message,
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


    onSignUp=(e)=>{
        e.preventDefault();
        
        let {password,password2,ready}=this.state;

        this.setState({
            isLoading: true,
        });
        
        if(this.checkPassMatch(password,password2)){
            this.setState({passMatch:true,ready:true});
            this.sendPostRequest(this.state);
        }else{
            console.log('pass not match!');
            this.setState({passMatch:false,ready:false});
            this.setState({
                email:'',
                password:'',
                password2:'',
            });
        }

    }
    
    

    render() {
        const {
            isLoading,
            token,
            email,
            password,
            password2,
            signUpError,
            passMatch,
            ready
          } = this.state;

          if (!passMatch && !ready ){
            return (<div><p>Password doesn't match</p></div>);

          }

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
                    <FormGroup>
                    <Label for="examplePassword">Confirm Password</Label>
                    <Input 
                        type="password"
                        name="password2"
                        value={password2}
                        onChange={this.onTextboxChangePassword2}
                        placeholder="password placeholder"
                        required />
                    </FormGroup>
                    <Button 
                    color="primary"
                    onClick={this.onSignUp}
                    >Sign Up</Button>

                </Form>

              )
          }


    }
}

export default Signup;