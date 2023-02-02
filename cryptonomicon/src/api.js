const API_KEY =
  "9024870eb6f799d75fa5f466cec540960bd288f9ffeb5234e857036ca494f583";

export const loadCoins = async () => {
  const data = await fetch(
    "https://min-api.cryptocompare.com/data/all/coinlist?summary=true"
  );
  return await data.json();
};

export const loadTickers = async tickerName => {
  return await (
    await fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${tickerName}&tsyms=USD&api_key=${API_KEY}`
    )
  ).json();
};
