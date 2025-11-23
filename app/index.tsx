import { Text, View } from "react-native";
import CountdownClock from "@/components/CountdownClock";
import AppButton from "@/components/AppButton";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CountdownClock/>
      <AppButton title="Join" />
      <AppButton title="Create" />
    </View>
  );
}
