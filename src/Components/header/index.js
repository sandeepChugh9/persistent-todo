
import { useSelector } from 'react-redux';
import './index.css';

function Header() {
  const userState = useSelector((state) => state.user);
  
  const onLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.reload(1);
  }

  return (
    <div className="header">
        Task Manager
        {
          userState.loggedInUser && userState.loggedInUser.username &&
          <div>
             <div className='username'>{userState.loggedInUser.username} <span className="smalltext">( {userState.loggedInUser.email} )</span></div> 
             <div onClick={onLogout} className="smalltext logout">Logout</div>
          </div>
        }
    </div>
  );
}

export default Header;
