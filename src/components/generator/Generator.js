import { useState, useEffect } from 'react';
import styled from 'styled-components';
import parseURLtoImg from 'utils/colourquant';
import { useForm } from 'react-hook-form';
import MainLayout from 'components/layouts/MainLayout';
import Container from 'components/container/Container';
import { FormInput } from 'components/form/Form';
import PropagateLoader from 'react-spinners/PropagateLoader';

const FormContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const StyledPalette = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const StyledPaletteCell = styled.div`
flex: 1;
max-width: 200px;
  background-color: ${({ $rgbcolor }) => $rgbcolor};
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

  const uniqueColours = [...new Map(palette.map(colour => [colour['rgbStr'], colour])).values()];

  return (
    <MainLayout>
      <Container>
        <FormContainer>
          <h2>Generate a Palette</h2>
          <form onSubmit={handleSubmit(onSubmit)}>

              <FormInput {...register('url', { required: true })} />
              {}
              <button type="submit">Submit</button>
          </form>
          {loading && (
            <PropagateLoader
              color="#f14a4a"
              size={12}
            />)}
          <div>
            <StyledPalette>
              {uniqueColours.map(({ rgbStr, hex }) => (
                <StyledPaletteCell key={hex} $rgbcolor={`${rgbStr}`}>
                  <p>{rgbStr}</p>
                  <p>{hex}</p>
                </StyledPaletteCell>
              ))}
            </StyledPalette>
          </div>
        </FormContainer>

      </Container>
    </MainLayout>
  );
};

export default Generator;
