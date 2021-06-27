// Convert the amount of money that receive from the API

export const formatPrice = (number) => {
  const numberFormat = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format((number * 20000) / 100);
  return numberFormat;
};

export const getUniqueValues = (arr, key) => {
  let keyFeature = arr.map((item) => item[key]);
  if (key === "colors") {
    keyFeature = keyFeature.flat();
  }
  return ["all", ...new Set(keyFeature)];
};
