import { CatchLog } from '@/types';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('pesca.db');

export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS catches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      species TEXT,
      weight REAL,
      lat REAL,
      lng REAL,
      photo TEXT
    );
  `);
};

export const addCatch = (catchData: Omit<CatchLog, 'id'>) => {
  db.runSync('INSERT INTO catches (date, species, weight, lat, lng, photo) VALUES (?, ?, ?, ?, ?, ?)', [
    catchData.date, catchData.species, catchData.weight, catchData.location.lat, catchData.location.lng, catchData.photo ?? null
  ]);
};

export const getCatches = (): CatchLog[] => {
  return db.getAllSync('SELECT * FROM catches ORDER BY date DESC');
};