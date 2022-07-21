import { useState } from 'react';
import styled from 'styled-components';
import Palette from 'components/palette/Palette';
import parseURLtoImg from 'utils/colourquant';
import { useForm } from 'react-hook-form';
import MainLayout from 'components/layouts/MainLayout';
import Container from 'components/container/Container';
import { FormInput } from 'components/form/Form';
import PropagateLoader from 'react-spinners/PropagateLoader';

const GeneratorText = styled.div`
  text-align: center;
  margin: 0 auto;

  p {
    max-width: 60ch;
    margin: 0 auto;
  }
`;

const FormSection = styled.section`
  width: 100%;
  height: 100%;
  padding: 3rem 0;

  h1 {
    font-size: 4rem;
    text-align: center;
    color: var(--mustard);
    background: linear-gradient(150deg, #9414c7, #f63a5c, #fff585);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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

const Generator = () => {
  const [palette, setPalette] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm();


  const loadData = async (data) => {
    const palette = await parseURLtoImg(data);
    setPalette(palette);
  };
  const onSubmit = (data) => loadData(data);

  return (
    <MainLayout>
      <FormSection>
        <Container>
          <GeneratorText>
            <h1>Generate a Palette</h1>
            <p>Using <b>Kulay</b> is pretty straightforward. Add a URL to the form shown below, hit submit, and wait for the magic to happen! ✨</p>
          </GeneratorText>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput {...register('url', { required: true })} />
            {}
            <button type="submit">Submit</button>
          </form>
        </Container>
      </FormSection>
      <PaletteSection>
        <Container>
          {isSubmitting && (
            <LoaderContainer>
              <PropagateLoader color="#f14a4a" size={12} />
            </LoaderContainer>
          )}
          <div>
            {(isSubmitted && !isSubmitting) && (
              <Palette colours={palette} />
            )}
          </div>
        </Container>
      </PaletteSection>
    </MainLayout>
  );
};

export default Generator;
