import { useFonts as useExpoFonts } from 'expo-font';
import {
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import {
    Inter_400Regular,
    Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import {
    RobotoMono_500Medium,
    RobotoMono_700Bold,
} from '@expo-google-fonts/roboto-mono';

export function useFonts() {
    const [fontsLoaded] = useExpoFonts({
        Poppins_600SemiBold,
        Poppins_700Bold,
        Inter_400Regular,
        Inter_600SemiBold,
        RobotoMono_500Medium,
        RobotoMono_700Bold,
    });

    return fontsLoaded;
}