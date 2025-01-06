import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import CustomLayout from './customLayout';
// import { AuthContext } from '@/contexts';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default () => {
  // const { AuthProvider } = AuthContext;

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
    // <AuthProvider>
    //   <RootLayout />
    //   <Toast />
    // </AuthProvider>

    <>
      <RootLayout />
      <Toast />
    </>
  );
};

const RootLayout = () => {
  // const { user, isLoading } = AuthContext.useAuth();

  // const router = useRouter();
  // const segments = useSegments();

  // useEffect(() => {
  //   if (isLoading) return;

  //   const inAuthGroup = segments[0] === '(auth)';

  //   if (user && !inAuthGroup) {
  //     router.replace('/(auth)/search');
  //   } else if (!user && inAuthGroup) {
  //     router.replace('/');
  //   }
  // }, [user, isLoading]);

  // if (isLoading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size='large' color={colors.light.accent} />
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  // return <Slot />;

  return (
    <Stack screenOptions={{ animation: 'fade', headerShown: true }}>
      {/* <Stack.Screen
        name='index'
        options={{ title: 'BS-Fitness', headerShown: false }}
      /> */}
      {/* <Stack.Screen name='+not-found' /> */}
    </Stack>
  );
};
