import {Item} from "react-native-picker-select";

export interface InlineDropdownProps {
    title: string;
    options: Item[];
    updateValue: (value: string | null) => void;
}