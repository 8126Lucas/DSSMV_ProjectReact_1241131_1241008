import {useSelector} from "react-redux";
import {RootState} from "@/src/flux/store";
import MaintenanceRoom from "@/components/special_rooms/MaintenanceRoom";
import OfflineRoom from "@/components/special_rooms/OfflineRoom";
import {Stack} from "expo-router";

export default function AppNavigator() {
    const app_state = useSelector((state: RootState) => state.app.app_state);

    if (app_state === 'maintenance') {
        return <MaintenanceRoom />;
    }
    if (app_state === 'offline') {
        return <OfflineRoom />;
    }
    return <Stack screenOptions={{ headerShown: false }} />;
}