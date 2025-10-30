import {Pressable, Text, View} from "react-native";
import {playerType} from "@/constants/types";

export default function GsActivity(props: {
    VarGamePlayers: playerType
    VarCurrentPlayer: number
    VarPlayer2: number
    VarRenderedHeading: string
    VarActivities: any[]
    VarCurrentActivity: number
    FunctAddSips: (arg0:number[], arg1:number) => void
}) {
    return (<View className={`grid-1 gap-std padding`}>
        <View>
            <Text className={`txt-6xl text-center txt-bold`}>{props.VarGamePlayers[props.VarCurrentPlayer].name}</Text>
            <Text className={`txt-2xl text-center txt-bold`}>{props.VarRenderedHeading}</Text>
            <Text className={`txt-2xl text-center`}>{props.VarActivities[props.VarCurrentActivity].subheading}</Text>
        </View>
        <View className={`py-8`}></View>
        {
            props.VarActivities[props.VarCurrentActivity].type === 1 ||
            props.VarActivities[props.VarCurrentActivity].type === 2 ||
            props.VarActivities[props.VarCurrentActivity].type === 5 ?
        (
            <View className={`grid-${props.VarActivities[props.VarCurrentActivity].responses.length} gap-std`}>
                {
                    props.VarActivities[props.VarCurrentActivity].responses.map(function(item:{t: string, q: number, c: string}, i:number){
                        return <Pressable className={`btn-lg btn-${item.c}`} key={i} onPress={() => {
                            props.VarActivities[props.VarCurrentActivity].type === 1 || props.VarActivities[props.VarCurrentActivity].type === 5 ?
                                (props.FunctAddSips([props.VarCurrentPlayer], item.q)) :
                                (props.FunctAddSips([props.VarCurrentPlayer,props.VarPlayer2],item.q))
                        }}>
                            <Text className={`txt-xl text-center`}>{item.t}</Text>
                        </Pressable>
                    })
                }
            </View>
        ) : props.VarActivities[props.VarCurrentActivity].type === 6 ? (
            <View className={`flex-row gap-std`}>
                <Text className={`flex-grow`}>&nbsp;</Text>
                {
                    props.VarGamePlayers.map(function(player:{name: string, turns: number, sips: number}, i:number){
                        return <Pressable className={`btn-lg btn-blue`} key={i} onPress={() => {props.FunctAddSips([i],props.VarActivities[props.VarCurrentActivity].responses.y)}}>
                            <Text className={`txt-xl text-center`}>{player.name}</Text>
                        </Pressable>
                    })
                }
                <Text className={`flex-grow`}>&nbsp;</Text>
            </View>
        ) : (
            <Text className={`text-white text-center`}>Something went wrong, please email support@pixelset.dev quoting code PM-{props.VarCurrentActivity}</Text>
        )}
        <Pressable className={`link-inline`} onPress={() => {props.FunctAddSips([props.VarCurrentPlayer],props.VarActivities[props.VarCurrentActivity].skip)}}>
            <Text className={`text-white text-center txt-sm`}>Skip</Text>
        </Pressable>
    </View>);
}