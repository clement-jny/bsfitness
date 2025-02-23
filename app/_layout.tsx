import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import CustomLayout from './customLayout';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BackButton } from '@/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '@/contexts';
import { colors } from '@/utils';
// import { StatusBar } from 'expo-status-bar';

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
  const { user, isLoading } = AuthContext.useAuth();

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (user && !inAuthGroup) {
      console.log('oui 1');

      router.replace('/(auth)/');
    } else if (!user && inAuthGroup) {
      console.log('oui 2');

      router.replace('/');
    }
  }, [user, isLoading]);

  // if (isLoading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size='large' color={colors.light.accent} />
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  return <Slot />;

  // return (
  //   <Stack
  //     screenOptions={{
  //       animation: 'fade',
  //       headerShown: false,
  //     }}>
  //     {/* <Stack.Screen name='+not-found' /> */}
  //   </Stack>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // ou toute autre couleur de fond
  },
});
