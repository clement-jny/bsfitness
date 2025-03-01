import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { Slot, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { AuthContext } from '@/contexts';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default () => {
  const [loaded, error] = useFonts({
    Poppins400: Poppins_400Regular,
    Poppins500: Poppins_500Medium,
    Poppins700: Poppins_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthContext.AuthProvider>
      <RootLayout />
      <Toast />
    </AuthContext.AuthProvider>
  );
};

const RootLayout = () => {
  const { isAuthenticated } = AuthContext.useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === undefined) return;

    if (isAuthenticated) {
      router.replace('/(app)/account');
    } else {
      router.replace('/');
    }
  }, [isAuthenticated]);

  // return <Slot />;

  return (
    <Stack
      screenOptions={{
        animation: 'fade',
        headerShown: false,
      }}>
      <Stack.Screen name='login' />
      <Stack.Screen name='register' />
      {/* <Stack.Screen name='+not-found' /> */}
    </Stack>
  );
};
