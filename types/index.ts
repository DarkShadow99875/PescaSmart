export type CatchLog = {
  id: number;
  date: string;
  species: string;
  weight: number;
  location: { lat: number; lng: number };
  photo?: string;
};

export type FishingForecast = {
  tides: { time: string; height: number; type: 'high' | 'low' }[];
  moonPhase: string;
  solunar: { major: string[]; minor: string[] };
  weather: { wind: number; waves: number; temp: number };
};