import {Redirect} from "expo-router";
import {useSelector} from "react-redux";
import {RootState} from "@/src/flux/store";

export default function App() {
    const user = useSelector((state: RootState) => state.user);

    return <Redirect href={user.user_token ? './home' : './login'} />;
}