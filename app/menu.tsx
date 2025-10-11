import {Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {useEffect, useState} from "react";
import env from "@/env";
import './../global.css';
import {Link, router} from "expo-router";

export default function App() {
    const [Authenticated, setAuthenticated] = useState(false);
    const [Players, setPlayers] = useState<string[]>([]);
    const [CurrentPlayerInput, setPlayerInput] = useState<string>("");
    const [Display, setDisplay] = useState(0);
    const [Packs, setPacks] = useState<[{
        id: number,
        name: string,
        description: string,
        owns: boolean,
        price: number,
        status: number
    } | null]>([null]);
    const [Mode, setMode] = useState<number>(-1);

    function validatePlayers() {
        if (Players.length !== 2) {
            alert("You must have at least 2 players to start.");
        } else {
            setDisplay(-1);
        }
    }

    function createGame(packID: number) {
        fetch(`https://${env.API_BASE}/game`, {
            method: "POST",
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mode: Mode,
                packs: [packID],
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.code === 401) {
                    alert(`Your login session may have expired. Please login again (E4/${res.code})`);
                    router.push("/menu");
                } else if (res.code === 201) {
                    router.push("/play");
                } else {
                    alert(`Sorry, something went wrong. Please try again later (E4/${res.code})`)
                    console.error(res)
                }
            })
            .catch(err => {
                alert("Sorry, something went wrong. Please try again later (E3)")
                console.error(err)
            })
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
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.code === 200) {
                    setAuthenticated(true);
                    fetch(`https://${env.API_BASE}/packs/list`, {method: 'GET', credentials: 'include'})
                        .then((response) => {
                            return response.json();
                        })
                        .then((json) => {
                            if (json.code === 200) {
                                setPacks(json.data);
                            } else {
                                alert("Unable to load packs. Please try again later.")
                            }
                        })
                        .catch((err) => {
                            console.error(err);
                            alert("Unable to load packs. Please try again later (E1)");
                        });
                } else {
                    setAuthenticated(false);
                }
            })
            .catch((err) => {
                console.error(err);
                alert("Unable to load. Please try again later (E2)")
            });
    }, []);
    return <ScrollView className={`grid gap-std`}>
        <View className={`header`}>
            <Text className={`txt-4xl text-white text-center txt-bold`}>Drinko!³</Text>
        </View>
        <View className="padding-lg text-center grid gap-lg">
            <View>
                {Authenticated ? (
                    <View>
                        {Display === 0 ? (
                            <View className={`grid-2 gap-std`}>
                                <Pressable className={`btn-lg btn-neutral txt-base text-center grid gap-std`} onPress={() => {
                                    setMode(1); setDisplay(1);
                                }}>
                                    <Text className={`text-center txt-2xl dark:text-white txt-bold`}>Big Screen</Text>
                                    <Text className={`text-center txt-xl dark:text-white`}>
                                        Create a big screen game, where all players use a single device.
                                    </Text>
                                </Pressable>
                                <Pressable className={`btn-lg btn-neutral txt-base text-center grid gap-std`} onPress={() => {
                                    setMode(2); setDisplay(2);
                                }}>
                                    <Text className={`text-center txt-2xl dark:text-white txt-bold`}>Multi-Device</Text>
                                    <Text className={`text-center txt-xl dark:text-white`}>
                                        Create or join a multi-device game, where all players use their own devices.
                                    </Text>
                                </Pressable>
                            </View>
                        ) : Display === 1 ? (
                            <View className={`grid-1 gap-std`}>
                                <Text className={`txt-xl text-center txt-bold`}>Big Screen Mode</Text>
                                <Text className="text-center txt-base">
                                    {Players.length > 0 ? "Playing with "+Players.join(", ")+" in Big Screen mode." : "Who's playing?"}
                                </Text>
                                <View className={`flex-row gap-std`}>
                                    <TextInput
                                        className={`input txt-base flex-grow`}
                                        onChangeText={newText => setPlayerInput(newText)}
                                    />
                                    <Pressable className={`btn btn-neutral txt-base text-center grid`} onPress={() => addPlayer(CurrentPlayerInput)}>
                                        <Text className={`text-center txt-base`}>Add player</Text>
                                    </Pressable>
                                </View>
                                <Pressable className={`btn btn-green txt-base text-center grid`} onPress={() => validatePlayers()}>
                                    <Text className={`text-center txt-base`}>Start game</Text>
                                </Pressable>
                            </View>
                        ) : Display === 2 ? (
                            <View className={`grid gap-std`}>
                                <Text className={`txt-xl text-center txt-bold`}>Multi-Device Mode</Text>
                                <Text>ERROR 501: NOT IMPLEMENTED</Text>
                            </View>
                        ) : Display === -1 ? (
                            <View className={`grid gap-std`}>
                                <Text className={`txt-xl text-center txt-bold`}>Select a Pack</Text>
                                <Text className="text-center txt-base">
                                    {Players.length > 0 ? "Playing with "+Players.join(", ")+" in Big Screen mode." : "Playing on Multi-Device mode."}
                                </Text>
                                <View className={`grid-2 gap-std`}>
                                    {Packs !== null ? (Packs.map(pack =>
                                        pack !== null ? (
                                            pack.status === 0 ? (
                                                pack.owns ? (
                                                    <View key={`pack-${pack.id}`} className={`btn btn-neutral-disabled`}>
                                                        <Text className={`txt-base txt-bold`}>{pack.name}</Text>
                                                        <Text className={`txt-sm`}>{pack.description}</Text>
                                                        <Text className={`txt-sm italic txt-bold`}>Coming soon. You own this pack on pre-order.</Text>
                                                    </View>
                                                ) : (
                                                    <View key={`pack-${pack.id}`} className={`btn btn-neutral-disabled`}>
                                                        <Text className={`txt-base txt-bold`}>{pack.name}</Text>
                                                        <Text className={`txt-sm`}>{pack.description}</Text>
                                                        <Text className={`txt-sm italic txt-bold`}>Coming soon.</Text>
                                                    </View>
                                                )
                                            ) : pack.owns ? (
                                                <Pressable onPress={() => createGame(pack.id)} key={`pack-${pack.id}`} className={`btn btn-green`}>
                                                    <Text className={`txt-base txt-bold`}>{pack.name}</Text>
                                                    <Text className={`txt-sm`}>{pack.description}</Text>
                                                </Pressable>
                                            ) : (
                                                <View key={`pack-${pack.id}`} className={`btn btn-neutral-disabled`}>
                                                    <Text className={`txt-base font-bold`}>{pack.name}</Text>
                                                    <Text className={`txt-sm`}>{pack.description}</Text>
                                                    <Text className={`txt-sm italic txt-bold`}>You don&apos;t own this pack.</Text>
                                                </View>
                                            )
                                        ) : (
                                            <Text key={`pack-?`}>Unknown pack.</Text>
                                        )
                                    )) : (
                                        <Text>There was a problem loading packs, please try again later.</Text>
                                    )}
                                    <Pressable onPress={() => setDisplay(1)} className={`btn btn-rose span-2`}>
                                        <Text className={`txt-sm text-center`}>&lt; Go back</Text>
                                    </Pressable>
                                </View>
                            </View>
                        ) : (
                            <View className={`grid gap-std card`}>
                                <Text className={`txt-xl text-center txt-bold`}>That&apos;s embarrassing.</Text>
                                <Text>Something went wrong. Please reload your app/site and try again.</Text>
                            </View>
                        )}
                    </View>
                ) : (
                    <View className={`grid gap-std`}>
                        <Text className={`txt-base text-center`}>
                            Drinko!³ now requires a Portal account. To play, please login or create a new account.
                        </Text>
                        <Text className={`alert-red alert-text-red`}>
                            Drinko!³ is currently in BETA testing. To access the application you must have been added to
                            the testing group. If you would like to join, please email drinko-testing@pixelset.dev or DM
                            @letsdrinko on Instagram. You will recieve an email when you have been added ot the group.
                        </Text>
                        <Link className={`btn btn-neutral txt-base text-center`}
                              href={`https://${env.API_BASE}/logto/sign-in`}>
                            Login with Portal
                        </Link>
                        <Text className={`text-center italic txt-base`}>or</Text>
                        <Link className={`btn btn-neutral txt-base text-center`}
                              href={`https://portalsso.com/join/?flow=https://letsdrinko.com`}>
                            Create an Account
                        </Link>
                    </View>
                )}
            </View>
            <View className={`alert-red`}>
                <Text className="alert-text-red">
                    Do not refresh the page or use the browser&#39;s back button whilst playing, as this may disconnect
                    you from the game and delete your progress.
                </Text>
            </View>
            <View className="flex-row space-x-2">
                <View className={`flex-grow`}></View>
                <Link href={`/about`} className={`link-inline`}>About Drinko!</Link>
                <Text> - </Text>
                <Link href={`/old`} className={`link-inline`}>Play Classic Drinko!</Link>
                <View className={`flex-grow`}></View>
            </View>
        </View>
    </ScrollView>;
}