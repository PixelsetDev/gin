import {Image, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {useEffect, useState} from "react";
import env from "@/env";
import './../global.css';
import {Link, router} from "expo-router";
import {packType, singlePackType} from "@/constants/types";
import {createGame} from "@/scripts/menu";
import PlayersList from "@/components/PlayersList";

export default function App() {
    const [Authenticated, setAuthenticated] = useState(false);
    const [Players, setPlayers] = useState<string[]>([]);
    const [CurrentPlayerInput, setPlayerInput] = useState<string>("");
    const [Display, setDisplay] = useState(0);
    const [Packs, setPacks] = useState<packType>([null]);
    const [SelectedPacks, setSelectedPacks] = useState<number[]>([]);
    const [SelectedActivityCount, setSelectedActivityCount] = useState<number>(0);
    const [Mode, setMode] = useState<number>(-1);

    function addPlayer(player: string) {
        if (player.trim() === "") {
            alert("Please enter a player!");
        } else {
            setPlayers(prevPlayers => [...prevPlayers, player.trim()]);
            setPlayerInput("");
        }
    }

    function selectPack(pack: singlePackType) {
        if (pack) {
            if (SelectedPacks.includes(pack.id)) {
                // Remove
                setSelectedPacks(SelectedPacks.filter(id => id !== pack.id));
                setSelectedActivityCount(SelectedActivityCount-pack.activities);
            } else {
                // Add
                if (pack.status === 1) {
                    setSelectedPacks([...SelectedPacks, pack.id]);
                    setSelectedActivityCount(SelectedActivityCount+pack.activities);
                } else {
                    alert('Sorry, this pack is unavailable.');
                }
            }
            return SelectedPacks
        } else {
            alert('Sorry, something went wrong (ENF)');
        }
    }

    function validatePlayers() {
        if (Players.length < 2) {
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
        <Text className="bg-rose-400 text-white px-2 py-1 text-center">
            Do not refresh the page or use the browser&#39;s back button whilst playing, as this may disconnect
            you from the server and delete your progress.
        </Text>
        <View className="padding-lg text-center grid gap-lg">
            <View>
                {Authenticated ? (
                    <View>
                        {Display === 0 ? (
                            <View className={`grid-2 gap-std`}>
                                <Pressable className={`btn-lg btn-neutral txt-base text-center grid gap-std`} onPress={() => {
                                    setMode(1); setDisplay(1);
                                }}>
                                    <Text className={`text-center txt-2xl txt-bold`}>Big Screen</Text>
                                    <Text className={`text-center txt-xl`}>
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
                                    });
                                }}>
                                    <Text className={`text-center txt-2xl txt-bold`}>Multi-Device</Text>
                                    <Text className={`text-center txt-xl`}>
                                        Create or join a multi-device game, where all players use their own devices.
                                    </Text>
                                </Pressable>
                            </View>
                        ) : Display === 1 ? (
                            <View className={`grid-1 gap-std`}>
                                <Text className={`txt-xl text-center txt-bold`}>Big Screen Mode</Text>
                                <PlayersList players={Players}/>
                                <View className={`flex-row gap-std`}>
                                    <TextInput
                                        className={`input txt-base flex-grow`}
                                        value={CurrentPlayerInput}
                                        onChangeText={newText => setPlayerInput(newText)}
                                        maxLength={12}
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
                            <View className={`grid-1 gap-std`}>
                                <Text className={`txt-xl text-center txt-bold`}>Select your packs</Text>
                                <PlayersList players={Players}/>

                                <Text className={`txt-xl text-center pt-8 pb-4`}>Your Packs</Text>
                                <Text className={`alert-blue alert-text-blue txt-bold txt-sm text-center`}>
                                    I&apos;m still importing activities from earlier games alongside creating new
                                    activities. The available activity pool will likely increase quite a bit throughout
                                    the week. You can also pick more than one pack at once to increase game length in
                                    the meantime if you wish.
                                </Text>
                                <View className={`grid-5 gap-std`}>
                                    {Packs !== null ? (Packs.map(pack =>
                                        pack !== null && pack.owns && (
                                            <Pressable onPress={() => selectPack(pack)} key={`pack-${pack.id}`} className={`btn-card ${SelectedPacks.includes(pack.id) ? ('btn-green') : ('btn-neutral')}`}>
                                                <Image source={{ uri: `https://${env.API_BASE}/static/pack-icons/${pack.id}.png` }} className={`w-full h-32`} />
                                                { pack.price_id === null && pack.status === 0 ? (
                                                    <Text className={`bg-yellow-600 text-white text-center py-1 txt-xs`}>Coming Soon (Free pack)</Text>
                                                ) : pack.price_id === null && pack.status === 1 ? (
                                                    <Text className={`bg-green-700 text-white text-center py-1 txt-xs`}>Free pack</Text>
                                                ) : pack.status === 0 ? (
                                                    <Text className={`bg-yellow-600 text-white text-center py-1 txt-xs`}>Coming Soon (Preorder)</Text>
                                                ) : pack.status === 1 && (
                                                    <Text className={`bg-green-700 text-white text-center py-1 txt-xs`}>You own this pack</Text>
                                                )}
                                                <View className={`btn-card-content`}>
                                                    <Text className={`txt-base txt-bold text-center`}>{pack.name}</Text>
                                                    <Text className={`txt-sm text-center`}>{pack.description}</Text>
                                                </View>
                                                {pack.status === 1 && (
                                                    <Text className={`absolute top-2 right-2 text-white bg-black/50 p-2 z-50`}>{pack.activities}</Text>
                                                )}
                                            </Pressable>
                                        )
                                    )) : (
                                        <Text className={`text-white`}>There was a problem loading packs, please try again later.</Text>
                                    )}
                                    <Text className={`flex-grow`}>&nbsp;</Text>
                                </View>
                                <View className={`bg-black pt-8 px-4 pb-4 my-8 shadow-lg`}>
                                    <Text className={`txt-xl text-center pb-4`}>Looking for more?</Text>
                                    <View className={`menu-overflow px-4`}>
                                        {Packs !== null ? (
                                            Packs.some(pack => pack && !pack.owns) ? (
                                                Packs.map(pack =>
                                                    pack && !pack.owns && (
                                                        <View key={`pack-${pack.id}`} className={`mb-4 w-72 btn-card btn-neutral-disabled relative`}>
                                                            <Image source={{ uri: `https://${env.API_BASE}/static/pack-icons/${pack.id}.png` }} className={`w-full h-32`} />
                                                            {pack.status === 0 ? (
                                                                <Text className={`bg-yellow-600 text-white text-center py-1 txt-xs`}>Coming soon</Text>
                                                            ) : pack.status === 1 && (
                                                                <Text className={`bg-red-700 text-white text-center py-1 txt-xs`}>Buy for £1.99</Text>
                                                            )}
                                                            <View className={`p-2`}>
                                                                <Text className={`txt-sm txt-bold text-center`}>{pack.name}</Text>
                                                                <Text className={`txt-xs text-center`}>{pack.description}</Text>
                                                            </View>
                                                            {pack.status === 1 && (
                                                                <Text className={`absolute top-2 right-2 text-white bg-black/50 p-2`}>{pack.activities}</Text>
                                                            )}
                                                        </View>
                                                    )
                                                )
                                            ) : (
                                                <View className={`flex-grow`}>
                                                    <Text className={`text-white txt-base txt-bold`}>Looks like you&apos;re the ultimate Drinko fan!</Text>
                                                    <Text className={`text-white txt-sm`}>You&apos;ve bought all the Drinko! packs we have so far...</Text>
                                                    <Text className={`text-white txt-sm`}>If you&apos;re signed up to our mailing list, we&apos;ll email you</Text>
                                                    <Text className={`text-white txt-sm`}>when a new pack is coming out! For now, enjoy Drinko!</Text>
                                                </View>
                                            )
                                        ) : (
                                            <Text className={`text-white`}>There was a problem loading packs, please try again later.</Text>
                                        )}
                                        <Text className={`flex-grow`}>&nbsp;</Text>
                                    </View>
                                </View>

                                {(SelectedPacks.length === 0) ? (
                                    <View>
                                        <Text className={`alert-red alert-text-red txt-sm text-center`}>
                                            Please select your packs before continuing.
                                        </Text>
                                        <View className={`flex-row pt-8 gap-std`}>
                                            <Pressable onPress={() => setDisplay(1)} className={`btn btn-red`}>
                                                <Text className={`txt-sm text-center`}>&lt; Go back</Text>
                                            </Pressable>
                                            <View className={`btn btn-neutral-disabled flex-grow`}>
                                                <Text className={`txt-sm text-center`}>Start game &gt;</Text>
                                            </View>
                                        </View>
                                    </View>
                                ) : (
                                    <View className={`grid-1 gap-std`}>
                                        <Text className={`alert-green alert-text-green txt-sm text-center`}>
                                            Game with {SelectedPacks.length} pack{SelectedPacks.length > 1 && 's'} and {SelectedActivityCount} rounds.
                                            Estimated time: {(() => {let m=Math.round(SelectedActivityCount*1.25),h=Math.floor(m/60); return [h?h+' '+(h===1?'hour':'hours'):null, m%60?m%60+' '+((m%60)===1?'minute':'minutes'):null].filter(Boolean).join(' ');})()}.
                                            {SelectedPacks.length === 1 && (
                                                <Text className={`block italic`}>You can pick more than one pack if you&apos;d like a longer game.</Text>
                                            )}
                                        </Text>
                                        <View className={`flex-row pt-8 gap-std`}>
                                            <Pressable onPress={() => setDisplay(1)} className={`btn btn-red`}>
                                                <Text className={`txt-sm text-center`}>&lt; Go back</Text>
                                            </Pressable>
                                            <Pressable onPress={() => createGame(SelectedPacks, Mode, Players)} className={`btn btn-green flex-grow`}>
                                                <Text className={`txt-sm text-center`}>Start game &gt;</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                )}
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