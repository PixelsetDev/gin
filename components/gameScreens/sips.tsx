import {Pressable, Text, View} from "react-native";
import {playerType} from "@/constants/types";

let tempHolding = [];

export default function GsSips(props: {
    VarTakingSips: {players: number[], amount: number} | undefined,
    VarGamePlayers: playerType,
    FunctGetNextQuestion: (arg0: boolean) => void
}) {
    return (<View className={`grid-1 gap-std padding`}>
        <View>
            <View className={`flex-row gap-std`}>
                <Text className={`flex-grow`}>&nbsp;</Text>
                {props.VarTakingSips?.players.map(function(player:number, i:number){
                    return <Text key={i} className={`txt-2xl txt-bold`}>{props.VarGamePlayers[player].name}</Text>;
                })}
                <Text className={`flex-grow`}>&nbsp;</Text>
            </View>
            <Text className={`txt-4xl text-center txt-bold`}>Drink {props.VarTakingSips?.amount} sips</Text>
        </View>
        <View className={`py-8`}></View>
        <Pressable className={`btn btn-blue`} onPress={() => {props.FunctGetNextQuestion(false);}}>
            <Text className={`txt-xl text-center`}>Continue</Text>
        </Pressable>
    </View>);
}