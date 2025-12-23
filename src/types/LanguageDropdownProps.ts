import {Item} from "react-native-picker-select";

export interface LanguageDropdownProps {
    title: string;
    options: Item[];
    updateValue: (value: string | null) => void;
    currentValue?: string | null;
}