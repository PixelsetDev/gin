import {ScrollView, Text, View} from "react-native";
import {useEffect, useState} from "react";
import env from "@/env";
import './../global.css';
import {Link} from "expo-router";

export default function App() {
    const [Authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        fetch(`https://${env.API_BASE}/account`)
            .then((response) => { return response.json(); })
            .then((json) => {
                if (json.code === 200) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }
            });
    }, []);
    return <ScrollView className={`grid gap-std`}>
        <View className={`header`}>
            <Text className={`txt-6xl text-white text-center`}>Drinko!³</Text>
        </View>
        <View className="padding text-center grid gap-std">
            <View className={`alert-red`}>
                <Text className="alert-text-red">
                    Do not refresh the page or use the browser&#39;s back button whilst playing, as this may disconnect
                    you from the game and delete your progress.
                </Text>
            </View>
            <View className={`grid-2 gap-std`}>
                <View className={`bg-neutral-100 padding-sm`}>
                    {Authenticated?(
                        <Text>Let&#39;s play!</Text>
                    ):(
                        <View className={`grid gap-std`}>
                            <Text className={`txt-base`}>
                                Drinko!³ now requires a Portal account. To play, please login or create a new account.
                            </Text>
                            <Link className={`btn btn-neutral txt-base text-center`} href={`https://${env.API_BASE}/logto/sign-in`}>
                                Login with Portal
                            </Link>
                            <Text className={`text-center italic`}>or</Text>
                            <Link className={`btn btn-neutral txt-base text-center`} href={`https://portalsso.com/join/?flow=https://letsdrinko.com`}>
                                Create an Account
                            </Link>
                        </View>
                    )}
                </View>
                <View className={`bg-neutral-100 padding-sm`}>
                    <Text className="txt-base mb-1 font-bold">
                        Disclaimer
                    </Text>
                    <Text className="txt-base mb-1">
                        This game is dirty and contains adult themes, don&#39;t play it with your parents.
                    </Text>
                    <Text className="txt-base mb-1">
                        You must be 18+ to play.
                    </Text>
                    <Text className="txt-base mb-6">
                        This game will get you drunk. Always drink responsibly. When the fun stops, stop.
                    </Text>
                    <Text className="txt-base mb-6">
                        UK &amp; EU users are unable to access multiplayer mode due to the Online Safety Act. Big screen
                        mode remains available to all players.
                    </Text>
                </View>
            </View>
            <Text className="absolute bottom-0 left-0 right-0 text-center">Running V3.0.0-BETA</Text>
        </View>
    </ScrollView>;
}