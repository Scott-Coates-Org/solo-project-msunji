import { useState, useEffect } from 'react';
import styled from 'styled-components';
import parseURLtoImg from 'utils/colourquant';
import { useForm } from 'react-hook-form';
import MainLayout from 'components/layouts/MainLayout';
import Container from 'components/container/Container';

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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const loadData = async (data) => {
    const palette = await parseURLtoImg(data);
    setPalette(palette);
  };
  const onSubmit = (data) => loadData(data);
  const [palette, setPalette] = useState([]);

  // if (palette.length === 0) {
  //   setLoaded(false);
  // } else {
  //   setLoaded(true);
  // }

  const uniqueColours = [...new Map(palette.map(colour => [colour['rgbStr'], colour])).values()];

  return (
    <MainLayout>
      <Container>
        <p>Test Generator</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('url', { required: true })} />
          <button type="submit">Submit</button>
        </form>
        {palette.length === 0 ? (
          'Loading'
        ) : (
          <StyledPalette>
            {uniqueColours.map(({ rgbStr, hex }) => (
              <StyledPaletteCell key={hex} $rgbcolor={`${rgbStr}`}>
                <p>{rgbStr}</p>
                <p>{hex}</p>
              </StyledPaletteCell>
            ))}
          </StyledPalette>
        )}
      </Container>
    </MainLayout>
  );
};

export default Generator;
