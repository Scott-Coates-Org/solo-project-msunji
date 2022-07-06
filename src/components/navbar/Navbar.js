import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledNav = styled.nav`
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
  return (
    <StyledNav>
      <div className="nav-container">
        <div>logo</div>
        <div classNames="nav-links">
          <div className="nav-link">
            <Link to="/login">Login/Signup</Link>
          </div>
        </div>
      </div>
    </StyledNav>
  );
};

export default Navbar;
