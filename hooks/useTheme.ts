import {useSelector} from "react-redux";
import {RootState} from "@/src/flux/store";
import {Colors} from "@/constants/theme";

export const useTheme = () => {
    const theme = useSelector((state: RootState) => state.theme);
    const colors = Colors[theme.theme];

    return {colors};
}

