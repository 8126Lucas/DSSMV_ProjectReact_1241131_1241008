import {Item} from "react-native-picker-select";

export interface InlineDropdownProps {
    title: string;
    mandatory: boolean;
    options: Item[];
    updateValue: (value: string | null) => void;
}