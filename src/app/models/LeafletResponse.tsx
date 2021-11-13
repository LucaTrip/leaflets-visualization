export interface Retailer {
  id: string;
  name: string;
  distance: number;
  images: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
}

export interface Leaflet {
  id: string;
  name: string;
  retailer: Retailer;
}

export interface LeafletResponse {
  data: {
    query: {
      offset: number;
      limit: number;
    };
    current: number;
    total: number;
    count: number;
    leaflets: Leaflet[];
  };
  error: string | false;
}
