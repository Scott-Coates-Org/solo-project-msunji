import styled from 'styled-components';

const StyledNav = styled.nav`
  background: white;
  width: 100%;
  border-bottom: 1px solid var(--black);
  padding: 1.5rem 0;

  .nav-container {
    max-width: 1200px;
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Navbar = ({ children }) => {
  return (
    <StyledNav>
      <div className="nav-container">
        <div>logo</div>
        {children}
      </div>
    </StyledNav>
  );
};

export default Navbar;
