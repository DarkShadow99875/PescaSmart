import axios from 'axios';

// Tipi per solunar
export interface SolunarResponse {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  major_times: string[];
  minor_times: string[];
  day_rating?: number;
}

// getTides: NOAA non buono per Italia → switch a Open-Meteo marine API (free, no key, wave height/tides approx)
export const getTides = async (lat: number, lng: number, date: string) => {
  const formattedDate = date.replace(/-/g, ''); // yyyymmdd
  try {
    // Open-Meteo marine: wave height, period, direction (non tide height precisa ma buono per pesca)
    const res = await axios.get(
      `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&hourly=wave_height,wave_direction,wave_period&timezone=Europe%2FRome&start_date=${date}&end_date=${date}`
    );
    return res.data.hourly; // { time: [...], wave_height: [...], ... }
  } catch (error: any) {
    console.error('Errore Open-Meteo marine:', error?.response?.status || error);
    return null;
  }
};

// getMoonPhase: USNO – fix date format MM/DD/YYYY
export const getMoonPhase = async (date: string) => {
  const [year, month, day] = date.split('-');
  const usnoDate = `${month}/${day}/${year}`; // MM/DD/YYYY
  try {
    const res = await axios.get(`https://aa.usno.navy.mil/api/moon/phases/date?date=${usnoDate}&nump=1`);
    console.log('USNO raw:', res.data); // logga per debug
    return res.data.phasedata[0]?.phasename || 'Unknown'; // phasename es. "Waxing Crescent"
  } catch (error) {
    console.error('Errore USNO moon:', error);
    return 'Unknown';
  }
};
// getSolunar: solunar.org – fix tz integer (1 o 2 per Italia), date yyyymmdd
// ==================== getSolunar AGGIORNATA ====================
export const getSolunar = async (lat: number, lng: number, date: string) => {
  const formattedDate = date.replace(/-/g, ''); // 20260221
  const tz = '1'; // Italia CET (prova '2' se sei in ora legale)

  const url = `https://api.solunar.org/solunar/${lat},${lng},${formattedDate},${tz}`;
  console.log('Fetching solunar:', url);

  try {
    const res = await axios.get(url);
    console.log('Solunar data:', res.data);   // tieni questo per debug

    // Ritorniamo tutto il JSON così com'è (è la soluzione più pulita)
    return res.data;

  } catch (error:any) {
    console.error('Errore Solunar API:', error?.response?.status || error);
    return null;
  }
};
// getWeather: Open-Meteo (free, no key, perfetto)
// getWeather con Open-Meteo – zero key!
export const getWeather = async (lat: number, lng: number, date: string) => {
  try {
    const res = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
      `&current=relative_humidity_2m,wind_speed_10m` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,sunrise,sunset` +   // ← AGGIUNTO QUI
      `&timezone=Europe%2FRome&start_date=${date}&end_date=${date}`
    );
    console.log('Open-Meteo data per', date, ':', res.data); // per debug
    return res.data;
  } catch (error) {
    console.error('Errore Open-Meteo:', error);
    return null;
  }
};