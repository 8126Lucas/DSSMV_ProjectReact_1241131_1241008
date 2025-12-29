import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Redirect, router} from "expo-router";
import {ActivityIndicator, View} from "react-native";
import {REST_DB_ENDPOINT_USER} from "@/constants/RestDBEndpoints";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "@/src/flux/store/userSlice";
import {setTheme} from "@/src/flux/store/themeSlice";
import i18n from "i18next";
import {RootState} from "@/src/flux/store/store";

export default function App() {
    const user = useSelector((state: RootState) => state.user);

    return <Redirect href={user.user_token ? './home' : './login'} />;
}