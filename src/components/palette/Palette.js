import theme from 'styles/theme';
import styled from 'styled-components';

const StyledPalette = styled.ul`
  max-width: 30rem;
  margin: 0 auto;
  border: 1px solid var(--black);
  box-shadow: 15px 17px var(--black);

  .list-item {
    height: auto;
    display: grid;
    grid-template-columns: 1;
    grid-template-rows: 1fr 1fr;

    &:first-child,
    &:last-child {
      overflow: hidden;
    }

    &:last-child {
      border-bottom: none;
    }

    &__colour-vals {
      padding: 1.5rem 0 1.5rem 2rem;
      flex: 1;
      border-bottom: 1px solid var(--black);

      p {
        font-size: 1.11rem;
        font-weight: bold;
        margin: 0;
        padding: 0;

        &:nth-of-type(2) {
          text-transform: uppercase;
        }
      }
    }

    @media screen and (min-width: ${theme.breakpoints.xs}) {
      grid-template-columns: 2fr 3fr;
      grid-template-rows: auto;
    }
  }
`;

const StyledPaletteCell = styled.div`
  background-color: ${({ $rgbcolor }) => $rgbcolor};
  width: 100%;
  min-height: 100px;
`;

const Palette = ({ colours }) => {
  return (
    <StyledPalette>
    {colours.map(({ rgbStr, hex }) => (
      <li className="list-item" key={rgbStr}>
        <StyledPaletteCell
          className="colour-cell"
          $rgbcolor={`${rgbStr}`}
        />
        <div className="list-item__colour-vals">
          <p>{rgbStr}</p>
          <p>{hex}</p>
        </div>
      </li>
    ))}
  </StyledPalette>
  )
}

export default Palette;