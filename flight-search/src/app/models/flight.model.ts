export interface Flight {
  id: string;
  instantTicketingRequired: boolean;
  itineraries: Itinerary[];
  price: { total: string; currency: string };
}

export interface Itinerary {
  duration: string;
  segments: Segment[];
}

export interface Segment {
  aircraft: Aircraft;
  arrival: Airport;
  blacklistedInEU: boolean;
  carrierCode: string;
  departure: Airport;
  duration: string;
  id: string;
  number: string;
  numberOfStops: number;
  operating: Operating;
}

export interface Aircraft {
  code: string;
}

export interface Airport {
  iataCode: string;
  at: string;
}

export interface Operating {
  carrierCode: string;
}
