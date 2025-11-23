import {Platform} from "react-native";

export const Colors = {
    default: {
        green: "#4F8A3F",
        webstormBlue: "#007EFF",
        red: "#D10700",
        gold: '#FFD700'
    },
    light: {
        backgroundColor: '#DDDDDD',
        text: '#000000'
    },
    dark: {
        backgroundColor: '#111111',
        text: "#FFFFFF",
    },
};

export const FontFamily = {
    heading: 'Poppins_700Bold',
    headingMedium: 'Poppins_600SemiBold',
    body: 'Inter_400Regular',
    bodyBold: 'Inter_600SemiBold',
    mono: 'RobotoMono_500Medium',
    monoBold: 'RobotoMono_700Bold',
};

export const FontSize = {
    small: 12,
    regular: 16,
    medium: 18,
    large: 24,
    xlarge: 32,
};

export const Fonts = Platform.select({
    ios: {
        sans: 'system-ui',
        serif: 'ui-serif',
        rounded: 'ui-rounded',
        mono: 'ui-monospace',
    },
    default: {
        sans: 'normal',
        serif: 'serif',
        rounded: 'normal',
        mono: 'monospace',
    },
    web: {
        sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        serif: "Georgia, 'Times New Roman', serif",
        rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
        mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
});