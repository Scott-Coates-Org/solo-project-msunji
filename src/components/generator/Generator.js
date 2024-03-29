import axios from 'axios';
import { useState, useEffect } from 'react';
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
  margin-bottom: 2rem;

  p {
    max-width: 60ch;
    margin: 0 auto;
  }
`;

const FormSection = styled.section`
  width: 100%;
  height: 100%;
  padding: 3rem 0;
  
  div:first-child {
    h1 {
      font-size: 2.5rem;
      font-size: clamp(2.5rem, 0.625rem + 6vw, 4rem);
      text-align: center;
      color: var(--mustard);
      background: linear-gradient(150deg, #9414c7, #f63a5c, #fff585);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    form {
      display: flex;
      justify-content: center;

      .form-inputs {
        position: relative;
        width: 30rem;
        display: flex;
        align-items: center;

        input {
          width: 100%;
          margin-bottom: 0;
          padding: 0.89rem;
        }
        button {
          position: absolute;
          color: white;
          text-transform: uppercase;
          right: 8px;
          outline: none;
          border: none;
          background: var(--blue-dark);
          padding: 9px 20px;
          border-radius: 4px;
          cursor: pointer;

          &:hover {
            background: var(--blue)
          }
        }
      }
    }
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

  const handleAPI = async (url) => {
    let endpoint = `${process.env.REACT_APP_APIFLASH_ENDPOINT}?access_key=${process.env.REACT_APP_APIFLASH_ACCESS_KEY}&url=${url}&format=jpeg&fresh=true&full_page=true&scroll_page=true&response_type=json&no_ads=true&wait_until=page_loaded&fail_on_status=400`;

    try {
      const res = await axios.get(endpoint);
      return res.data.url;
    } catch (err) {
      console.error(err);
    }
  }


  const onSubmit = async (data) => {
    const screenshotUri = await handleAPI(data.url);
    const swatches = await parseURLtoImg(screenshotUri);
    setPalette(swatches);
  }
  return (
    <MainLayout>
      <FormSection>
        <Container>
          <GeneratorText>
            <h1>Generate a Palette</h1>
            <p>Using <b>Kulay</b> is pretty straightforward. Add a URL to the form shown below, hit submit, and wait for the magic to happen! ✨</p>
          </GeneratorText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-inputs">
              <FormInput {...register('url', { required: true })} />
              <button type="submit">Submit</button>
            </div>
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
