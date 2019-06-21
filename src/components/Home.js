import React, { Component } from 'react';

class Home extends Component {
    state={
        isLoading:true,
        token:'',
        signUpError:'',
        signInError:'',
        signInEmail:'',
        signInPassword:'',
        signUpEmail:'',
        signUpPassword:'',
    };

    componentDidMount() {
        this.setState({
          isLoading: false
        });
     }

    onTextboxChangeEmail=(e)=>{
        this.setState({
            signUpEmail:e.target.value
        });        
    }

    onTextboxChangePassword=(e)=>{
        this.setState({
            signUpPassword:e.target.value
        });        
    }


    onSignUp=()=>{
        const {signUpEmail,signUpPassword}=this.state;
        
        this.setState({
            isLoading: true,
          });

        // post request to backend
        fetch('http://localhost:8080/api/account/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept': 'application/json'

            },
            body:JSON.stringify({
                email:signUpEmail,
                password:signUpPassword,
            }),
        }).then((res)=>res.json())
            .then((json)=>{
                console.log('json',json);
                if(json.success){
                    this.setState({
                        signUpError:json.message,
                        isLoading:false,
                        signUpEmail:'',
                        signUpPassword:'',
                    });
                }else{
                    this.setState({
                        signUpError:json.message,
                        isLoading:false,
                    });
                }
            });
    }
    
    

    render() {
        const {
            isLoading,
            token,
            signInError,
            signInEmail,
            signInPassword,
            signUpEmail,
            signUpPassword,
            signUpError,
          } = this.state;


          if(isLoading){
              return (<div><p>Laoding....</p></div>);
          }

          if(!token){
              return(
                  <div>
                      <p>Sign Up</p>
                       <input 
                        type='email'
                        placeholder='Email'
                        name="signUpEmail"
                        value={signUpEmail}
                        onChange={this.onTextboxChangeEmail}
                        /> 
                        <br/>
                        <input 
                        type='password'
                        placeholder='Password'
                        name="signUpPassword"
                        value={signUpPassword}
                        onChange={this.onTextboxChangePassword}
                        /> 
                        <br/>

                        <button onClick={this.onSignUp}>Sign Up</button>


                  </div>
              )
          }


    }
}

export default Home;