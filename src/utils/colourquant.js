const parseToRGB = (dataArr) => {
  // getImageData returns an array of RGBA values for each pixel in the image. We want to remove alpha values
  // This function makes a new array that consists of only RGB values
  let rgbVals = [];
  for (let i = 0; i < dataArr.length; i += 4) {
    rgbVals.push({
      r: dataArr[i],
      g: dataArr[i + 1],
      b: dataArr[i + 2],
    });
  }
  return rgbVals;
};

const getRange = (dataArr) => {
  // You'll need to sort the pixels by the channel with the largest range

  // First, get the upper- and lower-bounds for each channel
  // Calculate lower bounds
  const getMin = (dataArr, channel) => {
    return dataArr.reduce((acc, pixel) => {
      return acc < pixel[channel] ? acc : pixel[channel];
    });
  };
  // Calculate upper bounds
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

  // Calculate range per channel
  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;

  let largestRange = Math.max(rRange, gRange, bRange);

  // Math.max will return a numerical value, so we'll compare this with the range values above
  // if two or more channels share the same range, this function will return the first value that
  // meets the criteria
  if (largestRange === rRange) {
    return 'r';
  } else if (largestRange === gRange) {
    return 'g';
  } else {
    return 'b';
  }
};

const generatePalette = (dataArr, totalIterations) => {
  // We'll stop when we reach the number of buckets (swatches) we want, which is 3
  // when we reach the base case, we get the average colour values for each bucket
  // Since median cut divides an array into two with each iteration, we can only get
  // nums of colours in powers of 2. With numBuckets set to three, we get a total of
  // eight colours in the generated palette.

  // Convert RGB values to HEX values
  // This answer on Stack Overflow was immensely helpful: https://stackoverflow.com/a/39077686
  const rgbToHex = (rgbObj) => {
    let hex = [];
    for (const channel in rgbObj) {
      const toHex = rgbObj[channel].toString(16);
      hex.push(toHex);
    }
    return `#${hex.join('')}`;
  };

  // This returns the RGB value as a string for users to copy
  const rgbToString = (rgbObj) => {
    let rgbString = Object.values(rgbObj).toString();
    return `rgb(${rgbString})`;
  };

  if (totalIterations === 0) {
    let aveRGB = { r: 0, g: 0, b: 0 };
    let colourData = {
      rgbStr: '',
      hex: '',
    };
    // calculate average value
    // Use Math.round to round out results. Recall that RGB values are integers from 0-255
    const getAve = (dataArr, channel) => {
      return Math.round(
        dataArr.reduce(
          (prevPixel, currPixel) => prevPixel + currPixel[channel],
          0
        ) / dataArr.length
      );
    };
    aveRGB.r = getAve(dataArr, 'r');
    aveRGB.g = getAve(dataArr, 'g');
    aveRGB.b = getAve(dataArr, 'b');

    colourData = {
      rgbStr: rgbToString(aveRGB),
      hex: rgbToHex(aveRGB),
    };

    return [colourData];
  }

  // Get channel with largest range/variance
  const channelToSortBy = getRange(dataArr);

  // (1) Sort
  dataArr.sort((pixel1, pixel2) => {
    return pixel1[channelToSortBy] - pixel2[channelToSortBy];
  });

  // (2) Get median value -- Use Math.floor to round down in case the array length is odd
  const medianVal = Math.floor(dataArr.length / 2);

  // (optional) Get mean value, then find the element in the array with the closest value to the mean

  // return subarrays
  return [
    ...generatePalette(dataArr.slice(0, medianVal), totalIterations - 1),
    ...generatePalette(dataArr.slice(medianVal), totalIterations - 1),
  ];
};

// Convert RGB to HEX values

const parseURLtoImg = ({ url }) => {
  // This function takes an image URL, draws it onto a canvas, and then
  // returns the RGBA data for each pixel in the image
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

      const rgbVals = parseToRGB(colourArr); // Parse RGB data and remove alpha values
      const colours = generatePalette(rgbVals, 3);
      const uniqueColours = [
        ...new Map(
          colours.map((colour) => [colour['rgbStr'], colour])
        ).values(),
      ];
      resolve(uniqueColours);
    };
  });
};

export default parseURLtoImg;
