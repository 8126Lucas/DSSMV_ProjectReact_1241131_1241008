import { Text, View } from "react-native";
import CountdownClock from "@/components/CountdownClock";

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
    </View>
  );
}
