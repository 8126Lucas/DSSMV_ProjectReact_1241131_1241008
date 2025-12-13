import { Tabs } from "expo-router";
import Navbar from "@/components/Navbar";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{ headerShown: false }}
            tabBar={() => <Navbar />}>
            <Tabs.Screen name="home" />
            <Tabs.Screen name="leaderboard" />
            <Tabs.Screen name="settings" />
        </Tabs>
    );
}