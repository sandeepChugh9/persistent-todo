
import {  useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import Input from '../input';
import Button from '../button';
import './index.css';
import { addUser } from '../../actions/userActions'
import { withRouter, Redirect } from 'react-router-dom';
import { userAuth } from '../../utils';

const Login = (props) => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);
    const history = props.history;
    let errMessage = error || userState.loginError || '';
    const onContinueClick = () => {
        if(!username.length){
          setError('Please enter your name');
          return;
        }

        if(!email.length){
          setError('Please enter your email id');
          return;
        }

        if(!validateEmail()){
          setError('Please enter a valid email');
          return;
        }

        dispatch(addUser({ username , email})).then(()=>{
          history.push("/tasks");
        });
    }

    const validateEmail = () => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    if(userAuth.isAuthenticated()){
      return  <Redirect to="/tasks"></Redirect>
    }

    return(
      <div className="loginform">
        <div className='loginHeader'> Login </div>  
        <div className='loginRow'>
          <Input id="username" label="Your Name" value={username} onChange={(event => setName(event.target.value))}/>
         </div> 
         <div className='loginRow'>
          <Input id="emailid" label="Email ID" value={email} onChange={(event => setEmail(event.target.value))}/>
         </div> 
       <div className="errorDiv">{errMessage}</div>
       <Button inProgress={userState.loginProgress} text="SUBMIT" onClick={onContinueClick} styles={{width: '300px', marginTop: '20px'}}/>
      </div>
    )
}



export default withRouter(Login);