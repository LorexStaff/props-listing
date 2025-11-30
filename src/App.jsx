import React, { useState, useEffect } from "react";
import Listing from "./components/Listing";

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/data/etsy.json")
      .then((res) => res.json())
      .then((data) => {
        const validItems = data.filter(
          (item) =>
            item.state === "active" &&
            item.MainImage &&
            item.MainImage.url_570xN &&
            typeof item.listing_id === "number" &&
            typeof item.title === "string"
        );
        setItems(validItems);
      })
      .catch((err) => console.error("Load error:", err));
  }, []);

  return (
    <div className="container">
      <h1>Список предложений</h1>
      <Listing items={items} />
    </div>
  );
};

export default App;
