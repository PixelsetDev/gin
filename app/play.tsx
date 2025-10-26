import {View, Text, Pressable} from "react-native";
import {useEffect, useState} from "react";
import startGame from "../public/js/game";
import {useLocalSearchParams} from "expo-router/build/hooks";
import DotSpinner from "@/components/dotSpinner";
import {Link, router} from "expo-router";
import {packType, playerType} from "@/constants/types";
import env from "@/env";

let TotalQuestions: number = 0;

export default function App() {
    const game: string = useLocalSearchParams().game.toString();

    const [GamePlayers, setGamePlayers] = useState<playerType>([]);

    const [Packs, setPacks] = useState<packType>([null]);

    const [GameMode, setGameMode] = useState<number>(0);
    const [Activities, setActivities] = useState<any[]>([null]);

    const [CurrentPack, setCurrentPack] = useState<number>(0);
    const [CurrentActivity, setCurrentActivity] = useState<number>(0);
    const [CurrentPlayer, setCurrentPlayer] = useState<number>(0);
    const [Player2, setCurrentPlayer2] = useState<number>(0);

    const [QuestionCount, setQuestionCount] = useState<number>(0);

    const [Status, setStatus] = useState<number>(0);

    const renderedHeading = Activities[CurrentActivity]?.heading?.replace('{player}', GamePlayers[Player2].name);

    function getNextQuestion(initial: boolean) {
        setActivities((prevActivities) => {
            let updatedActivities = [...prevActivities];

            if (!initial && updatedActivities.length > 0) {
                updatedActivities.splice(CurrentActivity, 1);
            }

            if (updatedActivities.length === 0) {
                // End game
                setStatus(99);
                return prevActivities;
            }

            const nextPlayer = Math.floor(Math.random() * GamePlayers.length);

            let nextPlayer2 = Math.floor(Math.random() * GamePlayers.length);
            while (nextPlayer2 === nextPlayer && GamePlayers.length > 1) {
                nextPlayer2 = Math.floor(Math.random() * GamePlayers.length);
            }

            const nextActivity = Math.floor(Math.random() * updatedActivities.length);

            setCurrentPack(updatedActivities[nextActivity].pack);
            setCurrentPlayer(nextPlayer);
            setCurrentPlayer2(nextPlayer2);
            setCurrentActivity(nextActivity);
            setQuestionCount((prev) => prev + 1);

            return updatedActivities;
        });
    }

    function getPack(id: number) {
        for (let i in Packs) {
            if (Packs[i] !== null && Packs[i].id === id) {
                return Packs[i].name
            }
        }
    }

    useEffect(() => {
        async function fetchData() {
            let gameData = await startGame(game);

            if (gameData[0] === 1 && typeof gameData[1] !== "string") {
                setGameMode(gameData[1].mode);
                let players: playerType = [];
                for (let i in gameData[1].players) {
                    players[i] = {name: gameData[1].players[i], turns: 0, sips: 0}
                }
                setGamePlayers(players);
                setActivities(gameData[1].activities);
                if (TotalQuestions === 0) {
                    TotalQuestions = gameData[1].activities.length; // assigned once
                }
                getNextQuestion(true);
                setStatus(1);
            } else {
                setStatus(gameData[0]);
            }

            fetch(`https://${env.API_BASE}/packs/list`, {method: 'GET', credentials: 'include'})
                .then((response) => {return response.json();})
                .then((json) => { if (json.code === 200) { setPacks(json.data); } else { setStatus(-1); } })
                .catch((err) => { setStatus(-1); })
        }

        fetchData();
    }, []);

    return <View className="h-screen">
        {Status === 1 ? (
            <View className={`h-screen`}>
                <View className="absolute top-0 left-0 bg-black px-2 py-1 rounded-br-lg">
                    <Text className={`text-white txt-sm`}>Drinko!³</Text>
                </View>
                <View className="absolute top-0 right-[30%] left-[30%] lg:right-[40%] lg:left-[40%] text-center bg-black px-2 py-1 rounded-b-lg">
                    <Text className={`text-white text-center txt-sm`}>
                        {Packs.length > 0 ? getPack(CurrentPack) : "Loading..."}
                    </Text>
                </View>
                <Pressable className="absolute top-0 right-0 bg-black px-2 py-1 rounded-bl-lg z-50" onPress={() => router.push('/menu')}>
                    <Text className={`text-white txt-sm`}>&#9208;</Text>
                </Pressable>
                <View className={`grid-1 gap-std padding`}>
                    <View className={`lg:py-8 py-16`}></View>
                    <View>
                        <Text className={`txt-6xl text-center txt-bold`}>{GamePlayers[CurrentPlayer].name}</Text>
                        <Text className={`txt-2xl text-center txt-bold`}>{renderedHeading}</Text>
                        <Text className={`txt-2xl text-center`}>{Activities[CurrentActivity].subheading}</Text>
                    </View>
                    <View className={`py-8`}></View>
                    <View className={`grid-2 gap-std`}>
                        {
                            Activities[CurrentActivity].responses.map(function(item:{t: string, q: number, c: string}, i:number){
                                return <Pressable className={`btn-lg btn-${item.c}`} key={i} onPress={() => {getNextQuestion(false)}}>
                                    <Text className={`txt-xl text-center`}>{item.t}</Text>
                                </Pressable>
                            })
                        }
                    </View>
                    <Pressable className={`link-inline`} onPress={() => {getNextQuestion(false)}}>
                        <Text className={`text-white text-center txt-sm`}>Skip</Text>
                    </Pressable>
                </View>
                <View className={`bg-rose-950 absolute bottom-0 left-0 right-0 h-8`}>
                    <View className={`bg-rose-500 h-8`} style={{ width: `${(QuestionCount / TotalQuestions) * 100}%` }}></View>
                    <Text className={`absolute bottom-2 left-0 right-0 text-center text-white`}>{QuestionCount}/{TotalQuestions}</Text>
                </View>
            </View>
        ) : Status === 0 ? (
            <View className={`absolute top-0 left-0 right-0 bottom-0 grid-1 gap-std padding bg-rose-500 text-white`}>
                <View className={`lg:py-8 py-24`}></View>
                <View className={`grid-1 gap-std`}>
                    <Text className={`txt-6xl text-center txt-bold`}>Drinko!³</Text>
                    <Text className={`txt-2xl text-center`}>Loading...</Text>
                    <View className={`lg:py-8 py-24`}><Text>&nbsp;</Text></View>
                    <Text className={`txt-2xl text-center`}><DotSpinner/></Text>
                </View>
            </View>
        ) : Status === 99 ? (
            <View className={`absolute top-0 left-0 right-0 bottom-0 grid-1 gap-std padding bg-rose-500 text-white`}>
                <View className={`lg:py-8 py-24`}></View>
                <View className={`grid-1 gap-std`}>
                    <Text className={`txt-6xl text-center txt-bold`}>Game over!</Text>
                    <Text className={`txt-2xl text-center`}>[LEADERBOARD]</Text>
                    <View className={`lg:py-8 py-24`}><Text>&nbsp;</Text></View>
                    <Text className={`txt-xl text-center`}><Link href={`/menu`} className={`btn btn-rose`}>Exit</Link></Text>
                </View>
            </View>
        ) : (
            <View className={`absolute top-0 left-0 right-0 bottom-0 grid-1 gap-std padding bg-rose-500 text-white`}>
                <View className={`py-8`}></View>
                <View className={`grid-1 gap-std`}>
                    <Text className={`txt-6xl text-center txt-bold`}>Error</Text>
                    <Text className={`txt-2xl text-center`}>x</Text>
                    <View className={`py-8`}><Text>&nbsp;</Text></View>
                    <View className={`grid-2 gap-std`}>
                        <Link className={`btn btn-rose txt-xl text-center`} href={`/menu`}>Exit</Link>
                        <Link className={`btn btn-rose txt-xl text-center`} href={`/help`}>Contact Support</Link>
                    </View>
                </View>
            </View>
        )}
    </View>;
}