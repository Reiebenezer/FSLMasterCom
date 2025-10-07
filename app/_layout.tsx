import LoadingProvider from "@/components/LoadingProvider";
import LoadingScreen from "@/components/LoadingScreen";
import { levelLimit } from '@/fsl-config.json';
import { Poppins_400Regular, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { router, Stack, usePathname } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { Storage } from "expo-sqlite/kv-store";
import { useEffect, useMemo } from "react";
import { BackHandler, Image, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import './globals.css';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const pathname = usePathname();

  if (!Storage.getItemSync('userlevels'))
    Storage.setItemSync('userlevels', JSON.stringify(new Array(levelLimit).fill(null).map((_, i) => ({ level: i + 1, completed: false }))))

  const [loadedFonts, errorLoadingFonts] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    GlacialIndifference: require("@/assets/fonts/glacial-indifference.regular.otf")
  });

  const bgbottomLeft = useMemo(() => require('@/assets/images/bg-bottomleft.png'), []);
  const bgtopRight = useMemo(() => require('@/assets/images/bg-topright.png'), []);

  useEffect(() => {
    if (loadedFonts || errorLoadingFonts)
      SplashScreen.hideAsync();

  }, [loadedFonts, errorLoadingFonts]);

  useEffect(() => {
    const backAction = () => {

      switch (pathname) {
        case '/levels':
          router.navigate('/');
          break;

        case '/[level]':
          router.navigate('/levels');
          break;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  if (!loadedFonts && !errorLoadingFonts)
    return null;

  return (
    <View className="relative flex-1">
      <View className="absolute inset-0 justify-between">
        <Image source={bgtopRight} className="w-full h-1/2" resizeMode="cover" />
        <Image source={bgbottomLeft} className="w-full h-1/2" resizeMode="cover" />

      </View>
      <SafeAreaProvider>
        <LoadingProvider>
          <Stack screenOptions={{ contentStyle: { backgroundColor: 'transparent' } }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <LoadingScreen />
        </LoadingProvider>
      </SafeAreaProvider>
    </View>
  )
}
