import { View, Text, FlatList, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { initDB, getCatches, addCatch } from '@/lib/db';
import * as Location from 'expo-location';
import { CatchLog } from '@/types';

export default function LogScreen() {
  const [catches, setCatches] = useState<CatchLog[]>([]);
  useEffect(() => { initDB(); setCatches(getCatches()); }, []);

  const handleAdd = async () => {
    const location = await Location.getCurrentPositionAsync();
    addCatch({
      date: new Date().toISOString(),
      species: 'Trota', // da form
      weight: 1.5, // da form
      location: { lat: location.coords.latitude, lng: location.coords.longitude },
      photo: 'path/to/photo' // da expo-image-picker
    });
    setCatches(getCatches());
  };

  return (
    <View className="flex-1 p-4">
      <Button title="Aggiungi cattura" onPress={handleAdd} />
      <FlatList data={catches} renderItem={({ item }) => <Text>{item.species} - {item.weight}kg</Text>} />
    </View>
  );
}