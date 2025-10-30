import {Text, View} from "react-native";
import {Link} from "expo-router";
import {playerType} from "@/constants/types";

export default function GsGameOver(props: {VarGamePlayers: playerType}) {
    return (<View className={`grid-1 gap-std padding`}>
        <Text className={`txt-6xl text-center txt-bold`}>Game over!</Text>
        <View className={`grid-1 border-x-2 border-t-2 border-white`}>
            {[...props.VarGamePlayers]
                .sort((a, b) => b.sips - a.sips)
                .map((p, i) => (
                    <View className="border-b-2 border-white grid-2 gap-std px-2 py-1" key={i}>
                        <Text className="border-r-2 border-white txt-base px-2 py-1">{p.name}</Text>
                        <Text className="txt-base px-2 py-1">{p.sips}</Text>
                    </View>
                ))
            }
        </View>
        <View className={`lg:py-8 py-24`}><Text>&nbsp;</Text></View>
        <Text className={`txt-xl text-center`}><Link href={`/menu`} className={`btn btn-rose`}>Exit</Link></Text>
    </View>);
}