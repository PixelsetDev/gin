import {Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {useEffect, useState} from "react";
import env from "@/env";
import './../global.css';
import {Link} from "expo-router";

export default function App() {
    const [Authenticated, setAuthenticated] = useState(false);
    const [Players, setPlayers] = useState<string[]>([]);
    const [CurrentPlayerInput, setPlayerInput] = useState<string>("");
    const [Mode, setMode] = useState(0);

    function startGame() {
        if (Players.length !== 2) {
            alert("You must have at least 2 players to start.")
        }
    }

    function addPlayer(player: string) {
        if (player.trim() === "") {
            alert("Please enter a player!");
        } else {
            setPlayers(prevPlayers => [...prevPlayers, player.trim()]);
            setPlayerInput("");
        }
    }

    useEffect(() => {

        fetch(`https://${env.API_BASE}/account`, {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => { return response.json(); })
            .then((json) => {
                console.log(json);
                if (json.code === 200) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }
            });
    }, []);
    return <ScrollView className={`grid gap-std`}>
        <View className={`header`}>
            <Text className={`txt-4xl text-white text-center txt-bold`}>Drinko!³</Text>
        </View>
        <View className="padding text-center grid gap-std">
            <View className={`alert-red`}>
                <Text className="alert-text-red">
                    Do not refresh the page or use the browser&#39;s back button whilst playing, as this may disconnect
                    you from the game and delete your progress.
                </Text>
            </View>
            <View className={`grid-2 gap-std`}>
                <View className={`card padding-sm`}>
                    {Authenticated?(
                        <View>
                            {Mode === 0?(
                                <View className={`grid-2 gap-std`}>
                                    <Text className={`txt-xl text-center txt-bold span-2`}>How would you like to play?</Text>
                                    <Pressable className={`btn btn-neutral txt-base text-center grid`} onPress={() => setMode(1)}>
                                        <Text className={`text-center txt-xl dark:text-white`}>Big Screen</Text>
                                        <Text className={`text-center txt-sm dark:text-white`}>Everyone plays using a single device.</Text>
                                    </Pressable>
                                    <Pressable className={`btn btn-neutral txt-base text-center grid`} onPress={() => setMode(2)}>
                                        <Text className={`text-center txt-xl dark:text-white`}>Multi-Device</Text>
                                        <Text className={`text-center txt-sm dark:text-white`}>Everyone plays on their own devices.</Text>
                                    </Pressable>
                                </View>
                            ):Mode === 1?(
                                <View className={`grid gap-std`}>
                                    <Text className={`txt-xl text-center txt-bold`}>Big Screen Mode</Text>
                                    <Text className="text-center txt-base">
                                        {Players.length > 0 ? Players.join(", ") : "Who's playing?"}
                                    </Text>
                                    <TextInput
                                        className={`input txt-base`}
                                        onChangeText={newText => setPlayerInput(newText)}
                                    />
                                    <Pressable className={`btn btn-neutral txt-base text-center grid`} onPress={() => addPlayer(CurrentPlayerInput)}>
                                        <Text className={`text-center txt-base`}>Add player</Text>
                                    </Pressable>
                                    <Pressable className={`btn btn-green txt-base text-center grid`} onPress={() => alert('ERROR 501: NOT IMPLEMENTED')}>
                                        <Text className={`text-center txt-base`}>Start game</Text>
                                    </Pressable>
                                </View>
                            ):(
                                <View className={`grid gap-std`}>
                                    <Text className={`txt-xl text-center txt-bold`}>Multi-Device Mode</Text>
                                    <Text>ERROR 501: NOT IMPLEMENTED</Text>
                                </View>
                            )}
                        </View>
                    ):(
                        <View className={`grid gap-std`}>
                            <Text className={`txt-base`}>
                                Drinko!³ now requires a Portal account. To play, please login or create a new account.
                            </Text>
                            <Link className={`btn btn-neutral txt-base text-center`} href={`https://${env.API_BASE}/logto/sign-in`}>
                                Login with Portal
                            </Link>
                            <Text className={`text-center italic txt-base`}>or</Text>
                            <Link className={`btn btn-neutral txt-base text-center`} href={`https://portalsso.com/join/?flow=https://letsdrinko.com`}>
                                Create an Account
                            </Link>
                        </View>
                    )}
                </View>
                <View className={`card padding-sm grid gap-std`}>
                    <View>
                        <Text className="txt-base txt-bold">
                            Disclaimer
                        </Text>
                        <Text className="txt-base">
                            This game is dirty and contains adult themes, don&#39;t play it with your parents. You must be
                            18+ to play. This game will get you drunk. Always drink responsibly. When the fun stops, stop.
                        </Text>
                    </View>
                    <View>
                        <Text className="txt-base txt-bold">
                            UK &amp; EU players
                        </Text>
                        <Text className="txt-base">
                            We&apos;re sorry, new online safety legislation means that we can&apos;t give players in
                            these regions access to the new multi-screen mode. You can still play using big screen mode
                            as normal.
                        </Text>
                    </View>
                </View>
            </View>
            <Text className="absolute bottom-0 left-0 right-0 text-center">Running V3.0.0-BETA</Text>
        </View>
    </ScrollView>;
}