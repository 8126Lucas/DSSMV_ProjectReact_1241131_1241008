import {ColorValue} from "react-native";
import React from "react";

export interface AppButtonProps {
    title: string;
    color: ColorValue;
    onPress?: () => void;
    icon?: React.ReactNode;
}