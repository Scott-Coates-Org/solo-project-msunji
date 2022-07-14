import { useState, useEffect } from 'react';
import theme from 'styles/theme';
import styled from 'styled-components';
import parseURLtoImg from 'utils/colourquant';
import { useForm } from 'react-hook-form';
import MainLayout from 'components/layouts/MainLayout';
import Container from 'components/container/Container';
import { FormInput } from 'components/form/Form';
import PropagateLoader from 'react-spinners/PropagateLoader';

const FormSection = styled.section`
  width: 100%;
  height: 100%;
  background: var(--mustard);
  padding: 3rem 0;

  h1 {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const PaletteSection = styled.section`
  width: 100%;
  height: 100%;
  padding: 3rem 0;
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 3rem;
`;

const StyledPalette = styled.ul`
  max-width: 30rem;
  margin: 0 auto;
  border-radius: 1.2rem;

  .list-item {
    height: auto;
    display: grid;
    grid-template-columns: 1;
    grid-template-rows: 1fr 1fr;

    &:first-of-type {
      border-radius: 15px 0 0 0;
    }
    &:last-of-type {
      border-radius: 0 0 0 15px;
    }

    &:first-child,
    &:last-child {
      overflow: hidden;
    }

    &__colour-vals {
      padding: 1.5rem 0 1.5rem 2rem;
      flex: 1;
      border-bottom: 1px solid var(--grey);
      border-style: inset;

      p {
        font-size: 0.99rem;
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

const Generator = () => {
  const [palette, setPalette] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const loadData = async (data) => {
    setLoading(true);
    const palette = await parseURLtoImg(data);
    setLoading(false);
    setPalette(palette);
  };
  const onSubmit = (data) => loadData(data);

  return (
    <MainLayout>
      <FormSection>
        <Container>
          <h1>Generate a Palette</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput {...register('url', { required: true })} />
            {}
            <button type="submit">Submit</button>
          </form>
        </Container>
      </FormSection>
      <PaletteSection>
        <Container>
          {loading && (
            <LoaderContainer>
              <PropagateLoader color="#f14a4a" size={12} />
            </LoaderContainer>
          )}
          <div>
            {!loading && (
              <StyledPalette>
                {palette.map(({ rgbStr, hex }) => (
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
            )}
          </div>
        </Container>
      </PaletteSection>
    </MainLayout>
  );
};

export default Generator;
