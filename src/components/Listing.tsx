import React from "react";
import "./Listing.css";
import type { ValidEtsyListing } from "../types";

interface ListingProps {
  items: ValidEtsyListing[];
}

const Listing: React.FC<ListingProps> = ({ items }) => {
  const truncateTitle = (title: string): string =>
    title.length > 50 ? `${title.slice(0, 50)}…` : title;

  const formatPrice = (price: string, currency_code: string): string => {
    const num = parseFloat(price);
    if (isNaN(num)) return price;
    const formatted = num.toFixed(2);

    switch (currency_code) {
      case "USD":
        return `$${formatted}`;
      case "EUR":
        return `€${formatted}`;
      case "GBP":
        return `£${formatted}`;
      default:
        return `${currency_code} ${formatted}`;
    }
  };

  const getStockClass = (qty: number): string => {
    if (qty <= 10) return "stock-low";
    if (qty <= 20) return "stock-medium";
    return "stock-high";
  };

  return (
    <div className="product-grid">
      {items.map((item) => {
        const title = truncateTitle(item.title);
        const priceDisplay = formatPrice(item.price, item.currency_code);
        const stockClass = getStockClass(item.quantity);
        const imageUrl = item.MainImage.url_570xN.trim();

        return (
          <div key={item.listing_id} className="product-card">
            {item.is_digital && <span className="digital-badge">Digital</span>}
            <img
              src={imageUrl}
              alt={title}
              className="product-image"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="product-info">
              <h3 className="product-title">{title}</h3>
              <div className="price-container">
                <div className="product-price">{priceDisplay}</div>
                <span className={`stock-badge ${stockClass}`}>
                  {item.quantity} left
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Listing;
