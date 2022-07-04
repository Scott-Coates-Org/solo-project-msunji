import { useForm } from 'react-hook-form';

const parseURLtoImg = ({ url }) => {
  let colourArr;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = url;
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    colourArr = context.getImageData(0, 0, canvas.width, canvas.height).data;
    console.log(colourArr);
  };
  console.log(colourArr);
  // return console.log('url', url);
  console.log(img);
};

const Generator = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => parseURLtoImg(data);
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
