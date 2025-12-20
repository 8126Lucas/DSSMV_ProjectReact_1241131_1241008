import {ColorValue} from "react-native";

export interface AppButtonProps {
    title: string;
    color: ColorValue;
    onPress?: () => void;
}