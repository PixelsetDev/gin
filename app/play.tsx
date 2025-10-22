import { View, Text} from "react-native";
import {useEffect, useState} from "react";
import startGame from "../public/js/game";
import {useLocalSearchParams} from "expo-router/build/hooks";
import DotSpinner from "@/components/dotSpinner";
import {Link} from "expo-router";

export default function App() {
    const game: string = useLocalSearchParams().game.toString();
    const [GameData, setGameData] = useState<[number,string]>([0,""]);

    async function getData() {
        setGameData(await startGame(game));
    }
    useEffect(() => {
        getData();
    }, []);

    return <View className="h-screen">
        {GameData[0] === 1 ? (
            <View className={`h-screen`}>
                <View className="absolute top-0 left-0 bg-neutral-100 dark:bg-black dark:text-white px-2 py-1 rounded-br-lg">
                    Drinko!³
                </View>
                <View className="absolute top-0 right-[30%] left-[30%] lg:right-[40%] lg:left-[40%] text-center bg-neutral-100 dark:bg-black dark:text-white px-2 py-1 rounded-b-lg">
                    Pack
                </View>
                <Link className="absolute top-0 right-0 bg-neutral-100 dark:bg-black dark:text-white px-2 py-1 rounded-bl-lg" href={`/menu`}>
                    X
                </Link>
                <View className={`grid-1 gap-std padding`}>
                    <View className={`lg:py-8 py-24`}></View>
                    <View>
                        <Text className={`txt-6xl text-center`}>Heading</Text>
                        <Text className={`txt-2xl text-center txt-bold`}>Subheading</Text>
                    </View>
                </View>
                <View className={`bg-rose-200 dark:bg-rose-950 absolute bottom-0 left-0 right-0 h-8`}>
                    <View className={`bg-rose-500 h-8 w-[50%]`}></View>
                    <Text className={`absolute bottom-2 left-0 right-0 text-center dark:text-white`}>1/5</Text>
                </View>
            </View>
        ) : GameData[0] === 0 ? (
            <View className={`absolute top-0 left-0 right-0 bottom-0 grid-1 gap-std padding bg-rose-500 text-white`}>
                <View className={`lg:py-8 py-24`}></View>
                <View className={`grid-1 gap-std`}>
                    <Text className={`txt-6xl text-center txt-bold`}>Drinko!³</Text>
                    <Text className={`txt-2xl text-center`}>Loading...</Text>
                    <View className={`lg:py-8 py-24`}>&nbsp;</View>
                    <Text className={`txt-2xl text-center`}><DotSpinner/></Text>
                </View>
            </View>
        ) : (
            <View className={`absolute top-0 left-0 right-0 bottom-0 grid-1 gap-std padding bg-rose-500 text-white`}>
                <View className={`py-8`}></View>
                <View className={`grid-1 gap-std`}>
                    <Text className={`txt-6xl text-center txt-bold`}>Error {GameData[0]}</Text>
                    <Text className={`txt-2xl text-center`}>{GameData[1]}</Text>
                    <View className={`py-8`}>&nbsp;</View>
                    <View className={`grid-2 gap-std`}>
                        <Link className={`btn btn-rose txt-xl text-center`} href={`/menu`}>Exit</Link>
                        <Link className={`btn btn-rose txt-xl text-center`} href={`/help`}>Contact Support</Link>
                    </View>
                </View>
            </View>
        )}
    </View>;
}