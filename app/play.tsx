import {View, Text, Pressable} from "react-native";
import {useEffect, useState} from "react";
import startGame from "../public/js/game";
import {useLocalSearchParams} from "expo-router/build/hooks";
import {packType, playerType} from "@/constants/types";
import env from "@/env";
import {Helmet} from "react-helmet";
import GsError from "@/components/gameScreens/error";
import {GsPaused, GsPausedConfirm} from "@/components/gameScreens/paused";
import GsSips from "@/components/gameScreens/sips";
import GsGameOver from "@/components/gameScreens/gameOver";
import GsLoading from "@/components/gameScreens/loading";
import GsActivity from "@/components/gameScreens/activity";

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
    const [TakingSips, setTakingSips] = useState<{ players: number[], amount: number }>();

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

            setStatus(1);

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

    function addSips(players: number[], amount: number) {
        console.log(players,amount);
        setTakingSips({players: players, amount: amount});
        if (amount === -1) {
            amount = Math.floor(Math.random() * 10) + 1;
        }

        setGamePlayers(prevPlayers => {
            const updated = [...prevPlayers];

            players.forEach(id => {
                if (updated[id]) {
                    const player = { ...updated[id] };
                    player.sips += amount;
                    player.turns += 1;
                    updated[id] = player;
                }
            });

            return updated;
        });

        setStatus(2);
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
        <Helmet>
            <title>Play - Drinko!³</title>
        </Helmet>
        <View className={`h-screen`}>
            <View className="absolute top-0 left-0 bg-black px-2 py-1 rounded-br-lg">
                <Text className={`text-white txt-sm`}>Drinko!³</Text>
            </View>
            <View className="absolute top-0 right-[30%] left-[30%] lg:right-[40%] lg:left-[40%] text-center bg-black px-2 py-1 rounded-b-lg">
                <Text className={`text-white text-center txt-sm`}>
                    {Packs.length > 0 ? getPack(CurrentPack) : "Loading..."}
                </Text>
            </View>
            <Pressable className="absolute top-0 right-0 bg-black px-2 py-1 rounded-bl-lg z-50" onPress={() => setStatus(100)}>
                <Text className={`text-white txt-sm`}>&#9208;</Text>
            </Pressable>
            <View className={`lg:py-8 py-16`}></View>
            { Status === 0 ? (
                <GsLoading/>
            ) : Status === 1 ? (
                <GsActivity
                    VarGamePlayers={GamePlayers}
                    VarCurrentPlayer={CurrentPlayer}
                    VarPlayer2={Player2}
                    VarRenderedHeading={renderedHeading}
                    VarActivities={Activities}
                    VarCurrentActivity={CurrentActivity}
                    FunctAddSips={addSips}
                />
            ) : Status === 2 ? (
                <GsSips
                    VarTakingSips={TakingSips}
                    VarGamePlayers={GamePlayers}
                    FunctGetNextQuestion={getNextQuestion}
                />
            ) : Status === 99 ? (
                <GsGameOver
                    VarGamePlayers={GamePlayers}
                />
            ) : Status === 100 ? (
                <GsPaused
                    VarGamePlayers={GamePlayers}
                    FunctSetStatus={setStatus}
                />
            ) : Status === 101 ? (
                <GsPausedConfirm
                    FunctSetStatus={setStatus}
                />
            ) : (
                <GsError/>
            )}
            <View className={`bg-rose-950 absolute bottom-0 left-0 right-0 h-8`}>
                <View className={`bg-rose-500 h-8`} style={{ width: `${(QuestionCount / TotalQuestions) * 100}%` }}></View>
                <Text className={`absolute bottom-2 left-0 right-0 text-center text-white`}>{QuestionCount}/{TotalQuestions}</Text>
            </View>
        </View>
    </View>;
}