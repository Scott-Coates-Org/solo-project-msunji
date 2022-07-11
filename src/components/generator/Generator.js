import { useForm } from 'react-hook-form';
import MainLayout from 'components/layouts/MainLayout';
import Container from 'components/container/Container';

const parseToRGB = (dataArr) => {
  // getImageData returns an array of RGBA values. We want to remove alpha values
  // This function makes a new array that consists of only RGB values
  let rgbVals = [];
  for (let i = 0; i < dataArr.length; i += 4) {
    rgbVals.push({
      r: dataArr[i],
      g: dataArr[i + 1],
      b: dataArr[i + 2],
    });
  }
  console.log('parsed rgb', rgbVals);
  return rgbVals;
};

const getRange = (dataArr) => {
  // Get the upper- and lower-bounds for each channel
  // Calculate lower bounds;
  const getMin = (dataArr, channel) => {
    return dataArr.reduce((acc, pixel) => {
      return acc < pixel[channel] ? acc : pixel[channel];
    });
  };
  // Calculate upper bounds;
  const getMax = (dataArr, channel) => {
    return dataArr.reduce((acc, pixel) => {
      return acc > pixel[channel] ? acc : pixel[channel];
    });
  };
  // Lower bounds for each channel
  const rMin = getMin(dataArr, 'r');
  const gMin = getMin(dataArr, 'g');
  const bMin = getMin(dataArr, 'b');
  // Upper bounds for each channel
  const rMax = getMax(dataArr, 'r');
  const gMax = getMax(dataArr, 'g');
  const bMax = getMax(dataArr, 'b');

  console.log('rmin', rMin);
  console.log('rmax', rMax);
  console.log('gmin', gMin);
  console.log('gmax', gMax);
  console.log('bmin', bMin);
  console.log('bmax', bMax);

  // Calculate range per channel
  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;

  console.log(rRange, gRange, bRange);
};

const parseURLtoImg = ({ url }) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      let colourArr = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;
      resolve(colourArr);
    };
  });
};

const Generator = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const loadData = async (data) => {
    let imgData = await parseURLtoImg(data);
    console.log('moto data', imgData);
    let imgDataChannels = parseToRGB(imgData);
    getRange(imgDataChannels);
  };
  const onSubmit = (data) => loadData(data);
  return (
    <MainLayout>
      <Container>
        <p>Test Generator</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('url', { required: true })} />
          <button type="submit">Submit</button>
        </form>
      </Container>
    </MainLayout>
  );
};

export default Generator;
