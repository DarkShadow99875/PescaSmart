import { Calendar } from 'react-native-calendars';
import { ScrollView, Text, View } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import FishingForecast from '@/components/FishingForecast';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateStr = selectedDate.toISOString().split('T')[0];

  return (
    <LinearGradient colors={['#0a0f1c', '#1e3a8a']} style={{ flex: 1 }}>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Titolo chiaro e grande */}
        <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 30 }}>
          <Text style={{ fontSize: 36, fontWeight: '900', color: '#fff', textAlign: 'center' }}>
            PESCA SMART
          </Text>
          <Text style={{ fontSize: 19, color: '#bae6fd', marginTop: 8 }}>
            La tua app per pescare meglio
          </Text>
        </View>

        {/* Calendario con spiegazione grande */}
        <View style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: 22,
          padding: 16,
          borderWidth: 1,
          borderColor: 'rgba(103,232,249,0.3)',
          marginBottom: 30,
        }}>
          <Text style={{ 
            fontSize: 24, 
            fontWeight: 'bold', 
            color: '#fff', 
            textAlign: 'center',
            marginBottom: 12 
          }}>
            📅 Scegli il giorno in cui vuoi andare a pescare
          </Text>

          <Calendar
            onDayPress={day => setSelectedDate(new Date(day.timestamp))}
            markedDates={{ [dateStr]: { selected: true, selectedColor: '#67e8f9' } }}
            theme={{
              backgroundColor: 'transparent',
              calendarBackground: 'transparent',
              textSectionTitleColor: '#bae6fd',
              selectedDayBackgroundColor: '#67e8f9',
              selectedDayTextColor: '#0f172a',
              todayTextColor: '#facc15',
              dayTextColor: '#e0f2fe',
              arrowColor: '#67e8f9',
              monthTextColor: '#fff',
            }}
          />
        </View>

        {/* Spiegazione chiara per la posizione */}
        <View style={{
          backgroundColor: 'rgba(255,255,255,0.12)',
          padding: 18,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: '#67e8f9',
          marginBottom: 20,
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 8 }}>
            📍 La tua posizione attuale
          </Text>
          <Text style={{ fontSize: 18, color: '#bae6fd' }}>
            Stai visualizzando le previsioni vicino a dove ti trovi ora.
          </Text>
          <Text style={{ fontSize: 17, color: '#94a3b8', marginTop: 6 }}>
            (Le previsioni si aggiornano automaticamente con la tua posizione)
          </Text>
        </View>

        {/* Previsioni */}
        <FishingForecast date={selectedDate} />

      </ScrollView>
    </LinearGradient>
  );
}