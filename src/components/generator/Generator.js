import { useState, useEffect } from 'react';
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
  border: 1px solid grey;
  border-radius: 1.2rem;

  .list-item {
    height: auto;
    display: flex;

    &__colour-vals {
      padding: 1rem 0 1rem 2rem;
      flex: 2;
      flex-grow: 2;
      border-bottom: 1px solid grey;

      &:last-of-type {
        border: 0;
      }

      p {
        margin-bottom: 0;
      }
    }
  }
`;

const StyledPaletteCell = styled.div`
  flex: 1;
  background-color: ${({ $rgbcolor }) => $rgbcolor};

  &:last-of-type {
    border-bottom-left-radius: 2rem;
  }
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
                  <div className="list-item" key={hex}>
                    <StyledPaletteCell
                      key={hex}
                      $rgbcolor={`${rgbStr}`}
                    ></StyledPaletteCell>
                    <div className="list-item__colour-vals">
                      <p>{rgbStr}</p>
                      <p>{hex}</p>
                    </div>
                  </div>
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
