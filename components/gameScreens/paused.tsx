import {Pressable, Text, View} from "react-native";
import PlayersList from "@/components/PlayersList";
import {playerType} from "@/constants/types";

export function GsPaused(props: { VarGamePlayers: playerType; FunctSetStatus: (arg0: number) => void }) {
    return (<View className={`grid-1 gap-std padding`}>
        <Text className={`txt-6xl text-center txt-bold`}>Paused</Text>
        <PlayersList players={props.VarGamePlayers.map(player => player.name)} />
        <View className={`lg:py-8 py-24`}><Text>&nbsp;</Text></View>
        <View className={`grid-2 gap-std`}>
            <Pressable onPress={() => props.FunctSetStatus(1)} className={`btn btn-green`}><Text className={`txt-xl text-center`}>Resume</Text></Pressable>
            <Pressable onPress={() => props.FunctSetStatus(101)} className={`btn btn-red`}><Text className={`txt-xl text-center`}>End game</Text></Pressable>
        </View>
    </View>);
}

export function GsPausedConfirm(props: { FunctSetStatus: (arg0: number) => void }) {
    return (<View className={`grid-1 gap-std padding`}>
        <Text className={`txt-6xl text-center txt-bold`}>Are you sure you want to end the game?</Text>
        <Text className={`txt-xl text-center`}>You cannot resume your progress if you leave.</Text>
        <View className={`lg:py-8 py-24`}><Text>&nbsp;</Text></View>
        <View className={`grid-2 gap-std`}>
            <Pressable onPress={() => props.FunctSetStatus(99)} className={`btn btn-red`}><Text className={`txt-xl text-center`}>Yes, end game</Text></Pressable>
            <Pressable onPress={() => props.FunctSetStatus(100)} className={`btn btn-green`}><Text className={`txt-xl text-center`}>No, return</Text></Pressable>
        </View>
    </View>);
}