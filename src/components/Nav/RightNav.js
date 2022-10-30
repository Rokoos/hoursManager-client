import React, {Fragment} from 'react';
import { withRouter, Link } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { chooseRegister, logout } from '../../actions'
import { signout, isAuthenticated , killToken} from '../Auth'
import styled from 'styled-components';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
    li {
      padding: 1rem 2rem;
      align-items: center;

      a{
        color: #fff;
      }
    }
  
  @media (max-width: 768px) {
    padding-top: 3rem;
    padding-bottom: 1.5rem;
    background-color: #000;
    position: fixed;
    flex-direction: column;
    align-items: start;
    z-index: 100;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    
    transition: transform 0.3s ease-in-out;
  }
`;

const RightNav = ({ open, toggle, history }) => {

  const dispatch = useDispatch()
  // const user = useSelector(state => state.user)

    const toggleNavBar = () => {
        toggle(open)
    }
    const handleSignout = () => {
      toggle(open)
      signout()
    }

    const isActive = (history, path) => {
      if(history.location.pathname === path) {
        return 'nav_active'
      }
      return ''
    }

    const renderOptions = () => {
      if(!isAuthenticated()){
        return (
        <div className="nav_link">
          <li
          onClick={toggleNavBar}
          className={isActive(history, "/")}
          >
            <Link className='header-main_color' to="/">Zaloguj</Link>
          </li>
          <li 
          onClick={toggleNavBar}
          className={isActive(history, "/signup")}
          >
            <Link 
            className='header-main_color'
            onClick={() => {
              dispatch(chooseRegister(''))
              killToken()
            }}
            to="/signup"
            >Rejestracja</Link>
          </li>
        </div>
        )

      }

      return (
        <div className="nav_link">
          <li 
          onClick={() =>{
            handleSignout()
            dispatch(logout())
          } }
          >
            <Link className='header-main_color'
            to="/">Wyloguj</Link>
          </li>
        </div>
      )
    }
  return (
    <Fragment>
    <Ul open={open}>
       <div className="nav_link">
       
       {isAuthenticated().role === 'admin' && (
          <li 
        className={isActive(history, "/admin/dashboard")}
        onClick={toggleNavBar}
        >
          <Link className='header-main_color'
          to="/admin/dashboard">Tablica</Link>
        </li>
        
       )}

       {isAuthenticated().role === 'user' && (
       
        <li 
        className={isActive(history, `/user/${isAuthenticated()._id}`)}
        onClick={toggleNavBar}
        >
          <Link className='header-main_color'
          to={`/user/${isAuthenticated()._id}`}>Mój Profil</Link>
        </li>
       )}
       </div>
        {renderOptions()}
    </Ul>
    
    
    </Fragment>
  )
}

export default withRouter(RightNav)

// <Modal
//     toggle={modalToggle}
//     modal={modal}
//     >
//     <ChooseRegister
//     toggle={modalToggle}
//     />
//     </Modal>