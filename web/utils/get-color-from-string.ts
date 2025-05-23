const pastelColors = [
  "#ffb3ba",
  "#ffdfba",
  "#ffffba",
  "#baffc9",
  "#bae1ff",
  "#d7baff",
  "#ffbaed",
  "#baffd9",
  "#ffd6ba",
  "#c9baff"
];

export const getColorFromString = (str: string) => {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % pastelColors.length;

  return pastelColors[index];
};
