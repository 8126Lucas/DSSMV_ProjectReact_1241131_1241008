import {Platform} from "react-native";

export const Colors = {
    default: {
        correct: "#4F8A3F",
        correct2: "#65a30d",
        incorrect: "#D10700",
        incorrect2: "#b91c1c",
        gold: '#FFD700',
        gold2: "#eab308",

        primaryAction1: "#8C69FA",
        primaryAction2: "#EB69FA",
        primaryAction3: "#FA69BF",
        primaryAction4: "#F3BCFA",
        primaryAction5: "#FAA869",
        primaryAction6: "#FAD169",
        primaryAction7: "#FAE369",
        primaryAction8: "#FAE9BC",
        player1Color: "#A766D9",
        player2Color: "#FF9900",
    },
    light: {
        backgroundColor: "#F9EDEA",
        surface: '#EEEEEE',
        text: '#000000',
        secondaryText: '#333333',
        border: '#666666',
        primaryAction1: "#DA6827",
        primaryAction2: "#D16718",
        primaryAction3: "#EDA04E80",
        correct: "#65a30d",
        incorrect: "#D10700",
        gold: '#FFD700',
        semi_transparent: '#00000050',
    },
    dark: {
        backgroundColor: "#413B47",
        surface: '#1A1A1A',
        text: "#FFFFFF",
        secondaryText: '#BBBBBB',
        border: '#333333',
        primaryAction1: "#7926A3",
        primaryAction2: "#9E7BDC",
        primaryAction3: "#CA7CDB",
        correct: "#4F8A3F",
        incorrect: "#b91c1c",
        gold: "#eab308",
        semi_transparent: '#FFFFFF50',
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