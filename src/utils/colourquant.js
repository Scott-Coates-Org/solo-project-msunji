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
