import React from "react";
import Listing from "./components/Listing";
import data from "./data/etsy.json";
import type { EtsyListing, ValidEtsyListing } from "./types";

const rawData = data as EtsyListing[];

const validItems: ValidEtsyListing[] = rawData.filter(
  (item): item is ValidEtsyListing =>
    item.state === "active" &&
    !!item.MainImage?.url_570xN &&
    typeof item.listing_id === "number" &&
    typeof item.title === "string"
);

const App: React.FC = () => (
  <div className="container">
    <h1>Список предложений</h1>
    <Listing items={validItems} />
  </div>
);

export default App;
