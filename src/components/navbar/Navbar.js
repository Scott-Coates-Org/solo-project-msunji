import { useContext } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from 'components/user/auth';

const NavLogo = styled.span`
  font-size: 2rem;
  font-weight: 700;
  font-family: var(--sansSerif);
  text-transform: lowercase;
`;

const StyledNav = styled.nav`
  z-index: 20;
  background: white;
  width: 100%;
  border-bottom: 1px solid var(--black);

  .nav-container {
    max-width: 1200px;
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-link {
    border-left: 1px solid black;
    border-right: 1px solid black;
    padding: 1rem 1.5rem;

    &:hover,
    &:focus {
      background: black;
      a,
      a:visited {
        color: var(--blue);
      }
    }

    a,
    a:visited {
      color: var(--black);
    }
  }
`;

const Navbar = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log('user', user);

  return (
    <StyledNav>
      <div className="nav-container">
        <NavLogo><Link to="/">Kulay</Link></NavLogo>
        <div className="nav-links">
          <div className="nav-link">
            {!!user ? (<Link to="/logout">Logout</Link>) : (<Link to="/login">Login/Signup</Link>)}
          </div>
        </div>
      </div>
    </StyledNav>
  );
};

export default Navbar;
