import { useEffect, useState } from "react";

import "./App.css";
import CoinInfo from "./components/CoinInfo";

function App() {
  const [list, setList] = useState(null);
  const API_KEY =
    "867f653f9b3e5af1b9fcb5ef1709a22f15015c8d1bd0485b23610408b86fc0cb";

  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/all/coinlist?&api_key=" +
          API_KEY
      );
      const json = await response.json();
      setList(json);
    };

    fetchAllCoinData().catch(console.error);
  }, []);

  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <ul>
        {list &&
          Object.entries(list.Data).map(([coin]) =>
            list.Data[coin].PlatformType === "blockchain" ? (
              // <li key={list.Data[coin].FullName}>{list.Data[coin].FullName}</li>
              <CoinInfo key={list.Data[coin].FullName}
                image={list.Data[coin].ImageUrl}
                name={list.Data[coin].FullName}
                symbol={list.Data[coin].Symbol}
              />
            ) : null
          )}
      </ul>
    </div>
  );
}

export default App;
