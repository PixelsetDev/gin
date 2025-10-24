import {Image, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {useEffect, useState} from "react";
import env from "@/env";
import './../global.css';
import {Link, router} from "expo-router";
import {packType} from "@/constants/types";
import {createGame} from "@/scripts/menu";

export default function App() {
    const [Authenticated, setAuthenticated] = useState(false);
    const [Players, setPlayers] = useState<string[]>([]);
    const [CurrentPlayerInput, setPlayerInput] = useState<string>("");
    const [Display, setDisplay] = useState(0);
    const [Packs, setPacks] = useState<packType>([null]);
    const [Mode, setMode] = useState<number>(-1);

    function addPlayer(player: string) {
        if (player.trim() === "") {
            alert("Please enter a player!");
        } else {
            setPlayers(prevPlayers => [...prevPlayers, player.trim()]);
            setPlayerInput("");
        }
    }

    function validatePlayers() {
        if (Players.length !== 2) {
            alert("You must have at least 2 players to start.");
        } else {
            setDisplay(-1);
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
                                router.push({
                                    pathname: `/error`,
                                    params: {
                                        code: "D1",
                                        error: "Unable to load packs.",
                                        description: "Unable to load packs. Please try again or contact support for assistance.",
                                        elFile: 'menu.tsx',
                                        elFunc: 'useEffect'
                                    }
                                });
                            }
                        })
                        .catch((err) => {
                            router.push({
                                pathname: `/error`,
                                params: {
                                    code: err.code,
                                    error: err.message,
                                    description: "Unable to load packs. Please try again or contact support for assistance.",
                                    elFile: 'menu.tsx',
                                    elFunc: 'useEffect'
                                }
                            });
                        });
                } else {
                    setAuthenticated(false);
                }
            })
            .catch((err) => {
                router.push({
                    pathname: `/error`,
                    params: {
                        code: err.code,
                        error: err.message,
                        description: "Unable to load packs. Please try again or contact support for assistance.",
                        elFile: 'menu.tsx',
                        elFunc: 'useEffect'
                    }
                });
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
                                    setMode(2); setDisplay(2)
                                    router.push({
                                        pathname: `/error`,
                                        params: {
                                            code: "451",
                                            error: "Unavailable For Legal Reasons",
                                            description: "Due to legal issues, this function is not available in your country or region. Please contact support for assistance.",
                                            elFile: 'menu.tsx',
                                            elFunc: 'render(root)'
                                        }
                                    });;
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
                                        value={CurrentPlayerInput}
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
                                <Text className="text-center txt-base">
                                    {Players.length > 0 ? "Playing with "+Players.join(", ")+" in Big Screen mode." : "Playing on Multi-Device mode."}
                                </Text>

                                <Text className={`txt-xl text-center txt-bold pt-8 pb-4`}>Your Packs</Text>
                                <View className={`grid-4 gap-std`}>
                                    {Packs !== null ? (Packs.map(pack =>
                                        pack !== null && (pack.owns || pack.all_owns) && (
                                            <Pressable onPress={() => createGame(pack.id, Mode, Players, pack.status)} key={`pack-${pack.id}`} className={`max-w-72 btn-card btn-neutral`}>
                                                <Image source={{ uri: `https://${env.API_BASE}/static/pack-icons/${pack.id}.png` }} className={`w-full h-32`} />
                                                { pack.all_owns && pack.status === 0 ? (
                                                    <Text className={`bg-yellow-600 text-white text-center py-1 txt-sm`}>Coming Soon (Free pack)</Text>
                                                ) : pack.all_owns && pack.status === 1 ? (
                                                    <Text className={`bg-green-700 text-white text-center py-1 txt-sm`}>Free pack</Text>
                                                ) : pack.status === 0 ? (
                                                    <Text className={`bg-yellow-600 text-white text-center py-1 txt-sm`}>Coming Soon (Pre-ordered)</Text>
                                                ) : pack.status === 1 && (
                                                    <Text className={`bg-green-700 text-white text-center py-1 txt-sm`}>You own this pack</Text>
                                                )}
                                                <View className={`btn-card-content`}>
                                                    <Text className={`txt-base txt-bold text-center`}>{pack.name}</Text>
                                                    <Text className={`txt-sm text-center`}>{pack.description}</Text>
                                                </View>
                                            </Pressable>
                                        )
                                    )) : (
                                        <Text className={`dark:text-white`}>There was a problem loading packs, please try again later.</Text>
                                    )}
                                    <Text className={`flex-grow`}>&nbsp;</Text>
                                </View>
                                <View className={`bg-rose-200 dark:bg-black pt-8 px-4 pb-4 my-8 shadow-lg`}>
                                    <Text className={`txt-xl text-center txt-bold pb-4`}>Looking for more?</Text>
                                    <View className={`flex-row gap-std overflow-x-scroll px-4`}>
                                        {Packs !== null ? (Packs.map(pack =>
                                            pack !== null && (!pack.owns && !pack.all_owns) && (
                                                <Pressable onPress={() => createGame(pack.id, Mode, Players, pack.status)} key={`pack-${pack.id}`} className={`mb-4 max-w-72 btn-card btn-neutral`}>
                                                    <Image source={{ uri: `https://${env.API_BASE}/static/pack-icons/${pack.id}.png` }} className={`w-full h-32`} />
                                                    {pack.status === 0 ? (
                                                        <Text className={`bg-yellow-600 text-white text-center py-1 txt-sm`}>Coming soon</Text>
                                                    ) : pack.status === 1 && (
                                                        <Text className={`bg-red-700 text-white text-center py-1 txt-sm`}>Buy for £1.99</Text>
                                                    )}
                                                    <View className={`p-2`}>
                                                        <Text className={`txt-sm txt-bold text-center`}>{pack.name}</Text>
                                                        <Text className={`txt-xs text-center`}>{pack.description}</Text>
                                                    </View>
                                                </Pressable>
                                            )
                                        )) : (
                                            <Text className={`dark:text-white`}>There was a problem loading packs, please try again later.</Text>
                                        )}
                                        <Text className={`flex-grow`}>&nbsp;</Text>
                                    </View>
                                </View>
                                <View className={`grid-2 pt-8 gap-std`}>
                                    <Pressable onPress={() => setDisplay(1)} className={`btn btn-red`}>
                                        <Text className={`txt-sm text-center`}>&lt; Go back</Text>
                                    </Pressable>
                                    <Pressable onPress={() => alert('Not implemented, please click a pack.')} className={`btn btn-green`}>
                                        <Text className={`txt-sm text-center`}>Start game &gt;</Text>
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