import { ScrollView, View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';
import { getTides, getSolunar, getWeather } from '@/lib/api';

export default function FishingForecast({ date }: { date: Date }) {
  const dateStr = date.toISOString().split('T')[0];

  const { data: loc } = useQuery({
    queryKey: ['location'],
    queryFn: () => Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High }),
  });

  const lat = loc?.coords.latitude ?? 45.4642;
  const lng = loc?.coords.longitude ?? 9.1900;

  const { data: tidesData } = useQuery({
    queryKey: ['tides', dateStr, lat, lng],
    queryFn: () => getTides(lat, lng, dateStr),
    enabled: !!lat && !!lng,
  });

  const { data: solunarData } = useQuery({
    queryKey: ['solunar', dateStr, lat, lng],
    queryFn: () => getSolunar(lat, lng, dateStr),
    enabled: !!lat && !!lng,
  });

  // METEO - USIAMO I DATI DAILY PER LA DATA SELEZIONATA
  const { data: weather } = useQuery({
    queryKey: ['weather', dateStr, lat, lng],
    queryFn: () => getWeather(lat, lng, dateStr),
    enabled: !!lat && !!lng,
  });

  const windSpeed = weather?.daily?.wind_speed_10m_max?.[0] ?? 0;
  const precip = weather?.daily?.precipitation_sum?.[0] ?? 0;
  const tempMax = weather?.daily?.temperature_2m_max?.[0] ?? '?';
  const tempMin = weather?.daily?.temperature_2m_min?.[0] ?? '?';

  const hasMajor = !!(solunarData?.major1Start || solunarData?.major2Start);
  const isGoodDay = windSpeed < 15 && precip < 1 && hasMajor;

  const waveInfo = tidesData
    ? `Onde: ${tidesData.wave_height?.[0] ?? '?'}m • ${tidesData.wave_direction?.[0] ?? '?'}° • ${tidesData.wave_period?.[0] ?? '?'}s`
    : 'Nessun dato onde';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#0f172a', '#1e3a8a']} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 140, gap: 18 }}>
          <Text style={styles.title}>PREVISIONI PER {dateStr}</Text>

          {/* SOLUNARI */}
          <View style={styles.module}>
            <Text style={styles.moduleTitle}>🌙 ORARI SOLUNARI</Text>
            {solunarData && (
              <>
                <Text style={styles.label}>Maggiori probabilità</Text>
                <Text style={styles.time}>{solunarData.major1Start} - {solunarData.major1Stop}</Text>
                <Text style={styles.time}>{solunarData.major2Start} - {solunarData.major2Stop}</Text>

                <Text style={[styles.label, { marginTop: 16 }]}>Minori probabilità</Text>
                <Text style={styles.time}>{solunarData.minor1Start} - {solunarData.minor1Stop}</Text>
                <Text style={styles.time}>{solunarData.minor2Start} - {solunarData.minor2Stop}</Text>
              </>
            )}
          </View>

          {/* METEO - ORA USA I DATI DEL GIORNO SELEZIONATO */}
          <View style={styles.module}>
            <Text style={styles.moduleTitle}>☀️ METEO</Text>
            {weather ? (
              <>
                <Text style={styles.temp}>Max {tempMax}°C • Min {tempMin}°C</Text>
                <Text style={styles.info}>Vento max: {windSpeed} km/h</Text>
                <Text style={styles.info}>Pioggia: {precip} mm</Text>
              </>
            ) : (
              <Text style={styles.noData}>Caricamento meteo...</Text>
            )}
          </View>

          {/* ONDE */}
          <View style={styles.module}>
            <Text style={styles.moduleTitle}>🌊 MARE</Text>
            <Text style={styles.wave}>{waveInfo}</Text>
          </View>

          {/* RATING */}
          <View style={[styles.ratingModule, { backgroundColor: isGoodDay ? '#166534' : '#991b1b' }]}>
            <Text style={styles.ratingTitle}>
              {isGoodDay ? 'GIORNATA ECCELLENTE' : 'GIORNATA NON IDEALE'}
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '900', color: '#fff', textAlign: 'center', marginBottom: 10 },
  module: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(103,232,249,0.3)',
  },
  moduleTitle: { fontSize: 21, fontWeight: 'bold', color: '#67e8f9', marginBottom: 12 },
  label: { fontSize: 18, color: '#bae6fd', fontWeight: '600' },
  time: { fontSize: 24, fontWeight: '700', color: '#e0f2fe' },
  temp: { fontSize: 32, fontWeight: '900', color: '#fff', textAlign: 'center' },
  info: { fontSize: 21, color: '#e0f2fe', textAlign: 'center', marginTop: 8 },
  wave: { fontSize: 21, color: '#fff', textAlign: 'center' },
  ratingModule: { padding: 28, borderRadius: 22, alignItems: 'center' },
  ratingTitle: { fontSize: 26, fontWeight: '900', color: '#fff', textAlign: 'center' },
  noData: { fontSize: 18, color: '#94a3b8', textAlign: 'center', padding: 30 },
});