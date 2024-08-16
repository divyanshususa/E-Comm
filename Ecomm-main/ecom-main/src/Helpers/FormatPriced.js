const FormatPriced = ({ priced }) => {
  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(priced);
};

export default FormatPriced;
