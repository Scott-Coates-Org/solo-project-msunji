import { useForm } from 'react-hook-form';

const parseToRGB = (dataArr) => {
  // getImageData returns an array of RGBA values. This makes a new array that consists of only RGB values
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
    parseToRGB(imgData);
  };
  const onSubmit = (data) => loadData(data);
  return (
    <div>
      <h1>Test Generator</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('url', { required: true })} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Generator;
