import { Disclaimer } from "@/components/Disclaimer";
import {View} from "react-native";
import "./../assets/css/styles.css";
import {useEffect} from "react";
import SocketIOClient from "socket.io-client";

export default function App() {
    useEffect(() => {
        const socket = SocketIOClient("wss://d3-pre-api.pixelset.dev/", {});
        socket.on("connect", () => {
            console.log("connected");
            socket.emit("hello", "world");
        });

        socket.on("connect_error", (err) => {
            console.log(err.message);
        });
    }, []);

    return <View>
        <View nativeID={`screen`}>
            <Disclaimer/>
        </View>
    </View>;
}