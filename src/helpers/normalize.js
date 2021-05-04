const defaultOptions = {
  hotColor: "#ff0000",
  hotLimit: 40,
  coldColor: "#0000ff",
  coldLimit: -40,
};

function strToDeg(hexStr) {
  if (hexStr.length !== 7 || hexStr[0] !== "#") return [0, 0, 0];
  const r = hexStr.slice(1, 3);
  const g = hexStr.slice(3, 5);
  const b = hexStr.slice(5, 7);

  return [
    Number.parseInt(r, 16),
    Number.parseInt(g, 16),
    Number.parseInt(b, 16),
  ];
}

function channelMix(channelA, channelB, amount) {
  const a = channelA * amount;
  const b = channelB * (1 - amount);
  return parseInt(a + b);
}

function colorMix(rgbA, rgbB, amount) {
  const r = channelMix(rgbA[0], rgbB[0], amount);
  const g = channelMix(rgbA[1], rgbB[1], amount);
  const b = channelMix(rgbA[2], rgbB[2], amount);
  return (
    "#" +
    [r, g, b]
      .map((num) => num.toString(16))
      .map((str) => (str.length === 2 ? str : "0" + str))
      .join("")
  );
}

function amount(hotLimit, coldLimit, temp) {
  if (temp >= hotLimit) return 1;
  if (temp <= coldLimit) return 0;
  return (temp - coldLimit) / (hotLimit - coldLimit);
}

export const normalize = (arr, options) => {
  const { hotColor, hotLimit, coldColor, coldLimit } = {
    ...defaultOptions,
    ...options,
  };
  let min = Math.min(...arr);
  let max = Math.max(...arr);
  return arr.map((temp) => ({
    value: temp,
    normalize: (temp - min) / (max - min),
    text: `${temp > 0 ? "+" : ""}${Math.round(temp)}`,
    color: colorMix(
      strToDeg(hotColor),
      strToDeg(coldColor),
      amount(hotLimit, coldLimit, temp)
    ),
  }));
};
