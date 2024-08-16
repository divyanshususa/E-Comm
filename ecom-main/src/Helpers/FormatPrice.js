const FormatPrice = ({ price, type }) => {

  const exchangeRates = {
    USD: 1,  // 1 USD = 1 USD (base currency)
    EUR: 0.84, // Example: 1 USD = 0.84 EUR
    INR: 73.67 // Example: 1 USD = 73.67 INR
    // Add more currencies and their exchange rates as needed
  };

  // If the currency types are the same, no conversion needed
  // if (fromCurrency === toCurrency) {
  //   return price;
  // }

  // Convert price from the 'fromCurrency' to the 'toCurrency'
  const convertedPrice = price * (exchangeRates[type] / exchangeRates["INR"]);

  // Round to 2 decimal places
  // return parseFloat(convertedPrice.toFixed(2));

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: type,
    maximumFractionDigits: 2,
  });

  return type === "INR" ? formatter.format(price) : formatter.format(convertedPrice)
};



export default FormatPrice;
