const API_KEY =
  "9024870eb6f799d75fa5f466cec540960bd288f9ffeb5234e857036ca494f583";

const tickersHandlers = new Map();

export const loadCoins = async () => {
  const data = await fetch(
    "https://min-api.cryptocompare.com/data/all/coinlist?summary=true"
  );
  return await data.json();
};

export const loadTickers = async () => {
  if (tickersHandlers.size === 0) {
    return;
  }

  const data = await (
    await fetch(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[
        ...tickersHandlers.keys(),
      ].join(",")}&tsyms=USD&api_key=${API_KEY}`
    )
  ).json();

  const updatedPrices = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value.USD])
  );

  Object.entries(updatedPrices).forEach(([currency, newPrice]) => {
    const handlers = tickersHandlers.get(currency) ?? [];
    handlers.forEach(fn => fn(newPrice));
  });
};

export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, cb]);
};

export const unsubscribeFromTicker = ticker => {
  tickersHandlers.delete(ticker);
};

setInterval(loadTickers, 5000);

window.tickers = tickersHandlers;
