import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // ← aggiunto per react-query

import { useColorScheme } from '@/hooks/use-color-scheme';

// Creo il QueryClient qui (puoi spostarlo in un file separato dopo se vuoi)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,                      // ritenta 2 volte se fallisce la chiamata
      staleTime: 1000 * 60 * 5,      // 5 minuti prima di considerare i dati "stale"
      gcTime: 1000 * 60 * 30,        // tiene in cache 30 minuti dopo ultimo uso
    },
  },
});

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}