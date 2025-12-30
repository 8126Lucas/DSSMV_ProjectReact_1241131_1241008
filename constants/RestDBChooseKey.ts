import {Platform} from "react-native";

export const RESTDB_API_KEY = Platform.OS === 'web' ? process.env.EXPO_PUBLIC_RESTDB_API_WEB : process.env.EXPO_PUBLIC_RESTDB_API_MOBILE;