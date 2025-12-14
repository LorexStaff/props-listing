export interface MainImage {
  url_570xN: string;
}

export interface EtsyListing {
  listing_id: number;
  state: string;
  title: string;
  price: string;
  currency_code: string;
  quantity: number;
  is_digital: boolean;
  MainImage?: MainImage | null;
}

export interface ValidEtsyListing extends Omit<EtsyListing, "MainImage"> {
  MainImage: { url_570xN: string };
}
