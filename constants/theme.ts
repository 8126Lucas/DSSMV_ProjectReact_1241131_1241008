import {Platform} from "react-native";

export const Colors = {
    default: {
        correct: "#4F8A3F",
        incorrect: "#D10700",
        gold: '#FFD700',
        primaryAction1: "#56C7DB",
        primaryAction2: "#DC402D",
        primaryAction3: "#DBD653",
        primaryAction4: "#7055DB",
        player1Color: "#A766D9",
        player2Color: "#FF9900",
    },
    light: {
        backgroundColor: "#FFFFFF",
        surface: '#EEEEEE',
        text: '#000000',
        secondaryText: '#333333',
        border: '#666666',
    },
    dark: {
        backgroundColor: "#1E1A1B",
        surface: '#1A1A1A',
        text: "#FFFFFF",
        secondaryText: '#BBBBBB',
        border: '#333333',
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