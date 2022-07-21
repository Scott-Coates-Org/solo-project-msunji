import { useState } from 'react';
import styled from 'styled-components';
import Palette from 'components/palette/Palette';
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
