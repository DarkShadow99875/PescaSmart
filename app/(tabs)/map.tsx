import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { getCatches } from '@/lib/db';
import { CatchLog } from '@/types';

export default function MapScreen() {
  const [region, setRegion] = useState({ latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
  const [spots, setSpots] = useState<CatchLog[]>([]);

  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
      const loc = await Location.getCurrentPositionAsync();
      setRegion({ ...region, latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      setSpots(getCatches());
    })();
  }, []);

  return (
    <View className="flex-1">
      <MapView className="flex-1" region={region}>
        {spots.map(spot => (
          <Marker key={spot.id} coordinate={{ latitude: spot.location?.lat, longitude: spot.location?.lng }} title={spot.species} />
        ))}
      </MapView>
    </View>
  );
}